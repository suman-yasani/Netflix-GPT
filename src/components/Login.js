import { useRef, useState } from "react";
import { BACKGROUND } from "../utils/constants";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
import lang from "../utils/languageConstants";


const Login = () => {
  const langKey = useSelector((store) => store.config.lang);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: USER_AVATAR
        }).then(() => {
          // Profile updated!
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        }).catch((error) => {
          // An error occurred
          setErrorMessage(error.message);
        });  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header/>
      <div className="absolute">
        <img className="object-cover" src={BACKGROUND} alt="background"/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 absolute px-10 py-8 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-2xl py-4">{isSignInForm ? lang[langKey].signin : lang[langKey].signup}</h1>
        {!isSignInForm && (<input ref={name} className="p-3 my-3 w-full bg-gray-700" type="text" placeholder={lang[langKey].fullNamePlaceholder}/>)}
        <input ref={email} className="p-3 my-3 w-full bg-gray-700" type="text" placeholder={lang[langKey].emailAddressPlaceholder}/>
        <input ref={password} className="p-3 my-3 w-full bg-gray-700" type="password" placeholder={lang[langKey].passwordPlaceholder}/>
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? lang[langKey].signin : lang[langKey].signup}</button>
        <p className="px-1 py-2 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? lang[langKey].signinMessage : lang[langKey].signupMessage}</p>
      </form>
    </div>
  );
};

export default Login;