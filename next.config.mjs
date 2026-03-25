import nextra from 'nextra'

const withNextra = nextra({
  // Nextra 4 options
})

export default withNextra({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  }
})
