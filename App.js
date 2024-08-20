
import { Platform, SafeAreaView} from 'react-native';
import "@expo/metro-runtime";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Toaster} from "react-hot-toast";
import Header from './src/pages/app-header/Header';
import Welcome from './src/pages/app-body/welcome-screen/Welcome';
import GiftAndHospitalityForm from './src/pages/app-body/gift-and-hospitality/form/Index';
import SubmissionTabView from "./src/pages/app-body/gift-and-hospitality/table/gift-submission-table/Index";
import ApprovalTabView from './src/pages/app-body/gift-and-hospitality/table/gift-approval-table/Index';

const Stack = createNativeStackNavigator();
export default function App() {

  const NavigationContainerTheme = {
    colors: {
      background: "#FFF"
    }
  }

  return (
    <SafeAreaView style={{width: "100%",height: "100%",backgroundColor: "#FFF"}}>
      {Platform.OS !== "web" && <Header />}
      <NavigationContainer theme={NavigationContainerTheme}>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='welcome-screen'>
            <Stack.Screen name='welcome-screen' component={Welcome} />
            <Stack.Screen name='gift-and-hospitality-form' component={GiftAndHospitalityForm} />
            <Stack.Screen name='gift-and-hospitality-submission-tab' component={SubmissionTabView} />
            <Stack.Screen name='gift-and-hospitality-approval-tab' component={ApprovalTabView} />
          </Stack.Navigator>
      </NavigationContainer>
      <Toaster />
    </SafeAreaView>
  );
}
