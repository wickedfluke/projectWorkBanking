import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendConfirmationEmail(username: string, userId: string) {
        const token = generateEmailToken(userId); 

        const confirmationLink = `${process.env.BASE_URL}/api/auth/confirm-email?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: username,
            subject: 'Confirm your email',
            text: `Please confirm your email by clicking on the following link: ${confirmationLink}`
        };

        await this.transporter.sendMail(mailOptions);
    }
}

function generateEmailToken(userId: string) {
    
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}

export const emailService = new EmailService();
