// Load environment variables
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // We only want to handle POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields: name, email, and message.' });
    }

    // Get email credentials from Vercel Environment Variables
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
        await transporter.sendMail({
            from: `"${name}" <${email}>`, // Show the sender's name and email
            to: emailUser, // Send the email to yourself
            replyTo: email, // Set the reply-to to the sender's email
            subject: `New Atoptics Contact Form Message from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: 'Failed to send email.', error: error.message });
    }
}