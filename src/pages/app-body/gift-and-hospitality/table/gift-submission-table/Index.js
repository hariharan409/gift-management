import React from "react";
import { StyleSheet } from "react-native";
import {Ionicons,FontAwesome5,MaterialIcons} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GiftAndHospitalitySubmissionTable from "./GiftSubmission";

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
                component={GiftAndHospitalitySubmissionTable} 
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
                component={GiftAndHospitalitySubmissionTable} 
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