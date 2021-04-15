const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer'); // Appel du module de gestion mail

//const { body, validationResult } = require('express-validator/check');
const { check, validationResult, matchedData } = require('express-validator');

const mongoose = require('mongoose'); // Appel de la base de données MongoDB
const NodeForm = mongoose.model('Node-form'); // Modèle d'enregistrement des données

const path = require('path');
const auth = require('http-auth'); // Appel du module d'authentification

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

//---------- Réponses affichées à l'utilisateur ----------------------------------------

router.get('/', (req, res) => {
    //res.send('[Le cancre] - Il continue de dire NON avec la tête !'); // Etape 1
    //res.render('form');
    res.status(200).render('form', {
        /*---------- Etape 2 --------------------------
        title: '.: Registration :.',
        cancre: '.: Mais il dit OUI avec le coeur :.'
        */
        title: 'Contact',
        cancre: 'Ecrivez-nous !'
    });
});

router.post('/', // Vérification imposant le remplissage des champs obligatoires
    [
        check('name')
        .isLength({ min: 1 })
        .withMessage('merci de saisir votre nom') // Message d'erreur si le champ n'est pas rempli
        .trim(),
        check('email')
        .isEmail()
        .withMessage('merci de saisir votre email') // Message d'erreur si le champ n'est pas rempli
        .bail()
        .trim()
        .normalizeEmail(),
        check('objet')
        .isLength({ min: 1 })
        .withMessage('merci de saisir l\'objet') // Message d'erreur si le champ n'est pas rempli
        .trim(),
        check('message')
        .isLength({ min: 1 })
        .withMessage('merci de saisir votre message') // Message d'erreur si le champ n'est pas rempli
        .trim()
    ],
    (req, res) => { // Début de la requête
        const errors = validationResult(req); // Prise en compte des données utilisateur

        console.log(req.body);

        if (errors.isEmpty()) { // Boucle pour la saisie des données par l'utilisateur
            /*----------- Etape 3 ---------------------------------------------
            res.send('.:Thank you (￣▽￣)ノ:.');
            res.redirect('/');
            */

            /*----------- Etape 4 ---------------------------------------------*/
            const nodeForm = new NodeForm(req.body);
            nodeForm.save()
                .then(() => { res.send('Bonjour, nous vous remercions pour votre message et vous répondrons dans les meilleurs délais. Cordialement, l\'équipe Wil World'); })
                // Message de confirmation affiché à l'écran de l'utilisateur
                .catch((err) => {
                    console.log(err);
                    res.send('.: Sorry! Something went wrong :.');
                });
        } else {
            res.render('form', {
                title: '-:POST:-',
                errors: errors.array(),
                data: req.body,
            });
        } // Fin de la boucle

        /*----------- Envoi mail de réponse à l'utilisateur -----------*/
        let transport = nodemailer.createTransport({ // Chemin vers le serveur de messagerie virtuelle et identifiants générés
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: 'cd06b594477f82',
                pass: 'df8e4f5821cc3f'
            }
        });
        const message = {
            from: 'w.renou@hotmail.fr', // Expéditeur du mail
            to: req.body.email, // Récupération de l'adresse mail utilisateur dans le header du mail de réponse
            subject: 'Re : ' + req.body.objet, // Récupération de l'objet dans le header du mail de réponse
            html: '<h1>Bonjour,</h1><p>Nous vous remercions pour votre message et vous répondrons dans les meilleurs délais.</p><p>Cordialement,</p><p>l\'équipe Wil World</p>',
            text: 'Bonjour ' + req.body.name + ',\n\nNous vous remercions pour votre message et vous répondrons dans les meilleurs délais.\n\nCordialement,\nl\'équipe Wil World\n\n-----------\n\nRappel de votre message :\n\n' +
                req.body.message + '\n\nCordialement,\n' + req.body.name, // Récupération du message et du nom utilisateur dans le mail de réponse
            attachments: [{ // Use a URL as an attachment
                filename: 'your-testla.png',
                path: 'https://media.gettyimages.com/photos/view-of-tesla-model-s-in-barcelona-spain-on-september-10-2018-picture-id1032050330?s=2048x2048'
            }]
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }); // Fin de la requête

/*----------- Etape 5 ---------------------------------------------
router.get('/list', (req, res) => {
	NodeForm.find()
		.then((nodeForms) => {
			res.render('index', { title: 'Liste des clients', nodeForms, cancre: 'Liste des clients Wil World' });
		})
		.catch(() => { res.send('-:Sorry! Something went wrong ( ͡ ͜ʖ ͡ ) :-'); });
});
*/

/*----------- Etape 6 ---------------------------------------------*/
router.get('/list', basic.check((req, res) => { // Visualisation des données stockées du côté administrateur
    NodeForm.find()
        .then((nodeForms) => {
            res.render('index', { title: 'Liste des messages', nodeForms, cancre: 'Liste des messages clients' });
        })
        .catch(() => { res.send('-:Sorry! Something went wrong ( ͡ ͜ʖ ͡ ) :-'); });
}));

module.exports = router;