import React from "react";
import { StyleSheet } from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GiftAndHospitalitySubmissionTable from "./GiftSubmission";
import RejectedGiftSubmission from "./RejectedGiftSubmission";
import ApprovedGiftSubmission from "./ApprovedGiftSubmission";

const Tab = createBottomTabNavigator();

const SubmissionTabView = () => {

    return(
        <Tab.Navigator initialRouteName="submission-table" screenOptions={{...styles.tabNavScreenOptions}}>
            <Tab.Screen 
                name="submission-table" 
                component={GiftAndHospitalitySubmissionTable} 
                options={{
                    tabBarLabel: "gift submission",
                    tabBarItemStyle: {
                        borderColor: "grey",
                        borderWidth: "1px",
                        marginHorizontal: "5px"
                    },
                    tabBarIcon: () => {
                        return <FontAwesome5 name="list" size={15} color="blue" style={{marginRight: "2px"}}  />
                    }
                }}
            />
            <Tab.Screen 
                name="submission-approved-table" 
                component={ApprovedGiftSubmission} 
                options={{
                    tabBarLabel: "approved submission",
                    tabBarItemStyle: {
                        borderColor: "grey",
                        borderWidth: "1px",
                        marginHorizontal: "5px"
                    },
                    tabBarIcon: () => {
                        return <FontAwesome5 name="list" size={15} color="blue" style={{marginRight: "2px"}}  />
                    }
                }}
            />
            <Tab.Screen 
                name="submission-rejected-table" 
                component={RejectedGiftSubmission} 
                options={{
                    tabBarLabel: "rejected submission",
                    tabBarItemStyle: {
                        borderColor: "grey",
                        borderWidth: "1px",
                        marginHorizontal: "5px",
                    },
                    tabBarIcon: () => {
                        return <FontAwesome5 name="list" size={15} color="blue" style={{marginRight: "2px"}}  />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabNavScreenOptions: {
        tabBarActiveTintColor: "#FFF",
        tabBarActiveBackgroundColor: "#000",
        headerShown: false,
        tabBarStyle: {
            borderWidth: 0,
        },
        tabBarLabelStyle: {
            fontSize: "12px",
            textTransform: "uppercase",
        }
    }
});

export default SubmissionTabView;