import type { NextApiRequest, NextApiResponse } from 'next'
import sgClient from '../../../lib/sendgridClient'

/**
  Artist to Artist Contact
 */
export default async function sendArtistEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      senderName = 'Anonymous',
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
    const msg = {
      to: recipientEmail,
      from: 'team@outputfield.com',
      templateId: 'd-f0bff8d23784404aa5fa8108a9c0e0ad',
      dynamic_template_data: {
        senderName,
        topic,
        subject,
        title,
        location,
        mediums: mediums.length <= 1 ? mediums[0] : mediums.join(', '),
        message,
        recipientName,
        senderEmail,
      },
    }
    console.log('msg', msg)

    await sgClient.send(msg)
  } catch (error: any) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}
