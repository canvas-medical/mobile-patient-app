## Installation 
# Development Setup Guide for Mobile Patient Application

This guide will walk you through the process of setting up the Mobile Patient Applicatio on your local machine for development purposes.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js ^18.16.0](https://nodejs.org/en/download)
- [Expo Account](https://expo.dev/signup)
- [Apple Developer Account](https://expo.dev/signup](https://developer.apple.com/programs/enroll/)) (for iOS)
- [Google Play Account](https://developer.android.com/distribute/console) (for Android)
- [New Firebase Project](https://alphatech.technology/Blog-Entry-srk/Google-Services-Json-bek/) (for Android)
- [Android Studio](https://developer.android.com/studio/install) or [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) (for running the app on a simulator)

*Optional*

- [Deployed Stripe Microservice](https://github.com/brewerdigital-llc/stripe-microservice) for payment processing
- [BugSnag Account](https://app.bugsnag.com/user/new/) for error reporting

## Clone the Repository

First, clone the VivoCare Health repository to your local machine:

```bash
git clone https://github.com/canvas-medical/mobile-patient-health.git
cd mobile-patient-health
```

## Install Dependencies

Next, install the project dependencies:

```bash
npm install
```

## Setup Environment Variables

The application requires several environment variables to function correctly. These are stored in a `.env.local` file at the root of the project. 

Run `cp .env.sample .env.local`, open up `.env.local` in your code editor, and fill in the values for the environment variables

Here's how you can obtain the keys required in the `.env.local` file. 

- `EXPO_PUBLIC_AUTH_GRANT_TYPE`: This is typically set to `client_credentials` for OAuth 2.0 client credentials grant type.

- `EXPO_PUBLIC_CLIENT_ID` and `EXPO_PUBLIC_CLIENT_SECRET`: These are the client ID and secret for your application. You can obtain these from Canvas Medica when you register your application.

- `EXPO_PUBLIC_API_URL`: This is the base URL for the API you are connecting to. In this case, it's the Canvas Medical API.

- `EXPO_PUBLIC_PRACTITIONER_ID` and `EXPO_PUBLIC_CLINIC_ID`: These are specific to your application and can be obtained from your Canvas Dashboard.

- `GOOGLE_SERVICES_JSON`: This is a JSON file that contains your project configuration for Google services. You can generate this file from the Firebase Console when you create a project.

#### Optional
If these keys are not included, the associated features will not work but the app will still function

*Bill Pay*

- `EXPO_PUBLIC_STRIPE_API_URL`, `EXPO_PUBLIC_STRIPE_API_KEY`: These are from the Stripe Microservice.  You will create these as part of [deploying the Stripe Microservice](https://github.com/brewerdigital-llc/stripe-microservice)

- `EXPO_PUBLIC_STRIPE_PUBLIC_KEY`: This is specific to the Stripe platform. When you create an account and register an application with Stripe, you will be provided with a public key.

*Error Monitoring*

- `EXPO_PUBLIC_BUGSNAG_API_KEY` and `BUGSNAG_API_KEY`: These are specific to the Bugsnag platform. When you create an account and register an application with Bugsnag, you will be provided with these credentials.

## Setup Demo Patients

To allow users to log in as demo patients you'll need to:

1. [Create demo patients](https://www.loom.com/share/d8238cf4bdac4b0691f493045ff15f28?sid=f2a35c29-ec8f-43dc-9fcb-c101bfb5d63b) through Canvas
2. Add their IDs and names to the `demoPatients` object in [`app/index.tsx`](https://github.com/brewerdigital-llc/VivoCare/blob/main/app/initial.tsx#L69). 


## Set up Expo

After creating an account, run

```
npm install -g eas-cli
eas login
eas build:configure
```

## Build the Application

Before you can run the application, you need to build it. This can be done using the Expo CLI:

```bash
eas build --profile development
```

This will prompt you to select a platform. Choose whichever platform you would like to run the application on, and follow the prompts to set up the initial build. 

## Run the Application

After building the application, you can run it:

```bash
npx expo start --dev-client
```

Press `a` to open the app in an Android simulator, or press `i` to open the app in an iOS simulator.

Congratulations, you have successfully set up the VivoCare Health application on your local machine for development!


