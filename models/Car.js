import mongoose, {Schema} from "mongoose";

const carSchema = Schema({
    marque : {
        type : String,
        required : true
    },
    modele : {
        type : String,
        required : true
    },
    annee : {
        type : Number,
        required : true
    },
    couleur : {
        type : String,
        required : true
    },
    prix : {
        type : Number,
        required : true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    image: {
        type: String,
        required: true
    }
})

export default mongoose.model('Car', carSchema)