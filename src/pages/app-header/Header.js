import React from "react";
import { Image,View } from "react-native";
import CompanyLogo from "../../../assets/pages/app-header/company-logo.png";
import Entypo from "@expo/vector-icons/Entypo";

const Header = () => {

    return(
        <View style={{width: "100%",height: 30,display: "flex",flexDirection: "row",alignItems: "center",paddingHorizontal: 5,borderBottomWidth: "0.5px",borderBottomColor: "rgba(0,0,0,0.1)"}}>
            <Image style={{width: "100px",height: "100%",resizeMode: "contain"}} source={CompanyLogo} />
            <Entypo name="dots-three-vertical" size={20} color="#000" style={{flex:1,textAlign: "right"}} />
        </View>  
    )
}

export default Header;