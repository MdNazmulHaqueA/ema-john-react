import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App.js';
import { useHistory, useLocation } from 'react-router';
// import app from './firebase.config.js';
import {
   createWithEmailAndPassword,
   handleFbSignIn,
   handleGoogleSignIn,
   handleSignOut,
   signInUserWithEmailAndPassword,
} from './loginManager.js';

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

   //states
   const [user, setUser] = useState(initialState);
   const [newUser, setNewUser] = useState(false);

   //For redirecting after logged in
   let history = useHistory();
   let location = useLocation();
   let { from } = location.state || { from: { pathname: '/' } };

   const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      redirect && history.replace(from);
   };

   const googleSignIn = () => {
      handleGoogleSignIn().then(res => {
         handleResponse(res, true);
      });
   };

   const fbSignIn = () => {
      handleFbSignIn().then(res => {
         handleResponse(res, true);
      });
   };

   const signOut = () => {
      handleSignOut().then(res => {
         handleResponse(res, false);
         alert('sign out successful!');
      });
   };

   //validation email and password
   const handleBlur = e => {
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

   const handleSubmit = e => {
      e.preventDefault();
      const { email, password, name } = user;
      if (newUser && email && password) {
         //create user with email and password
         createWithEmailAndPassword(email, password, name).then(res => {
            handleResponse(res, true);
         });
      }
      if (!newUser && email && password) {
         //sign in with email and password
         signInUserWithEmailAndPassword(email, password).then(res => {
            handleResponse(res, true);
         });
      }
   };

   return (
      <div style={{ textAlign: 'center' }}>
         {user.isSignedIn ? (
            <div>
               <p>Welcome, {user.name}</p>
               <button onClick={signOut}>Sign out</button>
            </div>
         ) : (
            <button onClick={googleSignIn}>Sign in</button>
         )}
         <br />
         <button onClick={fbSignIn}>Sign-in using Facebook</button>
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
