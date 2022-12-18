import aws from 'aws-sdk'

const spaces = new aws.S3({
  endpoint: process.env.SPACES_ENDPOINT_URL || '',
  region: 'us-west-1',
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_ID || '',
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY || ''
  }
})

export default spaces