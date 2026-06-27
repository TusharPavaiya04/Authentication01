import nodemailer from 'nodemailer';
import 'dotenv/config';

export const verifyMail = async (token, email) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const verificationLink =
        `${process.env.BACKEND_URL}/api/auth/verify/${token}`;

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html: `
        <div style="font-family:Arial;padding:20px">
            <h2>Email Verification</h2>

            <p>
                Thank you for registering.
                Click the button below to verify your email.
            </p>

            <a
              href="${verificationLink}"
              style="
                display:inline-block;
                padding:12px 20px;
                background:#4CAF50;
                color:white;
                text-decoration:none;
                border-radius:5px;
              "
            >
              Verify Email
            </a>

            <p style="margin-top:20px">
                Or open this link:
            </p>

            <p>
                ${verificationLink}
            </p>
        </div>
        `
    };

    await transporter.sendMail(mailOptions);

    console.log('Verification email sent');
};