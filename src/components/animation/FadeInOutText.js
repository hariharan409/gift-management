import React, { useEffect, useRef } from "react";
import { StyleSheet,Animated } from "react-native";

const FadeInOutText = ({text,style}) => {
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
        Animated.sequence([
            Animated.timing(opacityValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
            }),
            Animated.timing(opacityValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            }),
        ])
        ).start();
    }, [opacityValue]);

    return(
        <Animated.Text style={[{...styles.appNameText,...style}, {opacity: opacityValue}]}>{text}</Animated.Text>
    )
}

const styles = StyleSheet.create({
    appNameText: {
        textTransform: "capitalize",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#000"
    }
});

export default FadeInOutText;