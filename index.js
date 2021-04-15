const colors = require('colors');
const express = require('express');
const router = express.Router();
const app = express();

app.use('/', (req, res) => {
    res.send('-: Il continue de dire NON avec la tête ! Sacré Cancre :-');
    // Message de réponse affiché à l'utilisateur
});

//------------ Lancement du serveur sur le port 3000 et affichage dans la console ------------

const server = app.listen(3000, () => {
    console.log(`.: --------------------------------:.`.bgGray.blue);
    console.log(`.: Express is running on port ${server.address().port} :.`.bgGray.blue);
    console.log(`.: --------------------------------:.`.bgGray.blue);
});