import React from "react";
import { Button, Image, Text, View } from "react-native";
import BusinessGiftImage from "../../../../assets/pages/app-body/welcome-screen/business-gift-image.jpg";


const Welcome = ({navigation}) => {
    const currentYear = new Date().getFullYear();

    return(
        <View style={{width: "100%",height: "100%",display: "flex",flexDirection: "column",justifyContent: "center",rowGap: "20px",paddingHorizontal: 20}}>
            <Image style={{height: "40%",width: "100%",resizeMode: "contain",borderRadius: "10px",shadowColor: "green"}} source={BusinessGiftImage} />
            <Text style={{fontWeight: "bold",textTransform: "capitalize",fontSize: "20px",textAlign: "center"}}>welcome to gift & hospitality management!</Text>
            <Text style={{color: "rgba(0,0,0,0.5)",fontSize: "12px",textAlign: "center",fontWeight: "bold"}}>
                It is designed to streamline the process of managing corporate gifts, ensuring that businesses can efficiently track,
                organize and distribute gifts to clients,partners and employees
            </Text>
            <View style={{width: "200px",alignSelf: "center"}}>
                <Button onPress={() => navigation.navigate("gift-and-hospitality-table")} title="NEXT" touchSoundDisabled={false} />
            </View>
            <View style={{position: "absolute",bottom: 0,left: 50,right: 50}}>
                <Text style={{textAlign: "center",textTransform: "capitalize",color: "rgba(0,0,0,0.8)",fontSize: "12px"}}>app version b-0.0.1 @{currentYear} seatrium digital</Text>
            </View>
        </View>
    )
}

export default Welcome;