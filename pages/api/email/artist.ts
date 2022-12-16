import type { NextApiRequest, NextApiResponse } from 'next'
import sgClient from '../../../lib/sendgridClient'

/**
  Artist to Artist Contact
 */
export default async function sendArtistEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      senderName = '',
      senderEmail,
      recipientName,
      recipientEmail,
      topic,
      subject,
      title,
      location,
      mediums,
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
        mediums,
        message,
        recipientName,
        senderEmail,
      },
    }
    await sgClient.send(msg)
  } catch (error: any) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}
