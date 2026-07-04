// Load environment variables
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // We only want to handle POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message, token } = req.body;

    // Basic validation
    if (!name || !email || !message || !token) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    // --- reCAPTCHA Verification ---
    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        });
        const captchaValidation = await response.json();

        if (!captchaValidation.success || captchaValidation.score < 0.5) {
            return res.status(400).json({ message: 'reCAPTCHA validation failed.' });
        }
    } catch (error) {
        console.error("reCAPTCHA validation error:", error);
        return res.status(500).json({ message: 'Failed to verify reCAPTCHA.' });
    }

    // --- Email Sending Logic ---
    const emailService = process.env.EMAIL_SERVICE;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailService || !emailUser || !emailPass) {
        console.error("Email environment variables not set.");
        return res.status(500).json({ message: 'Email service is not configured on the server.' });
    }

    let transporter;
    if (emailService.toLowerCase() === 'gmail') {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: emailUser, pass: emailPass },
        });
    } else if (emailService.toLowerCase() === 'outlook') {
        transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: { user: emailUser, pass: emailPass },
        });
    } else {
        return res.status(500).json({ message: `Unsupported email service: ${emailService}` });
    }

    try {
        const sendMailPromise = transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: emailUser,
            replyTo: email,
            subject: `New Atoptics Contact Form Message from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>`,
        });

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Email sending timed out after 30 seconds.'));
            }, 30000); // 30 seconds
        });

        // Race the email sending against the timeout
        await Promise.race([sendMailPromise, timeoutPromise]);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error sending email:", error);
        const errorMessage = error.message.includes('timed out') ? 'Request timed out. Please try again later.' : 'Failed to send email.';
        const statusCode = error.message.includes('timed out') ? 504 : 500;
        res.status(statusCode).json({ message: errorMessage });
    }
}