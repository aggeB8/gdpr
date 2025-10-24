import React, { useState } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import { useCookieConsent } from '../../context/CookieConsentContext.jsx';
import './CookieSettings.css';
import { Link } from "react-router-dom";

const CookieSettings=()=>{
  const {
    showSettings,
    consent,
    updateConsent,
    closeSettings,
    COOKIE_CATEGORIES
  }=useCookieConsent();


  const [tempConsent,setTempConsent]=useState(consent||{});

  React.useEffect(()=>{
    setTempConsent(consent);
  },[consent]);

  if(!showSettings){
    return null;
  }

  const handleToggle=(category,enabled)=>{
    if(category===COOKIE_CATEGORIES.NECESSARY){
      return;
    }

    setTempConsent(prev=>({
      ...prev,
      [category]:enabled,
    }));
  }

  const handleSaveSettings=async()=>{
    try{
      await updateConsent(tempConsent,true);
    } catch(error){
      console.log('Error saving cookie settings:',error);
    }
  };

      const handleCancel=()=>{
        setTempConsent(consent||{});
        closeSettings();
      };

      const handleAcceptAll=()=>{
        const allAccepted={
          [COOKIE_CATEGORIES.NECESSARY]:true,
          [COOKIE_CATEGORIES.ANALYTICS]:true,
          [COOKIE_CATEGORIES.MARKETING]:true,
          [COOKIE_CATEGORIES.PERSONALIZATION]:true,
        };
        setTempConsent(allAccepted);
      };

      const handleRejectAll=()=>{
        const onlyNecessary={
          [COOKIE_CATEGORIES.NECESSARY]:true,
          [COOKIE_CATEGORIES.ANALYTICS]:false,
          [COOKIE_CATEGORIES.MARKETING]:false,
          [COOKIE_CATEGORIES.PERSONALIZATION]:false,
        };
        setTempConsent(onlyNecessary);
      };
          
      const renderCategorySection=(category,description)=>{
        const isEnabled=tempConsent[category]===true;
        const isRequired=description.required;
        const canToggle=!isRequired;

        return(
          <div key={category} className="cookie-category">
            <div className="cookie-category-header" >
              <div className="cookie-category-info">
                <div className="cookie-category-title">
                  <span
                    className="cookie-category-icon"
                    role="img"
                    aria-label={description.title} 
                  >
                    {description.icon}
                  </span>
                  <h4>{description.title}</h4>
                  {isRequired && (
                    <span className="cookie-category-required"
                      title="Nödvändiga för webbplatsens funktionalitet"
                    >
                      (Obligatorisk)
                    </span>
                  )}
                </div>
                <p className="cookie-category-description">
                  {description.description}
                </p>
              </div>

              {/* Toggle switch */}
              <div className="cookie-category-toggle">
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(e) => handleToggle(category,e.target.checked)}
                    disabled={!canToggle}
                    aria-label={`${description.title} ${isEnabled ? 'aktiverad' : 'inaktiverad'}`}
                  />
                  <span className={`cookie-toggle-slider ${!canToggle ? 'disabled' : ''}`}></span>
                  <span className="cookie-toggle-text">
                  </span>
                </label>
              </div>
            </div>

            <motion.div
              className="cookie-category-details" 
              initial={false}
              animate={{
                height:"auto",
                opacity:1,
              }}
              transition={{duration:0.3}}
            >
              <div className="cookie-category-examples">
                <h5>Används för</h5>
                <ul>
                  {description.examples && description.examples.map((example,index)=>(
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              <div className="cookie-category-duration" >
                <strong>Lagringstid:</strong> {description.duration}
              </div>
            </motion.div>
          </div>
        );
      };

    return(
      <AnimatePresence>
        <motion.div
          className="cookie-settings-overlay" 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          onClick={handleCancel}// clicka utanför för att stänga
        >
          <motion.div
            className="cookie-settings-modal"
            initial={{scale:0.9,opacity:0,y:20}}
            animate={{scale:1,opacity:1,y:0}}
            exit={{scale:0.9,opacity:0,y:20}}
            transition={{type:"string",damping:25,stiffness:300}}
            onClick={(e)=>e.stopPropagation()}// förhindra stängning vid klick inuti modalen
            role="dialog"
            aria-labelledby="cookie-settings-title"
            aria-modal="true"
          >
            {/*Header*/}
            <div className="cookie-settings-header">
              <h2 id="cookie-settings-title">Cookie Inställningar</h2>
              <p className="cookie-settings-subtitle">
                Anpassa dina kakor hur fan du vill vi kommer äga dig ändå
              </p>
              <button
              className="cookie-settings-close"
              onClick={handleCancel}
              aria-label="Stäng och krossa cookie inställningar"
              >
                ×
            </button>
            </div>

            {/*Quick Actions*/}

            <div className="cookie-settings-quick-actions">
              <button
              className="cookie-quick-btn cookie-quick-accept"
              onClick={handleAcceptAll}
              >
                Acceptera Alla
              </button>
              <button
              className="cookie-quick-btn cookie-quick-reject"
              onClick={handleRejectAll}
              >
                ✗ Endast nödvändiga
              </button>
            </div>

            {/*Category Sections*/}
            
            <div className="cookie-settings-content">
              <div className="cookie-categories" >
                {Object.entries(COOKIE_CATEGORIES).map(([category,description])=>
                  renderCategorySection(category,description)
                )}
              </div>
            </div>

            {/*Footer*/}
            <div className="cookie-settings-footer">
              <div className="cookie-setting-info" >
                <small>
                  klicka på knappen bara tänk inte för mycket nu. Du har inget val ändå men vi låtsas att du har det.
                  <br/>
                  <Link to="/privacy-policy" className="cookie-policy-link">
                    Du kan läsa mer i vår integritetspolicy om ids.
                  </Link>
                </small>
              </div>

              <div className="cookie-settings-actions">
                <button
                className="cookie-settings-btn cookie-settings-cancel"
                onClick={handleCancel}
                >
                  Avbryt
                </button>
                <button
                className="cookie-settings-btn cookie-settings-save"
                onClick={handleSaveSettings}
                >
                  Spara Inställningar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
};
export default CookieSettings;




