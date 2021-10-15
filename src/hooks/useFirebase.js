import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut  } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase =() =>{
    const [user, setUser] = useState({});

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            console.log(result.user)
        })
    }

    const logOut = () => {
        signOut(auth)
        .then( ()=>{
            setUser({});
        })
    }

    /* ------currently signed in users----- */
    /* ---etake observer o bole...firebase observe kore user der k aitar maddhome--state change hoise naki hoy nai seta observe kore---eta Firebase er "Manage user" theke neoa hoise */
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
            } 
          });
    }, [])
    /* ---onek gula object return kortese-- */
    return{
        user,
        signInUsingGoogle,
        logOut
    }
}

export default useFirebase;