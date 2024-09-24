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
        const confirmationLink = `https://governing-nike-wickedlabel-b8b1618b.koyeb.app/api/confirm-email?userId=${userId}&code=${confirmationCode}`;

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #333;">Conferma il tuo indirizzo email</h2>
            <p>Ciao, Grazie per esserti registrato con noi! Per completare la tua registrazione, per favore conferma il tuo indirizzo email cliccando sul pulsante qui sotto:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${confirmationLink}" style="background-color: #f48c06; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Conferma la tua email</a>
            </div>
            <p>Se non riesci a cliccare il pulsante, clicca il seguente link:</p>
            <p><a href="${confirmationLink}">${confirmationLink}</a></p>
            <p style="color: #777;">Se non hai richiesto questa registrazione, puoi ignorare questa email.</p>
            <p>Grazie,<br>Il team di MyBanking</p>
        </div>
    `;


        const mailOptions = {
            from: "mybankingtest@gmail.com",
            to: username,
            subject: 'Conferma la tua email',
            html: htmlContent
        };
        console.log(username, userId, confirmationCode);
        await this.transporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService();
