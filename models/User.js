import mongoose, {Schema} from "mongoose";

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    last_name: String,
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Définir les rôles possibles
        default: 'user' // Par défaut, chaque nouvel utilisateur est un "user"
    },
});

export default mongoose.model('User', userSchema)