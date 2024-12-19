import Car from "../models/Car.js";
import User from "../models/User.js";

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        if(cars.length > 0){
            return res.status(200).json(cars);
        }
        return res.status(404).json({message : 'No car found'})
      } catch (error) {
        return res.status(500).json({ message: "Internal server error 🔴" });
      }
}

export const createCar = async (req, res) => {
    let { marque, modele, annee, couleur, prix } = req.body; 
      try {
        const car = await new Car({
            marque,
            modele,
            annee,
            couleur,
            prix
          } = req.body);
        await car.save();
        return res.status(201).json(car);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error 🔴" });
      }
}

export const getCarById = async (req, res) => {
    let { id } = req.params;
      try {
        const car = await Car.findById(id);
        res.status(200).json(car);
      } catch (error) {
        return res.status(500).json({ message: "Internal server error 🔴" });
      }
}

export const updateCarByID = async (req, res) => {
    const { id } = req.params;
  try {
    const updateCar = await Voiture.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updateCar);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error 🔴" });
  }
}

export const deleteCarByID = async (req, res) => {
    const { id } = req.params;
      try {
        const deleteCar = await Car.deleteOne({ _id: id });
        if(deleteCar.deletedCount === 1){
            return res.status(404).json({message : 'Car has been deleted'})
        }
        return res.status(400).json({message : 'Car not found'})
      } catch (error) {
        return res.status(500).json({ message: "Internal server error 🔴" });
      }
}

export const assignOwner = async (req, res) => {
    const { id } = req.params; // ID de la voiture
      const { userId } = req.body; // ID de l'utilisateur transmis dans le corps de la requête
    
      if (!userId) {
        return res.status(400).json({ message: "userId est requis 🔴" });
      }
    
      try {
        // Vérifiez si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé 🔴" });
        }
    
        // Mettre à jour la voiture avec le nouvel utilisateur
        const updatedCar = await Car.findByIdAndUpdate(
          id,
          { owner: userId },
          { new: true } // Retourner la voiture mise à jour
        ).populate('owner', '-password'); // Remplir les détails de l'utilisateur si besoin
    
        if (!updatedCar) {
          return res.status(404).json({ message: "Voiture non trouvée 🔴" });
        }
    
        return res.status(200).json(updatedCar);
      } catch (error) {
        console.error("Erreur lors de l'affectation :", error);
        return res.status(500).json({ message: "Erreur interne du serveur 🔴" });
      }
}