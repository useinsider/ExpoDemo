/**
 * INSIDER - Sample React Native App
 * https://useinsider.com/
 *
 * @format
 */

import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

import Header from "../../components/Header";
import CustomSection from "../../components/CustomSection";

import UserAttribute from "../insider/UserAttribute";
import UserIdentifier from "../insider/UserIdentifier";
import Event from "../insider/Event";
import Product from "../insider/Product";
import Purchase from "../insider/Purchase";
import SmartRecommender from "../insider/SmartRecommender";
import SocialProof from "../insider/SocialProof";
import PageVisit from "../insider/PageVisit";
import GDPR from "../insider/GDPR";
import MessageCenter from "../insider/MessageCenter";
import ContentOptimizer from "../insider/ContentOptimizer";

import messaging from "@react-native-firebase/messaging";

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log(
        "[FCM][requestUserPermission]: Authorization status:",
        authStatus
    );
  }

  getToken();
}

const getToken = async () => {
  const newToken = await messaging().getToken();

  if (newToken) {
    console.log("[FCM][getToken]: Token:", newToken);
  } else {
    return newToken;
  }
};

async function requestLocationPermission() {
  try {
    if (Platform.OS != "android") return;

    const fineLocationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Application Camera Permission",
        message: "The application requires access to the camera.",
        buttonNeutral: "Ask Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
      const bgLocationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: "Background Location Permission for App",
          message:
            "The app requires background location permission to provide you better service using your location in the background.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Deny",
          buttonPositive: "Allow",
        }
      );

      if (bgLocationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permissions successfully granted");
      } else {
        console.log("Background location permission not granted");
      }
    } else {
      console.log("Location permission not granted");
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function main() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  requestUserPermission();
  requestLocationPermission();

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <CustomSection title="User Attributes">
            <UserAttribute />
          </CustomSection>

          <CustomSection title="User Identifiers">
            <UserIdentifier />
          </CustomSection>

          <CustomSection title="Event">
            <Event />
          </CustomSection>

          <CustomSection title="Product">
            <Product />
          </CustomSection>

          <CustomSection title="Purchase">
            <Purchase />
          </CustomSection>

          <CustomSection title="Smart Recommender">
            <SmartRecommender />
          </CustomSection>

          <CustomSection title="Social Proof">
            <SocialProof />
          </CustomSection>

          <CustomSection title="Page Visit Methods">
            <PageVisit />
          </CustomSection>

          <CustomSection title="GDPR">
            <GDPR />
          </CustomSection>

          <CustomSection title="Message Center">
            <MessageCenter />
          </CustomSection>

          <CustomSection title="Content Optimizer">
            <ContentOptimizer />
          </CustomSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}