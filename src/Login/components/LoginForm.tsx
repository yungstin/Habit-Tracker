import { useContext, useState } from "react"
import "./LoginForm.css"
import { UserContext } from "../../App";
import React, { useRef } from 'react';

import firebase from "firebase/compat/app";
// Required for side-effects
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWWqVfktZnAW3fze74sODCxmvIMVdkw5Y",
    authDomain: "habit-tracker-92d90.firebaseapp.com",
    projectId: "habit-tracker-92d90",
    storageBucket: "habit-tracker-92d90.appspot.com",
    messagingSenderId: "793800474652",
    appId: "1:793800474652:web:b92787bce57fe7860b9fd9",
    measurementId: "G-FB176MYZR7",
    databaseURL: "https://DATABASE_NAME.firebaseio.com"
  };



export const LoginForm = () => {
    //initialize all data to a value
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const email = useRef(null);
    const password = useRef(null);
    const confirm = useRef(null);


    const {signedIn, setSignedIn} = useContext(UserContext)
    const [isLoggedin, setLogin] = useState(false);

    function loginUser() {
        setSignedIn(true)
        if (isLoggedin){
            alert("in handler"+ email.current.value + password.current.value)
            //alert('A name was submitted: ' + email.current.value + password.current.value + confirm.current.value);
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                alert("signed in")
                // ...
            })
            .catch((error) => {
                alert(email.current.value + password.current.value)
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + errorMessage);
            });
        }else{

            if (password.current.value != confirm.current.value){
                alert 
            }
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + errorMessage);
                // ..
            });
        }
    }
    
    function toggleLogin() {
        if (isLoggedin) {
            setLogin(false)
        } else {
            setLogin(true)
        }
    }

    return (
        <div>
            {isLoggedin ?

            <form>
                <p>
                    <input className="loginForm__form" type="text" placeholder="Email" name="email" ref={email} required/>
                </p>
                <p>
                    <input className="loginForm__form" type="password" placeholder="Password" name="password" ref={password} required/>
                </p>
                <p>
                    <button onClick={loginUser}>Login</button>
                </p>
                
                <p>Need an account? <span className="loginForm__blue" onClick={toggleLogin}>Register</span></p>
            </form>

            :

            <form>
                <p>
                    <input className="loginForm__form" type="text" placeholder="Email" name="email" ref={email} required/>
                </p>
                <p>
                    <input className="loginForm__form" type="password" placeholder="Password" name="password" ref={password} required/>
                </p>
                <p>
                    <input className="loginForm__form" type="password" placeholder="Confirm Password" name="confirm-password" ref={confirm} required/>
                </p>    
                <p>
                    <button onClick={loginUser}>Register</button>
                </p>

                <p>Have an account? <span className="loginForm__blue" onClick={toggleLogin}>Login</span></p>
            </form>

            }
        </div>
    )
}