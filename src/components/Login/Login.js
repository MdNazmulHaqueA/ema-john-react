import React, { useContext } from 'react';
import app from './firebase.config.js';

import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   FacebookAuthProvider,
   signOut,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { UserContext } from '../../App.js';
import { useHistory, useLocation } from 'react-router';

function Login() {
   const initialState = {
      inSignedIn: false,
      name: '',
      email: '',
      password: '',
      photoURL: '',
      error: '',
      success: false,
   };

   //context api
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   //For redirecting after logged in
   let history = useHistory();
   let location = useLocation();
   let { from } = location.state || { from: { pathname: '/' } };

   const [user, setUser] = useState(initialState);
   const [newUser, setNewUser] = useState(false);
   const handleSignIn = () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
         .then(result => {
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
               ...user,
               isSignedIn: true,
               name: displayName,
               email,
               photoURL,
            };
            setUser(signedInUser);
         })
         .catch(error => {
            console.log(error.message);
         });
   };

   const handleFbSignIn = () => {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
         .then(result => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
         })
         .catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
         });
   };

   const handleSignOut = () => {
      const auth = getAuth();
      signOut(auth)
         .then(() => {
            setUser(initialState);
            alert('sign out successful!');
         })
         .catch(error => error.message);
   };

   const handleSubmit = e => {
      e.preventDefault();
      const { email, password } = user;
      if (newUser && email && password) {
         const auth = getAuth();
         createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
               setUser({ ...user, error: '', success: true });
               updateUserName(user.name);
            })
            .catch(error => {
               // const newUserInfo = { ...user };
               // newUserInfo.error = error.message;
               // setUser(newUserInfo);
               setUser({ ...user, error: error.message, success: false });
            });
      }
      if (!newUser && email && password) {
         //sign in
         const auth = getAuth();
         signInWithEmailAndPassword(auth, email, password)
            .then(() => {
               setUser({ ...user, error: '', success: true });
               setLoggedInUser({ ...user, error: '', success: true });
               history.replace(from);
            })
            .catch(error => {
               setUser({ ...user, error: error.message, success: false });
               setLoggedInUser({
                  ...user,
                  error: error.message,
                  success: false,
               });
            });
      }
   };
   const handleBlur = e => {
      // console.log(e.target.name);
      // console.log(e.target.name);
      let isFieldValid;
      if (e.target.name === 'email') {
         isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if (e.target.name === 'password') {
         //length > 6 and contains 1 number at least
         isFieldValid =
            e.target.value.length > 6 && /\d{1}/.test(e.target.value);
      }
      if (isFieldValid) {
         const newUserInfo = { ...user };
         newUserInfo[e.target.name] = e.target.value;
         setUser(newUserInfo);
      }
   };

   const updateUserName = name => {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
         displayName: name,
      })
         .then(() => {
            console.log('Username updated successfully');
         })
         .catch(error => {
            console.log(error.message);
         });
   };

   return (
      <div style={{ textAlign: 'center' }}>
         {user.isSignedIn ? (
            <div>
               <p>Welcome, {user.name}</p>
               <button onClick={handleSignOut}>Sign out</button>
            </div>
         ) : (
            <button onClick={handleSignIn}>Sign in</button>
         )}
         <br />
         <button onClick={handleFbSignIn}>Sign-in using Facebook</button>
         <h1>Our Own Authentication</h1>
         <input type="checkbox" onChange={() => setNewUser(!newUser)} />
         <label htmlFor="newUser">New User Sign-up</label>
         <form onSubmit={handleSubmit}>
            {newUser && (
               <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  onBlur={handleBlur}
               />
            )}
            <br />
            <input
               type="text"
               name="email"
               placeholder="Your Email"
               required
               // onChange={handleChange}
               onBlur={handleBlur}
            />
            <br />
            <input
               type="password"
               name="password"
               placeholder="Password"
               required
               onBlur={handleBlur}
            />
            <br />
            <input type="submit" value={newUser ? 'Sign-up' : 'Sign-in'} />
         </form>
         <p style={{ color: 'red' }}>{user.error}</p>

         {user.success && (
            <p style={{ color: 'green' }}>
               User {newUser ? 'Created' : 'logged-in'} Successful!
            </p>
         )}
      </div>
   );
}

export default Login;
