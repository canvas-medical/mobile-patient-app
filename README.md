# VivoCare Health

![Static Badge](https://img.shields.io/badge/license-apache-red)
![Static Badge](https://img.shields.io/github/v/release/brewerdigital-llc/FHIR-Dashboard)

![iphone-screenshots](https://github.com/canvas-medical/mobile-patient-app/blob/main/assets/readme/vivocare-iphone-rendering.png)

## Overview

VivoCare Health is a mobile application developed using Expo. The application provides a user-friendly interface for managing your medical information and appointments, making it a valuable tool for both healthcare providers and patients.  The application allows users to:  

- Register and create a profile
- Send messages to healthcare providers
- Schedule appointments
- Receive appointment reminders via push notifications
- Navigate to in-person appointments via their device's native maps app
- Access telehealth appointments via a video call
- View and pay bills
- Access a dashboard with health data

By streamlining the process of managing health information, VivoCare Health enhances the efficiency and accessibility of healthcare services.

## Requirements

- [Node.js ^18.16.0](https://nodejs.org/en/download)
- [Android Studio](https://developer.android.com/studio/install) or [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) (for running the app on a simulator or real device)
- [Deployed Stripe Microservice](https://github.com/brewerdigital-llc/stripe-microservice) for payment processing
- [BugSnag Account](https://app.bugsnag.com/user/new/) for error reporting
- [Firebase](https://docs.expo.dev/push-notifications/push-notifications-setup/#get-credentials-for-development-builds) for Android push notifications

## Related source repositories

This repository is part of the _VivoCare_ Health FHIR app project by Brewer Digital.  The other repositories are:

- [FHIR Stripe microservice](https://github.com/brewerdigital-llc/stripe-microservice) - The microservice that handles Stripe payment processing for _VivoCare_.

## Installation

Please refer to the [Installation Guide](./docs/INSTALLATION.md) for detailed instructions on how to set up the project on your local machine.

## Usage

After you have completed all the steps in the [Installation Guide](./docs/INSTALLATION.md), you can run the following command to run the application.

```bash
npx expo start --dev-client
```

## Learning Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## HIPAA Compliance

- **Stripe**: While Stripe is a secure platform for handling payments, it is not HIPAA compliant. Therefore, you should ensure that no Protected Health Information (PHI) is stored or processed through Stripe. All sensitive health information should be handled separately in a HIPAA-compliant manner.

- **BugSnag**: BugSnag provides error reporting and monitoring for your application. To ensure HIPAA compliance when using BugSnag, you should follow their specific guidelines and best practices. These can be found in the [BugSnag Documentation](https://docs.bugsnag.com/on-premise/single-machine/).

- **AWS**: Amazon Web Services (AWS) offers a wide range of services that are eligible for use with PHI under the AWS Business Associate Addendum (BAA). Ensure that you are using only the HIPAA-eligible services for any PHI, and that you have a signed BAA with AWS. Also, ensure that you are following all necessary security best practices, such as encrypting data at rest and in transit.

## About Brewer Digital

<a href="https://brewerdigital.com/">
  <img align="left" width="33%" src="https://github.com/canvas-medical/mobile-patient-app/blob/main/assets/readme/brewer-digital-logo.jpg"/>
</a>

With over four decades of collective industry experience, our team specializes in software development for healthcare startups. Having worked with over 50 different companies, we provide the experience to bring your ideas to life.
