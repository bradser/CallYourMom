import { AppRegistry, DeviceEventEmitter, Linking } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from "react-native-push-notification";
import AppLogic from "./src/AppLogic";
import { getLog } from "./src/CallLog";

import App from "./App";

const MyHeadlessTask = async () => {
  await new AppLogic((details) => PushNotification.localNotification(details)).check(getLog);

  BackgroundFetch.finish();
};

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent("CallYourMom", () => App);

PushNotification.configure({
  onNotification: (notification) => {
    if (notification.tag) {
      Linking.openURL(`tel:${notification.tag}`);
    }
  },

  requestPermissions: true,
});
