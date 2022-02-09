import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    const {
      senderName = "",
      senderEmail,
      recipientName,
      recipientEmail,
      topic,
      subject,
      message,
    } = req.body;
    // console.log("REQ.BODY", req.body);
    const msg = {
      to: recipientEmail, // Change to your recipient
      from: "team@outputfield.com",
      templateId: "d-f43daeeaef504760851f727007e0b5d0", // TODO: Replace with template id once created
      dynamic_template_data: {
        subject: `[${topic}]: ${subject}`,
        message,
        recipientName,
        senderName, // TODO: get this from Prisma onSubmit from 'contact.tsx'
        senderEmail,
      },
    };
    await sendgrid.send(msg);
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;

// TODO: Create dynamic transactional templates in Sendgrid
//           * Nomination email
//           * Artist to Artist email
//           * Help/ Contact Us email
