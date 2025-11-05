
// Remove unused import
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',        // Alltid tillåten
  ANALYTICS: 'analytics',        // Google Analytics etc.
  MARKETING: 'marketing',        // Ads, tracking, social media
  PERSONALIZATION: 'personalization' // Themes, preferences
};

// Default consent när inget finns sparat
export const DEFAULT_CONSENT = {
  [COOKIE_CATEGORIES.NECESSARY]: true,      // Krävs för basic functionality
  [COOKIE_CATEGORIES.ANALYTICS]: false,    // Opt-in required
  [COOKIE_CATEGORIES.MARKETING]: false,    // Opt-in required
  [COOKIE_CATEGORIES.PERSONALIZATION]: false, // Opt-in required
  version: '1.0',
  timestamp: null
};
/** 
@return {Object|null}
*/
export const getStoredConsent = () => {
    try {
        const stored = localStorage.getItem('yapsspace_cookie_consent');
        if (!stored) return null;
        
        const parsed = JSON.parse(stored);
    if (parsed.timestamp){
        const consentAge=Date.now()-new Date(parsed.timestamp).getTime();
        const maxAge = 365 * 24 * 60 * 60 * 1000;

        if (consentAge > maxAge) {
            console.log('Consent expired');
            localStorage.removeItem('yapsspace_cookie_consent');
            return null;
        }
    }

    return{
        ...DEFAULT_CONSENT,
        ...parsed,
    };
    } catch (error) {
        console.error('Error getting stored consent:', error);
        localStorage.removeItem('yapsspace_cookie_consent');
        return null;
    }
};

    
    /**
     * @param {Object} consent - consent object to save
     * @returns {Promise<Object>} saved consent data
     */
    export const saveConsent = async (consent) => {
        try {
            const consentData={
                ...consent,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                language: navigator.language,
            };
            localStorage.setItem('yapsspace_cookie_consent', JSON.stringify(consentData));
            try {
                const response =await fetch('/api/gdpr/consent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(consentData),
                });
                console.log(await response.json()); // tilfälligt för att se svaret i consollen
                if (!response.ok) {
                    console.warn('Failed to log consent on server:', response.statusText);
                }
            } catch (syncError) {
                console.warn('Error logging consent on server:', (syncError instanceof Error ? syncError.message : 'Unknown error'));
            }
            console.log('Consent saved:', consentData);
            return consentData;
        } catch (error) {
            console.error('Error saving consent:', error);
            throw new Error;('Failed to save consent');

        }
            };

            export const clearConsent = async () => {
                try {
                    localStorage.removeItem('yapsspace_cookie_consent');
                    try {
                        await fetch('/api/gdpr/consent', {
                            method: 'DELETE',
                            credentials: 'include',
                        });
                    } catch (syncError) {
                        console.warn('Error clearing consent on server:', (syncError instanceof Error ? syncError.message : 'Unknown error'));
                    }

                    clearCookiesByCategory(['analytics', 'marketing', 'personalization']);
                    console.log('Consent cleared');
                } catch (error) {
                    console.error('Error clearing consent:', error);
                    throw new Error('Failed to clear consent');
                };
            };

            /**
             * Clear cookies by category
             * @param {string[]} categories - Array of cookie categories to clear
             */
            export const clearCookiesByCategory = (categories) => {
               const cookiesByCategory = {
    [COOKIE_CATEGORIES.ANALYTICS]: [
      '_ga', '_gid', '_gat_gtag', '_gtag', // Google Analytics
      'yapspace_analytics',
      'yapspace_stats'
    ],
    [COOKIE_CATEGORIES.MARKETING]: [
      '_fbp', 'fbp', 'fr', '_fb_sess', // Facebook
      '_pinterest_sess', '_pin_unauth', // Pinterest
      'yapspace_marketing',
      'yapspace_ads',
      'yapspace_social_tracking'
    ],
    [COOKIE_CATEGORIES.PERSONALIZATION]: [
      'yapspace_theme',
      'yapspace_language', 
      'yapspace_layout_prefs',
      'yapspace_saved_searches',
      'yapspace_font_size'
    ]
  };

    categories.forEach(category => {
      const cookiesToClear = cookiesByCategory[category] || [];
      cookiesToClear.forEach(cookie => {
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.localhost;`;
        console.log(`Cleared cookie: ${cookie}`);
      });
    });
            };

          /**
           * Check if consent exists for a specific category
           * @param {string} category - The cookie category to check
           * @return {boolean} Whether consent exists for the category
           */  
          export const hasConsentForCategory = (category) => {
            const consent = getStoredConsent();
            if (!consent) {
                return category === COOKIE_CATEGORIES.NECESSARY;
            }
            return consent[category] === true;
          };

          /**
           * Set a cookie with consent validation
           * @param {string} name - Cookie name
           * @param {string} value - Cookie value
           * @param {string} category - Cookie category
           * @param {Object} options - Additional cookie options
           * @returns {boolean} True if cookie was set, false otherwise
           */
          export const setCookieWithConsent = (name, value, category, options = {}) => {
            if (!hasConsentForCategory(category)) {
                console.warn(`Cannot set cookie "${name}" - no consent for category "${category}"`);
                return false;
            }

            const defaults = {
                expires: 365,
                path: '/',
                sameSite: 'Lax',
                secure: window.location.protocol === 'https:',
                domain: undefined
            };
               const cookieOptions = {...defaults, ...options};
               let cookieString = `${name}=${encodeURIComponent(value)}`;
               if (cookieOptions.expires) {
                const date = new Date();
                date.setTime(date.getTime() + (cookieOptions.expires * 24 * 60 * 60 * 1000));
                cookieString += `; expires=${date.toUTCString()}`;
               }

               if (cookieOptions.path) {
                cookieString += `; path=${cookieOptions.path}`;
               }
               if(cookieOptions.domain) {
                cookieString += `; domain=${cookieOptions.domain}`;
               }
               if (cookieOptions.secure) {
                cookieString += `; secure`;
               }
                if (cookieOptions.sameSite) {
                cookieString += `; samesite=${cookieOptions.sameSite}`;
                }

               document.cookie = cookieString;
               console.log(`Cookie set:${name} (category: ${category})`);
               return true;
            };

            /**
             * Validate consent data structure
             * @param {Object} consent - Consent data to validate
             * @returns {Object} Validation result with isValid boolean and errors array
             */
            export const validateConsentData = (consent) => {
                const errors = [];

                Object.values(COOKIE_CATEGORIES).forEach(category => {
                    if (typeof consent[category] !== 'boolean') {
                        errors.push(`Invalid value for category "${category}" `);
                    }
                });

                if(consent[COOKIE_CATEGORIES.NECESSARY] !== true) {
                    errors.push('Necessary cookies must be accepted');
                }
                return {
                    isValid: errors.length === 0,
                    errors,
                };
            };

            export const COOKIE_DESCRIPTIONS = {
  [COOKIE_CATEGORIES.NECESSARY]: {
    title: 'Nödvändiga cookies',
    description: 'Dessa cookies krävs för att webbplatsen ska fungera och kan inte stängas av. De används för grundläggande funktioner som inloggning, säkerhet och att komma ihåg dina val.',
    examples: [
      'Inloggningsstatus och autentisering',
      'Säkerhetstokens och session-hantering', 
      'Språk- och regioninställningar',
      'Körfunktioner och navigationsstatus'
    ],
    duration: 'Session eller upp till 24 timmar',
    required: true,
    icon: '🔒'
  },
  [COOKIE_CATEGORIES.ANALYTICS]: {
    title: 'Analyscookies', 
    description: 'Hjälper oss att förstå hur du använder webbplatsen så vi kan förbättra den. All data är anonymiserad och används bara för statistik.',
    examples: [
      'Sidvisningar och klickbeteende',
      'Tid spenderad på olika sidor',
      'Felrapportering och prestandamätning',
      'Anonymiserad användningsstatistik'
    ],
    duration: 'Upp till 2 år',
    required: false,
    icon: '📊'
  },
  [COOKIE_CATEGORIES.MARKETING]: {
    title: 'Marknadsföringscookies',
    description: 'Används för att visa relevanta annonser och mäta effektiviteten av våra marknadsföringskampanjer. Kan också användas för social media integration.',
    examples: [
      'Annonsspårning och målgruppssegmentering',
      'Retargeting och remarketing pixels',
      'Social media tracking och delning',
      'Kampanjmätning och konvertering'
    ],
    duration: 'Upp till 1 år',
    required: false,
    icon: '📢'
  },
  [COOKIE_CATEGORIES.PERSONALIZATION]: {
    title: 'Personaliseringscookies',
    description: 'Sparar dina preferenser och inställningar för att ge dig en bättre och mer personlig upplevelse på webbplatsen.',
    examples: [
      'Tema-preferenser (mörkt/ljust läge)',
      'Layoutval och gränssnittsanpassningar',
      'Sparade sökningar och filter',
      'Språk- och innehållspreferenser'
    ],
    duration: 'Upp till 1 år',
    required: false,
    icon: '🎨'
  }
};