import nodemailer from "nodemailer";

let transporterPromise;

function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = nodemailer.createTestAccount().then((account) =>
      nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      }),
    );
  }

  return transporterPromise;
}

export async function sendConfirmationMail(to, name, job) {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: '"Easily Jobs" <no-reply@easily.example>',
    to,
    subject: `Application received: ${job.jobdesignation} at ${job.companyname}`,
    text: `Hi ${name},\n\nYour application for ${job.jobdesignation} at ${job.companyname} has been received.\n\nThank you for applying!\nEasily Jobs`,
  });

  console.log("Application confirmation email preview:", nodemailer.getTestMessageUrl(info));
  return info;
}
