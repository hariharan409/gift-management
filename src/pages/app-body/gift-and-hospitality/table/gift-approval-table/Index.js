import React from "react";
import { StyleSheet } from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GiftAndHospitalityApprovalTable from "./GiftApproval";
import GiftApprovedByYou from "./GiftApprovedByYou";
import GiftRejectedByYou from "./GiftRejectedByYou";

const Tab = createBottomTabNavigator();

const ApprovalTabView = () => {

    return(
        <Tab.Navigator initialRouteName="approval-table" screenOptions={{...styles.tabNavScreenOptions}}>
            <Tab.Screen 
                name="approval-table" 
                component={GiftAndHospitalityApprovalTable} 
                options={{
                    tabBarLabel: "pending approval by you",
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
                name="gift-approved-by-you-table" 
                component={GiftApprovedByYou} 
                options={{
                    tabBarLabel: "approved by you",
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
                name="gift-rejected-by-you-table" 
                component={GiftRejectedByYou} 
                options={{
                    tabBarLabel: "rejected by you",
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

export default ApprovalTabView;