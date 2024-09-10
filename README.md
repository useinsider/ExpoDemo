# Insider React-Native Demo

<p align="center">
  <img src="assets/images/insider-logo-read-me.jpg">
  
  <table align="center">
    <tr>
      <td><a href="https://useinsider.com/"> Insider </a></td>
      <td><a href="https://www.npmjs.com/package/react-native-insider/"> NPM JS react-native-insider </a></td>
      <td><a href="https://academy.useinsider.com/docs/react-native-integration"> InsiderAcademy </a></td>
    </tr>
  </table>
</p>  

## Description

This Demo contains simple methods that you can use with the Insider SDK.

## Preview

<table align="center">
  <tbody>
    <tr>
      <td><img src="assets/images/android-preview.gif" width="250"></td>
    </tr>
  </tbody>
</table>


## Installation

Install all npm packages by running the `npm install` command in the home directory.

Replace partner name and app group value in `app/_layout.tsx` with your info.

Note: Can easily find the warnings added as comments by searching the `FIXME-INSIDER` key in the project and you can quickly make the necessary arrangements for the project.

## IMPORTANT

* The expo prebuild command was executed, generating the necessary native project files (android and ios directories) for both Android and iOS platforms.
* Due to the inconsistent behavior of the iOS push token swizzling method, the `[Insider registerDeviceTokenWithApplication:application deviceToken:deviceToken];` method has been used within the `didRegisterForRemoteNotificationsWithDeviceToken` method in the AppDelegate.mm file.
* The Insider SDK includes swizzle methods for iOS push delegate methods. To ensure these methods function correctly, you must add the command `UNUserNotificationCenter.currentNotificationCenter.delegate = self;` to the AppDelegate.mm file.

### Android

1. Add `google-services.json` and `agconnect-services.json` to `android/app` folder.
2. Add your keystore file to `android/app` folder and replace `signingConfigs` attributes in `android/app/build.gradle` file with your info.
3. Replace manifestPlaceholders -> partner value with your partner name in `android/app/build.gradle` file. (This step is important to add test device with QR or Email in the panel.)
4. And run project with `npm run android` command.

### iOS

1. Open XCode and check the app group and bundle identifier for all targets.
2. Replace `insider` URL type in main target Info -> URL Types with your partner name. (This step is important to add test device with QR or Email in the panel.)
3. Change APP_GROUP variables value in `InsiderNotificationService/NotificationService.m` and `InsiderNotificationContent/NotificationViewController.m` files.
4. And run project with `npm run ios` command.
