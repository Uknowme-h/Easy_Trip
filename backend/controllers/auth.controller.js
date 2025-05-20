import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import crypto from 'crypto';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Store } from '../models/Store.js';
import { uploadFiles } from "../helpers/upload.js";
import { GuesthouseOwner } from "../models/GuesthouseOwner.model.js";

dotenv.config();


export const signup = async (req, res) => {

    const { name, email, password, userType } = req.body;

    try {
        if (!email || !password || !name || !userType) {
            return res.status(400).json({ msg: 'Please fill in all fields' });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            name, email, password: hashedPassword, verificationToken, verificationTokenExpires: Date.now() + 600000, userType

        })
        await user.save();

        generateTokenAndSetCookie(res, user._id); // generate JWT token and set cookie
        await sendVerificationEmail(user.email, verificationToken); // send verification email

        if (userType === 'guesthouse owner') {
            await GuesthouseOwner.create({
                userId: user._id,
                businessName: businessName || `${name}'s Guesthouse`
            });
        }

        if (userType === 'bus operator') {
            await BusOperator.create({
                userId: user._id,
                companyName: companyName || `${name}'s Bus Company`
            });
        }


        res.status(201).json({ msg: 'User created successfully  ', user: { ...user._doc, password: undefined } });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,

        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code", code });
        }

        user.isVerfied = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in verifyEmail ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ msg: 'Logged in successfully', user: { ...user._doc, password: undefined } });



    } catch (error) {
        console.log("error in login ", error);
        res.status(500).json({ msg: error.message });
    }




}

export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })
    res.status(200).json({ msg: 'Logged out successfully' });


}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}reset-password/${resetToken}`);
        res.status(200).json({ msg: 'Verification code sent to your email' });
    }
    catch (error) {
        console.log("error in forgotPassword ", error);
        res.status(500).json({ msg: error.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // update password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        await sendPasswordResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const checkAuth = async (req, res) => {

    try {

        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });

    } catch (error) {
        console.log("error in checkAuth ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }

}

export const addbook = async (req, res) => {
    const { user_id, url } = req.body;
    try {
        const user = await User.findById(user_id).select("-password");
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const newEntry = {
            id: uuidv4(),
            url: url
        };
        user.library.push(newEntry);
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}


export const uploadFile = async (req, res) => {
    const { user_id } = req.body;
    console.log("req.body", req.body);

    try {
        const upload = await uploadFiles(req.file.path);

        let store = await Store.findOne({ user_id });

        if (!store) {
            store = new Store({
                user_id,
                file_urls: [upload.secure_url]
            });
        } else {
            store.file_urls.push(upload.secure_url);
        }

        const record = await store.save();
        res.send({ success: true, msg: 'File Uploaded Successfully!', data: upload.secure_url });

    } catch (error) {
        res.send({ success: false, msg: error.message });
    }
};

export const getAllStore = async (req, res) => {
    const { user_id } = req.query;

    try {
        const store = await Store.find({ user_id });

        res.send(store);
    } catch (error) {
        res.send(error);
    }
}