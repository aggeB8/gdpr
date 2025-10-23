import React, { createContext, useState, useEffect,useContext } from 'react';

import{
    getStoredConsent,
    saveConsent,
    clearConsent,
    DEFAULT_CONSENT,
    validateConsentData
} from '../utils/coockieUtils.js';
import { set } from 'date-fns';
import { COOKIE_CATEGORIES } from '../utils/coockieUtils.js';

const CookieConsentContext=createContext(null);
export const useCookieConsent=()=>{
    const context=useContext(CookieConsentContext);
    if(!context){
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
};

export const CookieConsentProvider=({children})=>{
    const [consent,setConsent]=useState(null);
    const [hasChosenConsent,setHasChosenConsent]=useState(false);
    const [showBanner,setShowBanner]=useState(false);
    const [showSettings,setShowSettings]=useState(false);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{
        const loadStoredConsent=async()=>{
            try{
                setIsLoading(true);
                const storedConsent=getStoredConsent();// hämtar från localstorage
                if(storedConsent){
                    const validation=validateConsentData(storedConsent);
                    if(validation.isValid){
                        setConsent(storedConsent);
                        setHasChosenConsent(true);
                        setShowBanner(false);// döljer bannern om giltig consent finns
                    } else{
                       await clearConsent();
                       setConsent(DEFAULT_CONSENT);
                       setHasChosenConsent(false);
                       setShowBanner(true);
                    }
                } else{
                    setConsent(DEFAULT_CONSENT);
                    setHasChosenConsent(false);
                    setShowBanner(true);
                }
            }catch(error){
                console.error('Error loading stored consent:',error);
                setConsent(DEFAULT_CONSENT);
                setHasChosenConsent(false);
                setShowBanner(true);
            }finally{
                setIsLoading(false);
            }
        };

        loadStoredConsent();
    },[]);

    const updateConsent=async(newConsent,userInitiated=true)=>{
        try{
            const consentWithNecessary={
                ...newConsent,
                [COOKIE_CATEGORIES.NECESSARY]:true,
            };
            const validation=validateConsentData(consentWithNecessary);
            if(!validation.isValid){
                throw new Error('Invalid consent data: '+validation.errors.join(', ')   );
            }

            const savedConsent=await saveConsent(consentWithNecessary);
            setConsent(savedConsent);
            if(userInitiated){
                setHasChosenConsent(true);
                setShowBanner(false);
                setShowSettings(false);
            }

            return savedConsent;
        }catch(error){
            console.error('Error updating consent:',error);
            throw error;
        }
    };
           
    const acceptAllCookies=async()=>{
        const allAccepted={
            [COOKIE_CATEGORIES.NECESSARY]:true,
            [COOKIE_CATEGORIES.ANALYTICS]:true,
            [COOKIE_CATEGORIES.MARKETING]:true,
            [COOKIE_CATEGORIES.PERSONALIZATION]:true,
        };
        return await updateConsent(allAccepted,true);
    };
    const rejectAllCookies=async()=>{
        const onlyNecessary={
            [COOKIE_CATEGORIES.NECESSARY]:true,
            [COOKIE_CATEGORIES.ANALYTICS]:false,
            [COOKIE_CATEGORIES.MARKETING]:false,
            [COOKIE_CATEGORIES.PERSONALIZATION]:false,
        };
        return await updateConsent(onlyNecessary,true);
    };
     const resetConsent=async()=>{
        try{
            await clearConsent();
            setConsent(DEFAULT_CONSENT);
            setHasChosenConsent(false);
            setShowBanner(true);
            setShowSettings(false);
        } catch(error){
            console.error('Error resetting consent:',error);
            throw error;
        }
        };

        const openSettings=()=>{
            setShowSettings(true);
            setShowBanner(false);
        };
        const closeSettings=()=>{
            setShowSettings(false);
            if(!hasChosenConsent){
                setShowBanner(true);
            }
        };
            const hasConsentFor=(category)=>{
                if(!consent) return category===COOKIE_CATEGORIES.NECESSARY;
                return consent[category]===true;
            };

            const needsConsentRenewal=()=>{
                if(!consent||!consent.timestamp) return true;
                const consentAge=Date.now()-new Date(consent.timestamp).getTime();
                const maxAge=365*24*60*60*1000;//  1år
                return consentAge>maxAge;
            };

            const value={
                consent,
                hasChosenConsent,
                isLoading,
                showBanner,
                showSettings,


                updateConsent,
                acceptAllCookies,
                rejectAllCookies,
                resetConsent,
                openSettings,
                closeSettings,

                hasConsentFor,
                needsConsentRenewal,

                COOKIE_CATEGORIES,
            };

            return(
                <CookieConsentContext.Provider value={value}>
                    {children}
                </CookieConsentContext.Provider>
            );
    };

    export default CookieConsentContext;

