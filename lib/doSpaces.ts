import aws from 'aws-sdk'

const spaces = new aws.S3({
  endpoint: new aws.Endpoint(process.env.SPACES_ENDPOINT_URL || ''),
  accessKeyId: process.env.SPACES_ACCESS_ID,
  secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY
})

export default spaces