/*
Modèle d'enregistrement des données avec quatre attributs,
avant d'être exportées vers la base de données MongoDB
*/

const mongoose = require('mongoose'); // Appel de la base de données MongoDB
const nodeFormSchema = new mongoose.Schema({
    name: { // Premier attribut
        type: String,
        trim: true,
    },
    email: { // Deuxième attribut
        type: String,
        trim: true,
    },
    objet: { // Troisième attribut
        type: String,
        trim: true,
    },
    message: { // Quatrième attribut
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Node-form', nodeFormSchema);