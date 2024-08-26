
import React from 'react';
import { SafeAreaView} from 'react-native';
import "@expo/metro-runtime";
import {I18nextProvider} from "react-i18next";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Toaster} from "react-hot-toast";
import Header from './src/pages/app-header/Header';
import Welcome from './src/pages/app-body/welcome-screen/Welcome';
import GiftAndHospitalityForm from './src/pages/app-body/gift-and-hospitality/form/Index';
import SubmissionTabView from "./src/pages/app-body/gift-and-hospitality/table/gift-submission-table/Index";
import ApprovalTabView from './src/pages/app-body/gift-and-hospitality/table/gift-approval-table/Index';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './src/contexts/UserContext';
import i18n from './src/i18n/i18n-config';

const Stack = createNativeStackNavigator();

const App = () => {
  const NavigationContainerTheme = {
    colors: {
      background: "#FFF"
    }
  }

  const linking = {
      prefixes: ["https://assetcaredemo.seatrium.com/giftapp/"]
  };

  return (
    <PaperProvider>
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <SafeAreaView style={{width: "100%",height: "100%",backgroundColor: "#FFF"}}>
            <Header />
            <NavigationContainer theme={NavigationContainerTheme} linking={linking}>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='welcome-screen'>
                  <Stack.Screen name='welcome-screen' component={Welcome} />
                  <Stack.Screen name='gift-and-hospitality-form' component={GiftAndHospitalityForm} />
                  <Stack.Screen name='gift-and-hospitality-submission-tab' component={SubmissionTabView} />
                  <Stack.Screen name='gift-and-hospitality-approval-tab' component={ApprovalTabView} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toaster />
          </SafeAreaView>
        </UserProvider>
      </I18nextProvider>
    </PaperProvider>
  );
};

export default App;
