import jwt from 'jsonwebtoken';


export const generateTokenAndSetCookie = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,

    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('token', token, cookieOptions);
    return token;
}