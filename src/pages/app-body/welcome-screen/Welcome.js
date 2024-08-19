import React from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import {useForm,Controller} from "react-hook-form";
import BusinessGiftImage from "../../../../assets/pages/app-body/welcome-screen/business-gift-image.jpg";
import { FailureToast } from "../../../components/Toast";


const Welcome = ({navigation}) => {
    const currentYear = new Date().getFullYear();
    const {control,handleSubmit,formState:{errors},getValues,watch,setValue} = useForm({
        defaultValues: {
            loginEmail: "",
        }
    });

    const onFormSubmit = async(user) => {
        try {
            localStorage.setItem("user-email",user.loginEmail);
            navigation.navigate("gift-and-hospitality-table");
        } catch (error) {
            FailureToast(error.message);
        }
    }

    const ShowError = ({errorMessage}) => {
        return(
            <Text style={{marginTop: 3,fontSize: "10px",fontWeight: "600",textTransform: "capitalize",color: "red"}}>{errorMessage}</Text>
        );
    }

    return(
        <View style={{width: "100%",height: "100%",display: "flex",flexDirection: "column",justifyContent: "center",rowGap: "20px",paddingHorizontal: 20}}>
            <Image style={{height: "40%",width: "100%",resizeMode: "contain",borderRadius: "10px",shadowColor: "green"}} source={BusinessGiftImage} />
            <Text style={{fontWeight: "bold",textTransform: "capitalize",fontSize: "20px",textAlign: "center"}}>welcome to gift & hospitality management!</Text>
            <Text style={{color: "rgba(0,0,0,0.5)",fontSize: "12px",textAlign: "center",fontWeight: "bold"}}>
                It is designed to streamline the process of managing corporate gifts, ensuring that businesses can efficiently track,
                organize and distribute gifts to clients,partners and employees
            </Text>
            {/* TEXT BOX */}
            <View style={{width: "50%",alignSelf: "center"}}>
                <Controller 
                    name="loginEmail" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>user email</Text>
                            <TextInput keyboardType="email-address" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                        </View>
                    )}
                />
                {errors.loginEmail && <ShowError errorMessage="this is required" />}
            </View>
            <View style={{width: "200px",alignSelf: "center"}}>
                <Button onPress={handleSubmit(onFormSubmit)} title="NEXT" touchSoundDisabled={false} />
            </View>
            <View style={{position: "absolute",bottom: 0,left: 50,right: 50}}>
                <Text style={{textAlign: "center",textTransform: "capitalize",color: "rgba(0,0,0,0.8)",fontSize: "12px"}}>app version b-0.0.1 @{currentYear} seatrium digital</Text>
            </View>
        </View>
    )
}

export default Welcome;