// Centralized Image Configuration for BSS Suraksha Services Pvt. Ltd.
// When client adds real images to src/assets/images/, they automatically load here.

const imageModules = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp,svg,mp4}', {
  eager: true,
  import: 'default',
})

// Helper to retrieve an image file if it exists on disk
export const getAsset = (fileName) => {
  for (const [key, value] of Object.entries(imageModules)) {
    if (key.endsWith('/' + fileName) || key.endsWith('\\' + fileName)) {
      return value
    }
  }
  return null
}

// Master image mapping for Homepage & Site Sections
export const siteImages = {
  logo: getAsset('logo.png') || getAsset('logo.svg') || getAsset('logo.webp'),
  hero: getAsset('hero.jpg') || getAsset('hero.webp') || getAsset('hero.png'),
  heroVideo: getAsset('hero.mp4'),
  about: getAsset('about.jpg') || getAsset('about.webp') || getAsset('about.png'),
  careers: getAsset('careers.jpg') || getAsset('careers.webp') || getAsset('careers.png'),
  technology: getAsset('technology.jpg') || getAsset('technology.webp') || getAsset('technology.png'),
  contactBg: getAsset('contact-bg.jpg') || getAsset('contact-bg.webp'),
  
  // 6 Verified Services
  services: {
    mannedGuarding: getAsset('service-guarding.jpg') || getAsset('service-guarding.webp'),
    corporateSecurity: getAsset('service-corporate.jpg') || getAsset('service-corporate.webp'),
    eventSecurity: getAsset('service-event.jpg') || getAsset('service-event.webp'),
    cctvSurveillance: getAsset('service-cctv.jpg') || getAsset('service-cctv.webp'),
    executiveProtection: getAsset('service-executive.jpg') || getAsset('service-executive.webp'),
    riskAssessment: getAsset('service-risk.jpg') || getAsset('service-risk.webp'),
  },

  // News / Insights
  news: [
    getAsset('news-1.jpg') || getAsset('news-1.webp'),
    getAsset('news-2.jpg') || getAsset('news-2.webp'),
    getAsset('news-3.jpg') || getAsset('news-3.webp'),
  ]
}

export default siteImages
