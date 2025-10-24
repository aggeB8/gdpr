import React, { useState } from "react";
import {motion,AnimatePresence} from 'framer-motion';
import { useCookieConsent } from "../../context/CookieConsentContext.jsx";
import { Link } from "react-router-dom";
import './CookieConsentBanner.css';

const PrivacyPolicyModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Stäng"
        >
          ×
        </button>
        <div style={{maxHeight: '70vh', overflowY: 'auto'}}>
          <h2 className="text-2xl font-bold mb-4">Integritetspolicy</h2>
          <div className="prose prose-lg text-gray-800">
            <p><strong>Översikt</strong></p>
            <p>Välkommen till vår integritetspolicy – den digitala motsvarigheten till att läsa villkoren på en mikrovågsugn.<br/>
            Här förklarar vi hur vi hanterar dina data, vilket i praktiken betyder att vi försöker hålla sidan vid liv utan att få GDPR-panik.<br/>
            Klickar du runt här lämnar du spår, och vi samlar in dem som digitala Pokémon. Allt i vetenskapens, eller åtminstone underhållningens, namn.</p>
            <p><strong>🍪 Cookies och Spårning</strong></p>
            <p><strong>🔒 Nödvändiga Cookies</strong><br/>
            Dessa cookies är internetets motsvarighet till syre.<br/>
            Stänger du av dem dör allt – sidan, vi, och förmodligen din webbläsare.<br/>
            De ser till att du är inloggad, att sidan inte glömmer vem du är, och att världen inte spontant förvandlas till 404.</p>
            <p><strong>📊 Analyscookies</strong><br/>
            Här börjar det bli intressant.<br/>
            De här små digitala spionerna berättar för oss hur du rör dig på sidan – var du klickar
            Vi analyserar det hela för att förstå mänskligt beteende. Spoiler: det är kaos.</p>
            <p><strong>📢 Marknadsföringscookies</strong><br/>
            Dessa cookies är våra små skrikhalsar på internet.<br/>
            De följer dig som en överentusiastisk säljare på en teknikmässa, bara för att kunna visa dig en annons om något du nämnde högt i köket igår.<br/>
            Vi svär, vi gör det av kärlek. Och lite desperation.</p>
            <p><strong>🎨 Personaliseringscookies</strong><br/>
            De här är som små butlers i din webbläsare.<br/>
            De kommer ihåg om du gillar mörkt läge, svenska eller engelska, och om du är den där personen som klickar “nej” på allt.<br/>
            De försöker göra upplevelsen personlig – men låt oss vara ärliga, de gissar mest.</p>
            <p><strong>⚖️ Dina Rättigheter enligt GDPR</strong><br/>
            Du har rättigheter! (Ja, på riktigt.)<br/>
            Du kan be oss radera allt, rätta saker, eller bara skicka dig ett mejl med rubriken “Vi vet inget längre”.<br/>
            Du kan också ta tillbaka ditt samtycke – men då kanske våra cookies gråter.<br/>
            Kort sagt: du har makten, vi har ångesten.</p>
            <p><strong>🛠️ Hantera dina Cookie-inställningar</strong><br/>
            Vill du ändra något? Kör hårt.<br/>
            Klicka på cookie-ikonen, skruva i webbläsaren eller kasta din dator i sjön – allt funkar på sitt sätt.<br/>
            (Vi rekommenderar dock alternativ 1 eller 2, av juridiska skäl.)</p>
            <p><strong>📬 Kontakt</strong><br/>
            Har du frågor, klagomål eller bara ett behov av att ventilera din ilska över hur internet fungerar?<br/>
            Hör av dig till oss.<br/>
            Vi svarar så fort vi är klara med att scrolla igenom en 900-sidors GDPR-tråd på Reddit.</p>
            <p><strong>E-post:</strong> privacy@yapspace.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CookieConsentBanner=()=>{
    const{
        showBanner,
        isLoading,
        acceptAllCookies,
        rejectAllCookies, 
        openSettings,
    }=useCookieConsent();
    const [showPolicy, setShowPolicy] = useState(false);

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
      <>
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
            style={{
              position: 'fixed',
              left: 32,
              bottom: 0,
              zIndex: 1000,
              background: 'rgba(255,255,255,0.98)',
              borderRadius: '12px 12px 0 0',
              boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
              padding: '12px 18px 8px 18px',
              minWidth: 320,
              maxWidth: 700,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 36, marginRight: 12, marginLeft: 0, flexShrink: 0 }} role="img" aria-label="cookie">🍪</span>
            <div style={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h2 id="cookie-banner-title" className="cookie-banner-title" style={{ fontSize: '1.05rem', marginBottom: 6, textAlign: 'left' }}>
                Vi använder cookie för att sälja din info till jobbiga telefonförsäljare
                som kommer driva dig till vansinne på mindre än 2 minuter.
              </h2>
              <p id="cookie-banner-description" className="cookie-banner-description" style={{ fontSize: '0.98rem', marginBottom: 6, textAlign: 'left' }}>
                Vi använder cookies (såklart). Inte för att vi vill — utan för att internet beter sig som en treåring utan dem.
                Vissa cookies håller ihop sidan så den inte smälter, andra hjälper oss förstå varför folk klickar på "Om oss" klockan 03:00.
                Allt för att din upplevelse ska kännas lite mindre trasig. Acceptera, neka, eller bara låtsas som att du läste det här. Vi dömer ingen.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                <button
                  type="button"
                  className="cookie-btn cookie-btn-accept inline"
                  onClick={handleAcceptAll}
                  style={{ padding: '2px 8px', fontSize: '1em' }}
                >
                  Acceptera allt 🍪
                </button>
                <button
                  type="button"
                  className="cookie-btn cookie-btn-reject inline"
                  onClick={handleRejectAll}
                  style={{ padding: '2px 8px', fontSize: '1em' }}
                >
                  Endast nödvändiga 🔒
                </button>
                <button
                  type="button"
                  className="cookie-btn cookie-btn-customize inline"
                  onClick={handleCustomize}
                  style={{ padding: '2px 8px', fontSize: '1em' }}
                >
                  Läs mer 📜
                </button>
              </div>
              <div className="cookie-banner-policy" style={{ marginTop: 2, overflowWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left', width: '100%' }}>
                <button
                  type="button"
                  className="cookie-policy-link"
                  style={{textDecoration: 'underline', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0, font: 'inherit', fontSize: '1em', whiteSpace: 'normal', textAlign: 'left', width: '100%', display: 'block'}}
                  onClick={() => setShowPolicy(true)}
                >
                  Läs vår integritetspolicy (om du kan Kinesiska)
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <PrivacyPolicyModal open={showPolicy} onClose={() => setShowPolicy(false)} />
      </>
    );
};

export default CookieConsentBanner;





