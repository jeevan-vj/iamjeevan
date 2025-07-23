// Google AdSense Configuration
// Using responsive ad units for optimal performance across all devices

const adConfig = {
  // Google AdSense Client ID
  clientId: 'ca-pub-5489372004076046',
  
  // Responsive Ad Unit Slot IDs - Replace with your actual responsive ad unit slot IDs
  slots: {
    // Main responsive ad unit - Use this for most placements
    responsive: '8077704449', // Your actual responsive ad slot ID
    
    // You can create additional responsive ad units for different contexts if needed
    responsiveSecondary: '8077704449', // Use same ID or create another responsive unit
    responsiveTertiary: '8077704449',   // Use same ID or create another responsive unit
  },
  
  // Ad Settings
  settings: {
    // Enable/disable ads globally
    enabled: true,
    
    // Lazy loading settings
    lazyLoading: true,
    
    // Scroll percentages for triggering ads
    scrollTriggers: {
      banner: 30,
      rectangle: 40,
      mobile: 25,
      inFeed: 60,
      sidebar: 30,
      midContent: 35,
      inline: 45,
      contentBreak: 50,
    },
    
    // Reading time thresholds
    readingTime: {
      minForMultipleAds: 3, // minutes
      maxAdsPerPost: 3,
    },
    
    // Responsive settings
    responsive: {
      enabled: true,
      fullWidthResponsive: true,
    },
  },
}

export default adConfig