module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'outputfieldartworks.sfo3.digitaloceanspaces.com',
        port: '*',
        // pathname: '/account123/**',
        // pathname: '*'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '*',
        pathname: '/100'
      },
    ],
    // domains: [
    //   'via.placeholder.com',
    //   'outputfieldartworks.sfo3.digitaloceanspaces.com',
    // ],
  },
}
