const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    publicExcludes: [
      '!robots.txt',
      '!sitemap.xml.gz',
  ],
    runtimeCaching,
  },
})
