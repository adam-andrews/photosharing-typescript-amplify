import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import {
	AmplifyAuthenticator,
	AmplifySignUp,
	AmplifySignIn,
	AmplifySignOut,
	AmplifyForgotPassword,
} from '@aws-amplify/ui-react';

import { AmplifyS3ImagePicker } from '@aws-amplify/ui-react';


import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
	const [authState, setAuthState] = useState<AuthState>();
	const [user, setUser] = useState<any | undefined>();

	useEffect(() => {
		return onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUser(authData);
		});
	}, []);

	return authState === AuthState.SignedIn && user ?
    (
      <div className="container">
        <h2>Amplify UI</h2>
        <h3>Gooday, {user ? user.username :
        'mate'}</h3>
        <p><AmplifySignOut /></p>
      </div>
    ) : (<div className="container">
        <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignIn 
            slot="sign-in"
            headerText="Please login"
            usernameAlias="email"
            submitButtonText="Log in"
            formFields={[
              {
                type: "email",
                label: "Please enter your email address",
                placeholder: "you@domain.com",
                required: true,
              },
              {
                type: "password",
                label: "Please enter your password",
                placeholder: "********",
                required: true,
              }
            ]} 
          />
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            headerText="Please sign up here:"
            haveAccountText="Already have an account?"
            submitButtonText="Sign up"
            formFields={[
              {
                type: "email",
                label: "Please enter your email",
                placeholder: "you@domain.com",
                required: true,
              },
              {
                type: "password",
                label: "Plase use a strong password",
                placeholder: "********",
                required: true,
              },
              {
                type: "phone_number",
                label: "Plase enter your phone number",
                placeholder: "123-123-1234",
                required: false,
              },
            ]} 
          />
          <AmplifyForgotPassword
            slot="forgot-password"
            usernameAlias="email"
            headerText="Forgot Password" />
      </AmplifyAuthenticator>
      </div>
        
    );
  }
  
  



export default App;
