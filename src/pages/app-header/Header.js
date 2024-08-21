import React from "react";
import { Image,View } from "react-native";
import CompanyLogo from "../../../assets/pages/app-header/company-logo.png";
import Entypo from "@expo/vector-icons/Entypo";
import FadeInOutText from "../../components/FadeInOutText";

const Header = () => {

    return(
        <View style={{width: "100%",height: 50,display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center",paddingHorizontal: 5,borderBottomWidth: "2px",borderBottomColor: "rgba(0,0,0,0.6)"}}>
            <Image style={{width: "130px",resizeMode: "contain"}} source={CompanyLogo} />
            <FadeInOutText text="gift and hospitality" style={{}} />
            <Entypo name="dots-three-vertical" size={20} color="#000" style={{paddingRight: "10px",cursor: "pointer"}} />
        </View>  
    )
}

export default Header;