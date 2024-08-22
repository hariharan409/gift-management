import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import LottieGiftAnimation from "../../../assets/lottie/gift-animation-one.json";


export const LottieWelcome = ({style}) => {

    return(
        <View style={style}>
            <LottieView source={LottieGiftAnimation} autoPlay loop={true} speed={0.5} />
        </View>
    )
}