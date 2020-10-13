const nodemailer = require('nodemailer');

let mailConfig;

if (process.env.NODE_ENV === 'production') {
	mailConfig = {
		host: process.env.MAILER_HOST,
		port: process.env.MAILER_PORT,
		auth: {
			user: process.env.MAILER_USER,
			pass: process.env.MAILER_PASSWORD,
		},
	};
} else {
	mailConfig = {
		host: process.env.MAILER_HOST,
		port: process.env.MAILER_PORT,
		secure: false,
		auth: {
			user: process.env.MAILER_USER,
			pass: process.env.MAILER_PASSWORD,
		},
		tls: {
			secureProtocol: 'TLSv1_method',
		},
	};
}

const transport = nodemailer.createTransport(mailConfig);

module.exports = {
	sendEmail(from, to, subject, html) {
		return new Promise((resolve, reject) => {
			transport.sendMail({ from, to, subject, html }, (err, info) => {
				if (err) reject(err);

				resolve(info);
			});
		});
	},
};
