import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import LottieWelcomeAnimation from "../../../assets/lottie/gift-animation-one.json";
import LottieGiftSuccessAnimation from "../../../assets/lottie/gift-success-submission-approval.json";


export const LottieWelcome = ({style}) => {

    return(
        <View style={style}>
            <LottieView source={LottieWelcomeAnimation} autoPlay loop={true} speed={0.5} />
        </View>
    )
}

export const LottieGiftSuccess = ({style,loop}) => {

    return(
        <View style={style}>
            <LottieView source={LottieGiftSuccessAnimation} autoPlay loop={loop} speed={0.5} />
        </View>
    )
}