import React, { useState } from "react";
import {motion,AnimatePresence} from 'framer-motion';
import { useCookieConsent } from "../../context/CookieConsentContext.jsx";
import { Link } from "react-router-dom";
import './CookieConsentBanner.css';

const PrivacyPolicyModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 p-6 relative" style={{maxHeight: '90vh'}}>
        <button
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Stäng"
        >
          ×
        </button>
        <div style={{maxHeight: 'calc(90vh - 80px)', overflowY: 'auto', paddingRight: '10px'}}>
          <h2 className="text-2xl font-bold mb-4">Integritetspolicy</h2>
          <div className="prose prose-lg text-gray-800">
            <p><strong>🧭 Översikt</strong></p>
            <p>Välkommen till vår integritetspolicy – den juridiska motsvarigheten till att läsa bruksanvisningen för en granatkastare.<br/>
            Här förklarar vi hur vi hanterar dina data utan att få ett nervöst sammanbrott över GDPR.</p>
            <p>När du klickar runt här lämnar du spår. Vi samlar dem, analyserar dem och försöker förstå vad du håller på med.<br/>
            Inte för att vi är NSA – vi är bara nyfikna och lite kontrollfreaks.</p>
            <p>Kort sagt: du surfar, vi samlar, alla överlever (förhoppningsvis).</p>
            
            <p><strong>🍪 COOKIES – SMÅ DIGITALA SPIONER MED ATTITYD</strong></p>
            
            <p><strong>🔒 Nödvändiga Cookies</strong><br/>
            Det här är internets version av hjärtslag.<br/>
            Utan dem – poff! – allt dör.<br/>
            De ser till att du kan logga in, att sidan inte glömmer vem du är, och att universum inte kraschar i 404.<br/>
            ➡️ <em>Laglig grund:</em> Artikel 6(1)(b) – vi måste använda dem. Deal with it.</p>
            
            <p><strong>📊 Analyscookies</strong><br/>
            De här små nördarna sitter i bakgrunden och räknar hur du klickar, scrollar och tappar tålamodet.<br/>
            Vi använder datan för att förbättra sidan och bevisa att människor på internet är… oförutsägbara varelser.<br/>
            ➡️ <em>Samtycke krävs</em> (Artikel 7). Du kan stänga av dem. Vi tar en shot och går vidare.</p>
            
            <p><strong>📢 Marknadsföringscookies</strong><br/>
            De är som överentusiastiska försäljare som följer efter dig på stan.<br/>
            "Du gillade en tröja? Vill du ha 37 annonser om tröjor till?!"<br/>
            ➡️ Du bestämmer. Klicka "nej" om du vill leva i reklamfri tystnad. Vi försöker att inte gråta.</p>
            
            <p><strong>🎨 Personaliseringscookies</strong><br/>
            Små digitala butlers med tveksam självinsikt.<br/>
            De försöker gissa om du gillar mörkt läge, svenska eller engelska, och vad du klickar "nej" på.<br/>
            Ibland har de rätt. Oftast inte.<br/>
            ➡️ <em>Syfte:</em> Att låtsas känna dig (Artikel 5 – dataminimering, typ).</p>
            
            <p><strong>⚖️ DINA RÄTTIGHETER (AKA: DU ÄR CHEFEN)</strong></p>
            <p>Du har fler rättigheter än en influenser på samarbete:</p>
            <ul>
              <li><strong>✉️ Få ut dina data</strong> (Artikel 15) – be oss, så skickar vi en fil som ser ut som Matrix fast med färre Keanu Reeves.</li>
              <li><strong>🗑️ Radera allt</strong> (Artikel 17) – vill du försvinna digitalt? Vi trycker på delete så hårt att datorn gnisslar.</li>
              <li><strong>💾 Ladda ner dina data</strong> (Artikel 20) – i ett maskinläsbart format. Perfekt för nostalgiska tillbakablickar.</li>
              <li><strong>🧩 Rätta fel</strong> (Artikel 16) – om något är fel, säg till. Vi fixar det snabbare än du hinner skriva "GDPR violation".</li>
              <li><strong>🛑 Ta tillbaka ditt samtycke</strong> (Artikel 7) – inga problem. Våra cookies kommer sakna dig, men de klarar sig.</li>
              <li><strong>� Kräv transparens</strong> (Artikel 12–14) – du får veta exakt vad vi gör, utan juridiskt mumbo-jumbo.</li>
            </ul>
            <p>Kort sagt: du bestämmer, vi får panik och försöker se professionella ut.</p>
            
            <p><strong>🛠️ COOKIEINSTÄLLNINGAR – TA KONTROLL (ELLER LÅT BLI)</strong><br/>
            Vill du ändra dina inställningar?<br/>
            Klicka på cookie-ikonen (du vet, den lilla grejen du ignorerade för fem minuter sen).<br/>
            Eller stäng av allt i webbläsaren.<br/>
            Alternativt – kasta datorn i sjön. (Vi rekommenderar dock metod 1 eller 2, för juridikens skull.)</p>
            
            <p><strong>🔐 SÄKERHET – VI LÅSER HÅRDARE ÄN FORT KNOX</strong><br/>
            Vi krypterar allt.<br/>
            Vi har lösenord, brandväggar och något som heter "sunt förnuft" (vår mest bristfälliga säkerhetsfunktion).<br/>
            ➡️ <em>Artikel 32</em> – vi tar dataskydd på allvar, även om vi skämtar om det.</p>
            <p>När något ska raderas, raderas det.<br/>
            Inga skuggkopior. Inga hemliga servrar i öknen. Bara gone.</p>
            
            <p><strong>🌍 TREDJE PARTER – VÅRA (LITE SKUMMA) SAMARBETEN</strong><br/>
            Vi samarbetar ibland med tredje parter för analys och annonser.<br/>
            De får bara det de behöver, under tystnadsplikt, med GDPR-muskler (Artikel 28).<br/>
            Ingen data går till länder utan skydd (Artikel 46) – vi skickar inte dina uppgifter på semester till USA utan pass.</p>
            
            <p><strong>🚨 OM DET GÅR ÅT HELVETE (DATAINTRÅNG)</strong><br/>
            Om något går snett – typ att någon hackar oss, eller en hamster springer in i serverrummet –<br/>
            då följer vi Artikel 33 & 34:</p>
            <ul>
              <li>Vi anmäler till myndigheten inom 72 timmar.</li>
              <li>Vi berättar för dig vad som hände.</li>
              <li>Vi försöker att inte få panik (det går sådär).</li>
            </ul>
            
            <p><strong>📚 DOKUMENTATION OCH UPPDATERINGAR</strong><br/>
            Vi loggar när du ger samtycke (Artikel 30),<br/>
            uppdaterar policyn så fort någon i EU ändrar ett komma (Artikel 24),<br/>
            och testar allt på alla webbläsare – ja, även den där du vägrar uppdatera.</p>
            
            <p><strong>🧑‍� KONTAKT</strong><br/>
            Har du frågor, klagomål eller bara ett existentiellt sammanbrott över internet?<br/>
            Släng iväg ett mejl. Vi svarar snabbare än du kan säga "dataskyddsombud".</p>
            <p><strong>📧 E-post:</strong> privacy@yapspace.com</p>
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
          {!showPolicy && (
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
          )}
        </AnimatePresence>
        <PrivacyPolicyModal open={showPolicy} onClose={() => setShowPolicy(false)} />
      </>
    );
};

export default CookieConsentBanner;





