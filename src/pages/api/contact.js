// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name, email, subject, message } = req.body;

  // Validation basique
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true pour 465, false pour les autres ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email pour l'administrateur
    const adminMail = {
      from: `"Site Radio ENIS" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Email qui recevra les messages
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6200ea;">Nouveau message de contact</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6200ea;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Ce message a été envoyé depuis le formulaire de contact du site Radio ENIS.
          </p>
        </div>
      `,
    };

    // Email de confirmation pour l'utilisateur
    const userMail = {
      from: `"Radio ENIS" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Confirmation de réception de votre message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6200ea;">Merci pour votre message !</h2>
          <p>Bonjour <strong>${name}</strong>,</p>
          <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Résumé de votre message:</strong></p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message.substring(0, 100)}...</p>
          </div>
          
          <p>Cordialement,<br>L'équipe Radio ENIS</p>
          
          <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #666;">
            <p>ENIS, Université de Sfax - Tunisie<br>
            Email: contact@radioenis.tn</p>
          </div>
        </div>
      `,
    };

    // Envoi des emails
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });

  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du message' 
    });
  }
}