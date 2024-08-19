import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View, ActivityIndicator } from "react-native";
import {useForm,Controller} from "react-hook-form";
import {Ionicons} from "@expo/vector-icons";
import {Dropdown} from "react-native-element-dropdown";
import * as ExpoImagePicker from "expo-image-picker";
import ReceiptPicker from "./ReceiptPicker";
import {createGiftAPI, getGiftCategoryAPI, getGiftSubmissionByIDAPI} from "../../../../api/giftApi";
import { FailureToast, SuccessToast } from "../../../../components/Toast";
import { FullScreenLoader } from "../../../../components/Loader";


const GiftAndHospitalityForm = ({route,navigation}) => {
    const {giftID,canEdit} = route.params;
    const [giftCategoryList,setGiftCategoryList] = useState([]);
    const [isMount,setMount] = useState(true);
    const {control,handleSubmit,formState:{errors},getValues,watch,setValue} = useForm({
        defaultValues: {
            id: null,
            vendor: "",
            giftCategory: {},
            giftType: "",
            businessDescription: "",
            requestorEmail: "",
            giftDescription: "",
            remarks: "",
            giftValue: 0,
            higherPositionName: "",
            isGovernmentOfficial: 0,
            emailAcknowledgements: [
                {
                    position: "HOD",
                    email: "",
                    approvalSequence: 1,
                    isApproved: 0,
                    approvalRequired: 0
                },
                {
                    position: "BU",
                    email: "",
                    approvalSequence: 2,
                    isApproved: 0,
                    approvalRequired: 0
                },
                {
                    position: "compliance",
                    email: "",
                    approvalSequence: 3,
                    isApproved: 0,
                    approvalRequired: 0
                },
                {
                    position: "CEO",
                    email: "",
                    approvalSequence: 4,
                    isApproved: 0,
                    approvalRequired: 0
                },  
            ],
            receiptImage: null,
        }
    });

    const loadDataOnInitialRender = async() => {
        try {
            const responseList = await getGiftCategoryAPI();
            /* IF GIFT IS NOT NULL, USER IS TRYING TO EDIT THE FORM*/
            if(giftID) {
                const responseObj = await getGiftSubmissionByIDAPI(giftID);
                if(responseObj) {
                    Object.keys(responseObj).forEach((key) => {
                        setValue(key,responseObj[key]);
                    });
                };
            };
            setGiftCategoryList(responseList);
        } catch (error) {
           FailureToast("Oops! Something went wrong.")
        } finally {
            setMount(false);
        }
    }

    useEffect(() => {
        loadDataOnInitialRender();
    },[]);

    const onFormSubmit = async(giftObject) => {
        try {
            await createGiftAPI(giftObject);
            SuccessToast(`Your gift form has been ${giftID ? "updated" : "created"} successfully`);
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

    const onPickImage = async() => {
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });

        if(!result.canceled) {
           setValue("receiptImage",result.assets[0].uri);
        }
        
    }

    /* IT WILL RENDER ONCE THE UI IS MOUNTING */
    if(isMount) {
        return <FullScreenLoader />
    };

    return(
        <ScrollView style={{paddingTop: 5,paddingHorizontal: 20,width: "50%",alignSelf: "center",backgroundColor: !canEdit && "rgba(0,0,0,0.150)" }} automaticallyAdjustKeyboardInsets={true}>
            {/* PAGE TITLE */}
            <View style={{display: "flex",flexDirection: "row",alignItems: "center",borderBottomColor: "rgba(0,0,0,0.5)",borderBottomWidth: "1px"}}>
                <Ionicons onPress={() => navigation.goBack(null)} style={{cursor: "pointer"}} name="arrow-back-circle-sharp" size={40} color="black" />
                <Text style={{fontWeight: "bold",textTransform: "uppercase",fontSize: "16px",marginLeft: "auto",marginRight: "auto"}}>new submission</Text>
            </View>
            <View style={{pointerEvents: !canEdit && "none",cursor: !canEdit && "not-allowed"}}>
                {!canEdit ? <Text style={{color: "red",marginTop: "10px",fontWeight: "600"}}>
                    The form you are attempting to access has already been partially approved by some of the designated approvers. As a result, the form is now locked for further edits to maintain the integrity of the approval process.
                </Text> : null}
                <ReceiptPicker watch={watch} control={control} getValues={getValues} onPickImage={onPickImage} errors={errors} />
                {/* DROPDOWN */}
                <Controller 
                    name="giftCategory" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>gift category</Text>
                            <Dropdown 
                                data={giftCategoryList}
                                placeholder="Select Category"
                                placeholderStyle={{color: "rgba(0,0,0,0.2)"}}
                                labelField="name"
                                valueField="id"
                                onChange={(selectedObj) => onChange(selectedObj)}
                                onBlur={onBlur}
                                value={value}
                                style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}}
                            />
                        </View>
                    )}
                />
                {errors.giftCategory && <ShowError errorMessage="this is required" />}
                {/* DROPDOWN */}
                <Controller 
                    name="giftType" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>gift type</Text>
                            <Dropdown 
                                data={[
                                    { label: 'acceptance', value: 'acceptance' },
                                    { label: 'offering', value: 'offering' },
                                ]}
                                placeholder="Select Type"
                                placeholderStyle={{color: "rgba(0,0,0,0.2)"}}
                                labelField="label"
                                valueField="value"
                                onChange={(selectedObj) => onChange(selectedObj.value)}
                                onBlur={onBlur}
                                value={value}
                                style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}}
                            />
                        </View>
                    )}
                />
                {errors.giftType && <ShowError errorMessage="this is required" />}
                {/* DESCRIPTION BOX */}
                <Controller 
                    name="businessDescription" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>business purpose</Text>
                            <TextInput multiline={true} numberOfLines={4} style={{width: "100%",height: 100,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Business Purpose" onBlur={onBlur} onChangeText={onChange} value={value}  />
                        </View>
                    )}
                />
                {errors.businessDescription && <ShowError errorMessage="this is required" />}
                {/* TEXT BOX */}
                <Controller 
                    name="requestorEmail" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>email of requestor's behalf</Text>
                            <TextInput keyboardType="email-address" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                        </View>
                    )}
                />
                {errors.requestorEmail && <ShowError errorMessage="this is required" />}
                {/* DESCRIPTION BOX */}
                <Controller 
                    name="giftDescription" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>description of gift or hospitality</Text>
                            <TextInput multiline={true} numberOfLines={4} style={{width: "100%",height: 100,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Gift Details" onBlur={onBlur} onChangeText={onChange} value={value}  />
                        </View>
                    )}
                />
                {errors.giftDescription && <ShowError errorMessage="this is required" />}
                {/* TEXT BOX */}
                <Controller 
                    name="vendor" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>vendor/venue</Text>
                            <TextInput style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Vendor Name" onBlur={onBlur} onChangeText={onChange} value={value}  />
                        </View>
                    )}
                />
                {errors.vendor && <ShowError errorMessage="this is required" />}
                {/* DESCRIPTION BOX */}
                <Controller 
                    name="remarks" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>remarks</Text>
                            <TextInput multiline={true} numberOfLines={4} style={{width: "100%",height: 100,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Remarks" onBlur={onBlur} onChangeText={onChange} value={value}  />
                        </View>
                    )}
                />
                {errors.remarks && <ShowError errorMessage="this is required" />}
                {/* TEXT BOX */}
                <Controller 
                    name="giftValue" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>gift value</Text>
                            <TextInput keyboardType="decimal-pad" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} defaultValue={getValues("giftValue").toString()} onBlur={onBlur} onChangeText={(value) => onChange(parseFloat(value))} value={value} placeholder="Enter Gift Amount"  />
                        </View>
                    )}
                />
                {errors.giftValue && <ShowError errorMessage="this is required" />}
                {/* TEXT BOX */}
                {(watch("giftCategory.name") === "business-entertainment" || watch("giftCategory.name") === "travel-business-entertainment") && 
                <>
                    <Controller 
                    name="higherPositionName" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>name of internal highest position</Text>
                            <TextInput style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Name" onBlur={onBlur} onChangeText={onChange} value={value}  />
                        </View>
                    )}
                    />
                    {errors.higherPositionName && <ShowError errorMessage="this is required" />}
                </>}
                {/* DROPDOWN */}
                <Controller 
                    name="isGovernmentOfficial" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => (
                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>Is Counter Party A Government Official?</Text>
                            <Dropdown 
                                data={[
                                    { label: 'yes', value: 1 },
                                    { label: 'no', value: 0 },
                                ]}
                                selectedTextStyle={{textTransform: "capitalize"}}
                                itemTextStyle={{textTransform: "capitalize"}}
                                placeholderStyle={{color: "rgba(0,0,0,0.2)"}}
                                labelField="label"
                                valueField="value"
                                onChange={(selectedObj) => onChange(selectedObj.value)}
                                onBlur={onBlur}
                                value={value}
                                style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}}
                            />
                        </View>
                    )}
                />
                {/* TEXT BOX */}
                {watch("isGovernmentOfficial") === 1 ? <>
                    <Controller 
                        name="emailAcknowledgements[2].email" 
                        control={control} 
                        rules={{required: true}} 
                        render={({field: {onChange,onBlur,value}}) => (
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: "16px",fontWeight: "600"}}>Compliance Approval</Text>
                                <TextInput keyboardType="email-address" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Compliance Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                            </View>
                        )}
                    />
                    {errors.emailAcknowledgements?.[2]?.email && <ShowError errorMessage="this is required" />}
                </> : setValue("emailAcknowledgements[2].email","")}
    
                {/* TEXT BOX */}
                <Controller 
                    name="emailAcknowledgements[0].email" 
                    control={control} 
                    rules={{required: true}} 
                    render={({field: {onChange,onBlur,value}}) => {
                        return (
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: "16px",fontWeight: "600"}}>HOD Approval</Text>
                                <TextInput keyboardType="email-address" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter HOD Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                            </View>
                        )}
                    }
                />
                {errors.emailAcknowledgements?.[0]?.email && <ShowError errorMessage="this is required" />}
                {/* TEXT BOX */}
                {watch("giftValue") >= 100 ? <>
                    <Controller 
                        name="emailAcknowledgements[1].email" 
                        control={control} 
                        rules={{required: true}} 
                        render={({field: {onChange,onBlur,value}}) => {
                            return (
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: "16px",fontWeight: "600"}}>Head Of BU Approval</Text>
                                    <TextInput keyboardType="email-address" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter BU Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                                </View>
                            )}
                        }
                    />
                    {errors.emailAcknowledgements?.[1]?.email && <ShowError errorMessage="this is required" />}
                </> : setValue("emailAcknowledgements[1].email","")}
                {/* TEXT BOX */}
                {watch("giftValue") >= 500 ? <>
                    <Controller 
                        name="emailAcknowledgements[3].email" 
                        control={control} 
                        rules={{required: true}} 
                        render={({field: {onChange,onBlur,value}}) => (
                            <View style={{marginTop: 20}}>
                                <Text style={{fontSize: "16px",fontWeight: "600"}}>CEO Approval</Text>
                                <TextInput keyboardType="email-address" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter CEO Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                            </View>
                        )}
                    />
                    {errors.emailAcknowledgements?.[3]?.email && <ShowError errorMessage="this is required" />}
                </> : setValue("emailAcknowledgements[3].email","")}
                <View style={{width: "200px",alignSelf: "center",marginVertical: 20}}>   
                    <Button onPress={handleSubmit(onFormSubmit)} title="SUBMIT" touchSoundDisabled={false} />
                </View>
            </View>
        </ScrollView>
    )
}

export default GiftAndHospitalityForm;