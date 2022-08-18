// import aws from 'aws-sdk'
import { S3 } from '@aws-sdk/client-s3'

/**
 * Create connection to DigitalOcean 'outputfield' Space
 */
// const spaces = new aws.S3({
//   endpoint: new aws.Endpoint(process.env.SPACES_ENDPOINT_URL || ''),
//   region: 'us-west-1',
//   credentials:{
//     accessKeyId: process.env.SPACES_ACCESS_ID || '',
//     secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY ||''
//   }
// })
const spaces = new S3({
  endpoint: process.env.SPACES_ENDPOINT_URL || '',
  region: 'us-west-1',
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_ID || '',
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY ||''
  }
})

export default spaces