import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import LottieWelcomeAnimation from "../../../assets/lottie/gift-animation-one.json";
import LottieMoneyAnimation from "../../../assets/lottie/gift-animation-three.json";
import LottieGiftSuccessAnimation from "../../../assets/lottie/gift-success-submission-approval.json";
import LottieGiftJumpingAnimation from "../../../assets/lottie/gift-animation-two.json";
import LottieGiftRejectAnimation from "../../../assets/lottie/gift-reject-approval.json";


export const LottieWelcome = ({style}) => {

    return(
        <View style={style}>
            <LottieView source={LottieWelcomeAnimation} autoPlay loop={true} speed={1.2} />
        </View>
    )
}

export const LottieMoney = ({style,speed}) => {

    return(
        <View style={style}>
            <LottieView source={LottieMoneyAnimation} autoPlay loop={true} speed={speed} />
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

export const LottieJumpingGift = ({style,loop}) => {

    return(
        <View style={style}>
            <LottieView source={LottieGiftJumpingAnimation} autoPlay loop={loop} speed={1.3} />
        </View>
    )
}

export const LottieGiftReject = ({style,loop}) => {

    return(
        <View style={style}>
            <LottieView source={LottieGiftRejectAnimation} autoPlay loop={loop} speed={0.2} />
        </View>
    )
}