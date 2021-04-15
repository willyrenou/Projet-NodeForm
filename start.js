const colors = require('colors');
require('colors');
require('dotenv').config();
require('./models/Node-form');
const app = require('./app');
const mongoose = require('mongoose'); // Appel de la base de données MongoDB

//------------ Connexion à la base de données ------------------------------------------------

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
    .on('open', () => {
        console.log('-: Mongoose connection open :-');
    })
    .on('error', (err) => {
        console.log(`-: Connection error: ${err.message} :-`);
    });

//------------ Lancement du serveur sur le port 3000 et affichage dans la console ------------

const server = app.listen(3000, () => {
    console.log(`.: --------------------------------:.`.bgGray.blue);
    console.log(`.: Express is running on port ${server.address().port} :.`.bgGray.blue);
    console.log(`.: --------------------------------:.`.bgGray.blue);
});