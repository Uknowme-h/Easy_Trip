import { BusOperator } from "../models/BusOperator.model.js";
import { Guesthouse } from "../models/Guesthouse.model.js";
import { GuesthouseOwner } from "../models/GuesthouseOwner.model.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, isVerfied } = req.body;
        if (!email || !password || !name || !role || !isVerfied) {
            return res.status(400).json({ msg: 'Please fill in all fields' });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name, email, password: hashedPassword, role, isVerfied

        })
        if (role === 'guesthouse owner') {
            await GuesthouseOwner.create({
                userId: user._id,
                businessName: `${name}'s Guesthouse`
            });
        }

        if (role === 'bus operator') {
            await BusOperator.create({
                user: user._id,
                companyName: `${name}'s Bus Company`
            });
        }

        await user.save();


        res.status(201).json({ msg: 'User created successfully  ', user: { ...user._doc, password: undefined } });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is a guesthouse owner
        if (user.role === "guesthouse owner") {
            const owner = await GuesthouseOwner.findOne({ userId: user._id });

            if (owner) {
                // Delete all guesthouses owned by this owner
                await Guesthouse.deleteMany({ owner: owner._id });

                // Delete the GuesthouseOwner document
                await GuesthouseOwner.findByIdAndDelete(owner._id);
            }
        }

        // Delete the User document
        await User.findByIdAndDelete(user._id);

        res.status(200).json({ message: "User and related data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};