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

// app();

export const handleGoogleSignIn = () => {
   const provider = new GoogleAuthProvider();
   const auth = getAuth();
   return signInWithPopup(auth, provider)
      .then(result => {
         const { displayName, photoURL, email } = result.user;
         const signedInUser = {
            //...user,
            isSignedIn: true,
            name: displayName,
            email,
            photoURL,
            error: '',
            success: true,
         };
         return signedInUser;
      })
      .catch(error => {
         console.log(error.message);
      });
};

export const handleFbSignIn = () => {
   const provider = new FacebookAuthProvider();
   const auth = getAuth();
   return signInWithPopup(auth, provider)
      .then(result => {
         const user = result.user;
         user.success = true;
         return user;
      })
      .catch(error => console.log(error.message));
};

export const handleSignOut = () => {
   const auth = getAuth();
   return signOut(auth)
      .then(() => {
         const signedOutUser = {
            inSignedIn: false,
            name: '',
            email: '',
            password: '',
            photoURL: '',
            error: '',
            success: false,
         };
         return signedOutUser;
      })
      .catch(error => error.message);
};

export const createWithEmailAndPassword = (email, password, name) => {
   const auth = getAuth();
   return createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
         const newUserInfo = res.user;
         newUserInfo.error = '';
         newUserInfo.success = true;
         // setUser({ ...user, error: '', success: true });
         updateUserName(name);
         return newUserInfo;
      })
      .catch(error => {
         const newUserInfo = {};
         newUserInfo.error = error.message;
         return newUserInfo;
         // setUser(newUserInfo);
         // setUser({ ...user, error: error.message, success: false });
      });
};

export const signInUserWithEmailAndPassword = (email, password) => {
   const auth = getAuth();
   return signInWithEmailAndPassword(auth, email, password)
      .then(res => {
         const newUserInfo = res.user;
         newUserInfo.error = '';
         newUserInfo.success = true;
         return newUserInfo;
         // setUser({ ...user, error: '', success: true });
         // setLoggedInUser({ ...user, error: '', success: true });
         // history.replace(from);
      })
      .catch(error => {
         // setUser({ ...user, error: error.message, success: false });
         // setLoggedInUser({
         //    ...user,
         //    error: error.message,
         //    success: false,
         // });
         const newUserInfo = {};
         newUserInfo.error = error.message;
         return newUserInfo;
      });
};

export const updateUserName = name => {
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
