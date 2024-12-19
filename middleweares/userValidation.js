    import User from '../models/User.js'
import jwt from 'jsonwebtoken'



export const userFieldsVerification = (req, res, next) => {
    const { email, name, last_name, password } = req.body
    if (!email || !name || !last_name || !password) {
        return res.json({ message: 'All fields are required' })
    }
    next()
}

export const emailVerification = async (req, res, next) => {
    const { email } = req.body
    const searchUserByEmail = await User.findOne({ email })
    if (searchUserByEmail) {
        return res.status(400).json({ message: 'Email already taken' })
    }
    next()
}

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verify; // Si besoin, stockez les données du token pour les utiliser plus tard.
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
