import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";


const HeaderMenu = () => {

    return(
        <Entypo name="dots-three-vertical" size={20} color="#000" style={{paddingRight: "10px",cursor: "pointer"}} onPress={() => setShowMenu(true)} />      
    )
}

export default HeaderMenu;