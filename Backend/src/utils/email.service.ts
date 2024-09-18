import nodemailer from 'nodemailer';

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: "mybankingtest@gmail.com",
                pass: "vkzz hmdo yors xemb",
            }
        });
    }

    async sendConfirmationEmail(username: string, userId: string, confirmationCode: string) {
        //ToDO: Change the BASE_URL to the actual base URL of the application
        //! REAL CONST const confirmationLink = `${process.env.BASE_URL}/api/auth/confirm-email?userId=${userId}&code=${confirmationCode}`;
        const confirmationLink = `http://localhost:3000/api/confirm-email?userId=${userId}&code=${confirmationCode}`;

        const mailOptions = {
            from: "mybankingtest@gmail.com",
            to: username,
            subject: 'Conferma la tua email',
            text: `Per favore conferma la tua email cliccando il seguente link: ${confirmationLink}`,
        };
        console.log(username, userId, confirmationCode);
        await this.transporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService();
