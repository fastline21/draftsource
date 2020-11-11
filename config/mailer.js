const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
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
});

module.exports = {
	sendEmail(from, to, subject, html, attachments) {
		return new Promise((resolve, reject) => {
			transport.sendMail(
				{ from, to, subject, html, attachments },
				(err, info) => {
					if (err) reject(err);

					resolve(info);
				}
			);
		});
	},
};
