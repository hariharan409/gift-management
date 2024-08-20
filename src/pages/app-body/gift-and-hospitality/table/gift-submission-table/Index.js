import React from "react";
import { StyleSheet } from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import YourSubmission from "./YourSubmission";
import RejectedGiftSubmission from "./YourRejectedSubmission";
import ApprovedGiftSubmission from "./YourApprovedSubmission";

const Tab = createBottomTabNavigator();

const SubmissionTabView = () => {

    return(
        <Tab.Navigator initialRouteName="submission-table" screenOptions={{...styles.tabNavScreenOptions}}>
            <Tab.Screen 
                name="submission-table" 
                component={YourSubmission} 
                options={{
                    tabBarLabel: "your submission",
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
                    tabBarLabel: "your approved submission",
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
                    tabBarLabel: "your rejected submission",
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