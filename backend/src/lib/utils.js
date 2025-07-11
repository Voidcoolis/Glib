import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    //create token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token will expire in 7 days  or whenever
    })
     res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",  // determine if the app is in https or http
  });

  return token;
}