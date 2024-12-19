import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Enregistrement d'un nouvel utilisateur
export const registerNewUser = async (req, res) => {
    const { email, name, last_name, password } = req.body;

    try {
        // Vérification de l'existence de l'email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hashage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Création d'un nouvel utilisateur
        const newUser = new User({
            email,
            name,
            last_name,
            password: hashedPassword,
        });

        await newUser.save();

        // Réponse après création
        return res.status(201).json({ message: `Welcome ${name}, your account has been created!` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred during registration' });
    }
};

// Connexion utilisateur
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherche de l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Vérification du mot de passe
        const passwordVerification = await bcrypt.compare(password, user.password);
        if (!passwordVerification) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Réponse avec le token et les informations utilisateur
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                last_name: user.last_name,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred during login' });
    }
};
