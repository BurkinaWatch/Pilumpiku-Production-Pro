import { Router, type IRouter } from "express";
import { db, inscriptionsTable } from "@workspace/db";
import nodemailer from "nodemailer";

const router: IRouter = Router();

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function getMailer() {
  const host = process.env["SMTP_HOST"] || "smtp.gmail.com";
  const port = Number(process.env["SMTP_PORT"] || "587");
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  if (!user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure: false, auth: { user, pass } });
}

router.post("/inscriptions", async (req, res): Promise<void> => {
  const { service, nom, email, telephone, message } = req.body as Record<string, string>;

  if (!service || !nom || !nom.trim()) {
    res.status(400).json({ error: "Le nom est requis" });
    return;
  }
  if (!email || !isValidEmail(email)) {
    res.status(400).json({ error: "Adresse email invalide" });
    return;
  }

  await db.insert(inscriptionsTable).values({ service, nom, email, telephone, message });

  const mailer = getMailer();
  const recipient = process.env["CONTACT_EMAIL"] || "piiulgu@gmail.com";

  if (mailer) {
    try {
      await mailer.sendMail({
        from: `"Pilumpiku Production" <${process.env["SMTP_USER"]}>`,
        to: recipient,
        replyTo: email,
        subject: `[Inscription] ${service} — ${nom}`,
        html: `
          <h2>Nouvelle inscription — ${service}</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:8px;font-weight:bold;color:#E8921A;">Nom</td><td style="padding:8px;">${nom}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#E8921A;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${telephone ? `<tr><td style="padding:8px;font-weight:bold;color:#E8921A;">Téléphone</td><td style="padding:8px;">${telephone}</td></tr>` : ""}
            ${message ? `<tr><td style="padding:8px;font-weight:bold;color:#E8921A;vertical-align:top;">Message</td><td style="padding:8px;">${message.replace(/\n/g, "<br>")}</td></tr>` : ""}
          </table>
          <p style="color:#888;font-size:12px;margin-top:16px;">Reçu via pilumpiku.com · Labo Piiulgu</p>
        `,
      });
    } catch (err) {
      console.error("[inscriptions] Email send failed:", err);
    }
  }

  res.status(201).json({ success: true });
});

export default router;
