import sgClient from '../../../lib/sendgridClient'

/**
    Artist to Artist Contact
 */
export default async function sendArtistEmail(req, res) {
  try {
    const {
      senderName = '',
      senderEmail,
      recipientName,
      recipientEmail,
      topic,
      subject,
      message,
    } = req.body
    // console.log("REQ.BODY", req.body);
    const msg = {
      to: recipientEmail, // Change to your recipient
      from: 'team@outputfield.com',
      templateId: 'd-9cf2d11178ee4095ac907bde7a085a46',
      dynamic_template_data: {
        senderName, // TODO: get this from Prisma onSubmit from 'contact.tsx'
        topic,
        subject : `[${topic}]: ${subject}`,
        title,
        location,
        medium,
        message,
        recipientName,
        senderEmail,
      },
    }
    await sgClient.send(msg)
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}
