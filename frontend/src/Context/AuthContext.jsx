import {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();
export const useAuth=()=> useContext(AuthContext);
export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null);



    //kolla om användare sparad i localstorage
    useEffect(()=>{
        const storeuser=localStorage.getItem('user');
        if(storeuser){
            setUser(JSON.parse(storeuser));
        }
    },[]);


    // Mockad login funktion

    const login =(email,password)=>{
        console.log("Login försök med:",{email,password});

        //fake login som ska hämtas senare från backend
        //
        if(email==="test@test.com"&& password==="123456"){
            const fakeUser={name:"Test User",email:"test@test.com"};
            setUser(fakeUser);
            localStorage.setItem('user',JSON.stringify(fakeUser));
            return true; 
        }
        return false;
    }

    const logout=()=>{
        setUser(null);
        localStorage.removeItem('user');
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );

}