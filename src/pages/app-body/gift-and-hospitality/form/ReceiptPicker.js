import React from "react";
import { Button, Image, Text, View } from "react-native";
import { Controller } from "react-hook-form";
import PlaceHolderImage from "../../../../../assets/pages/app-body/gift-and-hospitality/form/place-holder-image.jpg";


const ReceiptPicker = ({watch,control,getValues,onPickImage,errors}) => {

    const ShowError = ({errorMessage}) => {
        return(
            <Text style={{marginTop: 3,fontSize: "10px",fontWeight: "600",textTransform: "capitalize",color: "red"}}>{errorMessage}</Text>
        );
    }

    return(
        <View>
            {/* IMAGE PICKER */}
            <Controller 
                name="receiptImage" 
                control={control} 
                rules={{required: true}} 
                render={({field: {}}) => (
                    <View style={{marginTop: 20,marginBottom: 10}}>
                        <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize",marginBottom: 10}}>upload receipt</Text>
                        <View style={{width: "200px",alignSelf: "center"}}>
                            <Button onPress={onPickImage} title="PICK RECEIPT" touchSoundDisabled={false} />
                        </View>
                    </View>
                )}
            />
            {<Image style={{alignSelf: "center",width: "300px",height: "200px",borderRadius: 10,objectFit: "contain"}} source={watch("receiptImage") ? {uri:getValues("receiptImage")} : PlaceHolderImage} />}
            {errors.receiptImage && <ShowError errorMessage="this is required" />}
        </View>
    )
}

export default ReceiptPicker;