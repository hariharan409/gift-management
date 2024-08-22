import React, { useContext } from "react";
import { Image,StyleSheet,Text,View } from "react-native";
import CompanyLogo from "../../../assets/pages/app-header/company-logo.png";
import HeaderMenu from "./HeaderMenu";
import { UserContext } from "../../contexts/UserContext";
import { LottieJumpingGift } from "../../components/lottie-web-animation/LottieWebAnimation";

const Header = () => {
    const {userEMail} = useContext(UserContext);
    return(
        <View style={styles.rootElement}>
            <Image style={{width: "130px",resizeMode: "contain"}} source={CompanyLogo} />
            <View style={{flexDirection: "row",alignItems: "center"}}>
                <LottieJumpingGift style={{width: 70}} loop={true} />
                <Text style={{fontWeight: "bold",textTransform: "uppercase",fontSize: "14px",color: "#003eff",marginLeft: "-10px"}}>gift and hospitality</Text>
            </View>
            <View style={{flexDirection: "row",alignItems: "center",columnGap: "10px"}}>
                <Text style={{fontWeight: "bold",fontSize: "14px",color: "rgba(0,0,0,0.8)"}}>{userEMail?.split("@")?.[0]}</Text>
                <HeaderMenu />
            </View>
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