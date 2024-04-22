import {  useEffect, useState } from "react";
import { Container, Typography, Button, Box, Dialog } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import {useNavigate } from "react-router-dom";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/dashboard",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => true,
  },
};

const Index = () => {
  const UI = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
  const [login, setLogin] = useState(false);
  let {authUser} = useAuth()
  let navigate = useNavigate()
  useEffect(()=>{
    if(authUser){
      navigate('/dashboard')
    };
  },[])
  const onAuthenticate = () => {
    setLogin(true);
    setTimeout(() => {
      UI.start("#firebaseui-auth-container", uiConfig);
    });
  };
  return (
    <Container>
      <Box padding="5rem">
        <Typography variant="h3">Welcome to Expense Tracker!</Typography>
        <Typography mt={1} mb={1} variant="subtitle2">
          Add, view, edit and delete expenses
        </Typography>
        <Button onClick={onAuthenticate} variant="contained">
          LOGIN / REGISTER
        </Button>
        <Dialog open={login} onClose={() => setLogin(false)}>
          <div id="firebaseui-auth-container" />
        </Dialog>
      </Box>
    </Container>
  );
};

export default Index;
