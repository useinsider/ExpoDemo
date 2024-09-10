import 'expo-router/entry'; // !! IMPORTANT !!
import messaging from "@react-native-firebase/messaging";
import RNInsider from "react-native-insider";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(
        "[FCM][setBackgroundMessageHandler]: Message handled in the background :" + JSON.stringify(remoteMessage)
    );

    if ((remoteMessage.data || {}).source === "Insider") {
        RNInsider.handleNotification(remoteMessage.data);
    }
});
