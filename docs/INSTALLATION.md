## Installation 
# Development Setup Guide for VivoCare Health Application

This guide will walk you through the process of setting up the VivoCare Health application on your local machine for development purposes.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm
- Expo CLI
- Git

## Clone the Repository

First, clone the VivoCare Health repository to your local machine:

```bash
git clone https://github.com/brewerdigital-llc/FHIR-Dashboard.git
cd FHIR-Dashboard
```

## Install Dependencies

Next, install the project dependencies:

```bash
npm install
```

## Setup Environment Variables
The application requires several environment variables to function correctly. These are stored in a `.env.local` file at the root of the project. 

Copy the `env.sample` file to `.env.local` and fill in the values for the environment variables.

Here's how you can obtain the keys required in the `.env.local` file. 

- `EXPO_PUBLIC_AUTH_GRANT_TYPE`: This is typically set to `client_credentials` for OAuth 2.0 client credentials grant type.

- `EXPO_PUBLIC_CLIENT_ID` and `EXPO_PUBLIC_CLIENT_SECRET`: These are the client ID and secret for your application. You can obtain these from the platform you are integrating with (Canvas Medical). When you register your application, you will be provided with these credentials.

- `EXPO_PUBLIC_API_URL`: This is the base URL for the API you are connecting to. In this case, it's the Canvas Medical API.

- `EXPO_PUBLIC_PRACTITIONER_ID` and `EXPO_PUBLIC_CLINIC_ID`: These are specific to your application and can be obtained from your Canvas Dashboard.

- `EXPO_PUBLIC_OPENAI_API_URL` and `EXPO_PUBLIC_OPENAI_API_KEY`: These will be provided to you through the AWS API Gateway setup outlined in the [OpenAI Microservice documentation](https://github.com/brewerdigital-llc/fhir-ai-ms)

- `EXPO_PUBLIC_DD_CLIENT_TOKEN` and `EXPO_PUBLIC_DD_APPLICATION_ID`: These are specific to the Datadog platform. When you create an account and register an application with Datadog, you will be provided with these credentials.

- `EXPO_PUBLIC_STRIPE_API_URL`, `EXPO_PUBLIC_STRIPE_API_KEY`: These are from the Stripe Microservice.  You will create these as part of [deploying the Stripe Microservice](https://github.com/brewerdigital-llc/stripe-microservice)

- `EXPO_PUBLIC_STRIPE_PUBLIC_KEY`: This is specific to the Stripe platform. When you create an account and register an application with Stripe, you will be provided with a public key.

- `EXPO_PUBLIC_BUGSNAG_API_KEY` and `BUGSNAG_API_KEY`: These are specific to the Bugsnag platform. When you create an account and register an application with Bugsnag, you will be provided with these credentials.

- `GOOGLE_SERVICES_JSON`: This is a JSON file that contains your project configuration for Google services. You can generate this file from the Google Cloud Console when you create a project.
The application requires several environment variables to function correctly. These are stored in a `.env.local` file at the root of the project. 
Replace `your_client_id`, `your_client_secret`, `your_api_url`, `your_practitioner_id`, `your_clinic_id`, `your_openai_api_url`, `your_openai_api_key`, `your_dd_client_token`, `your_dd_application_id`, `your_stripe_api_url`, `your_stripe_api_key`, `your_stripe_public_key`, `your_bugsnag_api_key`, and `your_bugsnag_api_key` with your actual keys and credentials.

## Build the Application

Before you can run the application, you need to build it. This can be done using the Expo CLI:

```bash
eas build --profile development
```

This will create a development build of your application.

## Run the Application

After building the application, you can run it:

```bash
npx expo start --dev-client
```

Press `a` to open the app in an Android simulator, or press `i` to open the app in an iOS simulator.

Congratulations, you have successfully set up the VivoCare Health application on your local machine for development!


