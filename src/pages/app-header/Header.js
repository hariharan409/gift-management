import React from "react";
import { Image,StyleSheet,View } from "react-native";
import CompanyLogo from "../../../assets/pages/app-header/company-logo.png";
import FadeInOutText from "../../components/animation/FadeInOutText";
import HeaderMenu from "./HeaderMenu";

const Header = () => {

    return(
        <View style={styles.rootElement}>
            <Image style={{width: "130px",resizeMode: "contain"}} source={CompanyLogo} />
            <FadeInOutText text="gift and hospitality" style={{}} />
            <HeaderMenu />
        </View>  
    )
}

const styles = StyleSheet.create({
    rootElement: {
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
        borderBottomWidth: "2px",
        borderBottomColor: "rgba(0,0,0,0.6)"
    }
});

export default Header;