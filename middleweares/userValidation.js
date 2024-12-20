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

export const isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Admin privileges required' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const updateUserToAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const updateUser = await User
            .findByIdAndUpdate(id, {
                role: 'admin'
            }, { new: true });
        return res.status(200).json(updateUser);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error 🔴" });
    }
}