const nodemailer = require('nodemailer');

/* Creating a nodemailer transport:
let transport = nodemailer.createTransport(options[, defaults])

Send message through our transport ==> configure the connection first

Mailtrap is a "fake SMTP server" used for development purposes.
Instead of having to test your code with your own email account,
and potentially flooding your inbox with test emails,
you can instead use Mailtrap as the endpoint.
So:
Create a new account on Mailtrap if you don't already have one,
and then create a new inbox and get your credentials:
Now:
All we need to do is put the credentials into nodemailer's transport object
*/

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'cd06b594477f82',
        pass: 'df8e4f5821cc3f'
    }
});

/* Go ahead and send email:

const message = {
    from: 'w.renou@hotmail.fr',
    to: 'w.renou@hotmail.fr',         // List of recipients
    subject: '[02M1I20201947] - NodeJS',
	html: '<h1>Enjoy with Nodemailer!</h1><p>You saved me an hour of tedious drunk walking --> Tu m\'as sauvé d\'une heure de marche pénible.</p>'
};
transport.sendMail(message, function(err, info) {
    if (err) {
        console.log(err);
    } else {
        console.log(info);
    }
});
*/
// Attachment
const message = {
    from: 'w.renou@hotmail.fr',
    to: 'w.renou@hotmail.fr',
    subject: '[02MAI20202148] - NodeJS',
    html: '<h1>So what</h1><p>What\'s did you expect --> Tu m\'as sauvé d\'une heure de marche pénible.</p>',
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