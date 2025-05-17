import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtsecret = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, jwtsecret, { expiresIn: '15d' });
  res.cookie("JWT-FLIXVIEW", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development', 
  });
  return token;
};
