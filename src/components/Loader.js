import React from "react";
import { ActivityIndicator, View } from "react-native";

export const FullScreenLoader = () => {

    return(
        <View style={{flex: 1,justifyContent: "center"}}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    )
};