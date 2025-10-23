import React from "react";
import {motion,AnimatePresence} from 'framer-motion';
import { useCookieConsent } from "../../context/CookieConsentContext.jsx";
import './CookieConsentBanner.css';

const CookieConsentBanner=()=>{
    const{
        showBanner,
        isLoading,
        acceptAllCookies,
        rejectAllCookies, 
        openSettings,
    }=useCookieConsent();

    if(isLoading||!showBanner) 
      return null;

    const handleAcceptAll = async ()=>{
      try{
        await acceptAllCookies();
      }catch(error){
        console.error('Error accepting all cookies:',error);
      }
    };

    const handleRejectAll = async ()=>{
      try{
        await rejectAllCookies();
      }catch(error){
        console.error('Error rejecting cookies:',error);
      }
    };

    const handleCustomize =()=>{
      openSettings();
    };

    return(
      <AnimatePresence>
        <motion.div
        className="cookie-consent-banner"
        initial={{y:'100%', opacity:0}}
        animate={{y:'0%', opacity:1}}
        exit={{y:'100%', opacity:0}}
        transition={{
          type:"spring",
          stiffness:300,
          damping:30,
          duration:0.5,
        }}
            role="dialog"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-description"
        >
          <div className="cookie-banner-container" >
            <div className="cookie-banner-icon" >
              🍪
            </div>

            <div className="cookie-banner-content"  >
              <h2 id="cookie-banner-title" className="cookie-banner-title" >
                Vi använder cookie för att sälja din info till jobbiga telefonförsäljare
                som kommer driva dig till vansinne på mindre än 2 minuter.
              </h2>
              <p id="cookie-banner-description" className="cookie-banner-description" >
                Vi använder cookies(såklart)
               Inte för att vi vill — utan för att internet beter sig som en treåring utan dem.
               Vissa cookies håller ihop sidan så den inte smälter, andra hjälper oss förstå varför folk klickar på "Om oss" klockan 03:00.
               Allt för att din upplevelse ska kännas lite mindre trasig.
               Acceptera, neka, eller bara låtsas som att du läste det här. Vi dömer ingen.

               [Acceptera allt 🍪]  [Endast nödvändiga 🔒]  [Läs mer 📜]
              </p>

              <div  className="cookie-banner-policy" >
                <a 
                  href="/privacy-policy"
                  className="cookie-policy-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Läs vår integritetspolicy (om du kan Kinesiska)
                </a>
              </div>
            </div>

            <div className="cookie-banner-actions" >
              <div className="cookie-banner-primary-actions" >
                <motion.button
                  className="cookie-btn cookie-btn-accept"
                  onClick={handleAcceptAll}
                  whileHover={{scale:1.02}}
                  whileTap={{scale:0.98}}
                  aria-label="Acceptera alla cookie"
                >
                  <span>Acceptera alla 🍪</span>
                </motion.button>

                <motion.button
                  className="cookie-btn cookie-btn-reject"
                  onClick={handleRejectAll}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Avvisa alla icke-nödvändiga cookies"
                >
                  <span className="cookie-btn-icon">✗</span>
                  Avvisa alla
                </motion.button>
              </div>

              <div className="cookie-banner-secondary-actions">
                <motion.button
                  className="cookie-btn cookie-btn-customize"
                  onClick={handleCustomize}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Anpassa cookie inställningar"
                >
                  <span className="cookie-btn-icon">⚙️</span>
                  Anpassa inställningar
                </motion.button>
              </div>
            </div>

            <motion.button
              className="cookie-banner-close"
              onClick={handleRejectAll}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Stäng cookie banner och avvisa alla"
              title="Stäng (avvisar alla icke-nödvändiga cookies)"
            >
              ×
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
};

export default CookieConsentBanner;





