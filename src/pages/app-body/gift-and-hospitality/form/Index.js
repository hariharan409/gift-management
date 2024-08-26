import React, { useContext, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {useForm,Controller} from "react-hook-form";
import {Ionicons} from "@expo/vector-icons";
import {Dropdown} from "react-native-element-dropdown";
import * as ExpoImagePicker from "expo-image-picker";
import ReceiptPicker from "./ReceiptPicker";
import {createGiftAPI, getGiftCategoryAPI, getYourSubmissionByIDAPI} from "../../../../api/yourSubmissionApi";
import { FailureToast, SuccessToast } from "../../../../components/Toast";
import { FullScreenLoader } from "../../../../components/Loader";
import { UserContext } from "../../../../contexts/UserContext";
import { Checkbox } from "react-native-paper";
import { LottieGiftSuccess, LottieMoney } from "../../../../components/lottie-web-animation/LottieWebAnimation";
import {BlurView} from "expo-blur";


const GiftAndHospitalityForm = ({route,navigation}) => {
    const {userEMail} = useContext(UserContext);
    const [booleanState,setBooleanState] = useState({isSubmitting: false,isSubmitted: false,isIntendedRequestor: false});
    const {giftID,canEdit} = route.params;
    const [giftCategoryList,setGiftCategoryList] = useState([]);
    const [isMount,setMount] = useState(true);
    const {control,handleSubmit,setError,formState:{errors},getValues,watch,setValue} = useForm({
        defaultValues: {
            id: null,
            vendor: "",
            giftCategory: {},
            giftType: "",
            giftAcceptanceType: "",
            businessDescription: "",
            requestorEmail: userEMail,
            intendedRequestorName: "",
            intendedRequestorEMail: "",
            giftDescription: "",
            remarks: "",
            giftValue: 0,
            higherPositionName: "",
            isGovernmentOfficial: 0,
            emailAcknowledgements: [
                {
                    position: "compliance",
                    email: "",
                    approvalSequence: 1,
                    isApproved: 0,
                    approvalRequired: 0,
                    canApprove: 0,
                },
                {
                    position: "HOD", 
                    email: "",
                    approvalSequence: 2,
                    isApproved: 0,
                    approvalRequired: 0,
                    canApprove: 0,
                },
                {
                    position: "BU",
                    email: "",
                    approvalSequence: 3,
                    isApproved: 0,
                    approvalRequired: 0,
                    canApprove: 0,
                },
                {
                    position: "CEO",
                    email: "",
                    approvalSequence: 4,
                    isApproved: 0,
                    approvalRequired: 0,
                    canApprove: 0,
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
                const responseObj = await getYourSubmissionByIDAPI(giftID);
                if(responseObj) {
                    Object.keys(responseObj).forEach((key) => {
                        setValue(key,responseObj[key]);
                    });
                    if(responseObj.intendedRequestorEMail.trim()) {
                        onUpdateBooleanState({isIntendedRequestor: true});
                    }
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
            onUpdateBooleanState({isSubmitting: true});
            if(giftObject.giftValue > 350) {
                setError("giftValue",{
                    type: "validate",
                    message: "Gift value cannot exceed $350"
                });
                onUpdateBooleanState({isSubmitting: false});
                return;
            }
            // IF COMPLIANCE NEED TO APPROVE, THEN HE WILL BE THE FIRST APPROVER.
            giftObject.emailAcknowledgements[0].canApprove = giftObject?.emailAcknowledgements?.[0]?.email ? 1 : 0;
            // IF COMPLIANCE NO NEED TO APPROVE, THEN HOD WILL BE THE FIRST APPROVER.
            giftObject.emailAcknowledgements[1].canApprove = giftObject?.emailAcknowledgements?.[0]?.email ? 0 : 1;
            await createGiftAPI(giftObject);
            onUpdateBooleanState({isSubmitted: true});
            setTimeout(() => {
                onUpdateBooleanState({isSubmitting: false,isSubmitted: false});
                SuccessToast(`Your gift form has been ${giftID ? "updated" : "created"} successfully`);
                navigation.navigate("gift-and-hospitality-submission-tab");
            },8000);
        } catch (error) {
            onUpdateBooleanState({isSubmitting: false});
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
            const allowedFormats = [
                'image/jpeg', // JPEG/JPG
                'image/png',  // PNG
                'image/heic', // HEIC (High Efficiency Image Coding)
                'image/heif', // HEIF (High Efficiency Image Format)
            ];
            if(!allowedFormats.includes(result.assets[0].mimeType)) {
                FailureToast("Invalid Format");
                return;
            }
           setValue("receiptImage",result.assets[0].uri);
        }   
    }
    // UPDATING A BOOLEAN OBJECT
    const onUpdateBooleanState = (update) => {
        try {
            setBooleanState((prevState) => ({
                ...prevState,
                ...update
            }));
        } catch (error) {
            FailureToast(error.message);
        }
    }

    /* IT WILL RENDER ONCE THE UI IS MOUNTING */
    if(isMount) {
        return <FullScreenLoader />
    };

    return(
        <>
            <LottieMoney style={{width: "20%",position: "absolute",left: "2%",top: "25%"}} loop={true} speed={0.6} />
            <ScrollView style={{paddingTop: 5,paddingHorizontal: 20,width: "50%",alignSelf: "center",backgroundColor: canEdit ? "#FAF9F6" : "rgba(0,0,0,0.150)"  }} automaticallyAdjustKeyboardInsets={true}>
                {/* PAGE TITLE */}
                <View style={styles.topRowView}>
                    <Ionicons onPress={() => navigation.goBack(null)} style={{cursor: "pointer"}} name="arrow-back-circle-sharp" size={40} color="#FFF" />
                    <Text style={{fontWeight: "bold",textTransform: "uppercase",fontSize: "16px"}}>new submission</Text>
                    <View />
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
                                    itemTextStyle={{textTransform: "capitalize"}}
                                    selectedTextStyle={{textTransform: "capitalize"}}
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
                                    itemTextStyle={{textTransform: "capitalize"}}
                                    selectedTextStyle={{textTransform: "capitalize"}}
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
                    {/* GIFT ACCEPTANCE TYPE DROPDOWN */}
                    {((watch("giftCategory").name === "gift" || watch("giftCategory").name === "travel-gift") && watch("giftType") === "acceptance") ? <>
                        <Controller 
                            name="giftAcceptanceType" 
                            control={control} 
                            rules={{required: true}} 
                            render={({field: {onChange,onBlur,value}}) => (
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>gift acceptance type</Text>
                                    <Dropdown 
                                        data={[
                                            { label: 'Accepted (Shared with team)', value: 'Accepted (Shared with team)' },
                                            { label: 'Accepted (Personal)', value: 'Accepted (Personal)' },
                                            { label: 'Returned to sender', value: 'Returned to sender' },
                                        ]}
                                        placeholder="Select Acceptance Type"
                                        placeholderStyle={{color: "rgba(0,0,0,0.2)"}}
                                        itemTextStyle={{textTransform: "capitalize"}}
                                        selectedTextStyle={{textTransform: "capitalize"}}
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
                        {errors.giftAcceptanceType && <ShowError errorMessage="this is required" />}
                    </> : setValue("giftAcceptanceType","")}
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
                    <View style={{marginTop: "20px",flexDirection: "row",alignItems: "center",marginLeft: "-5px"}}>
                        <Checkbox status={booleanState.isIntendedRequestor === true ? "checked" : "unchecked"} onPress={() => onUpdateBooleanState({isIntendedRequestor: !booleanState.isIntendedRequestor})} />
                        <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>submit on behalf of</Text>
                    </View>
                    {booleanState.isIntendedRequestor ? <>
                        <Controller 
                            name="intendedRequestorName" 
                            control={control} 
                            rules={{required: true}} 
                            render={({field: {onChange,onBlur,value}}) => (
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>name</Text>
                                    <TextInput readOnly={!booleanState.isIntendedRequestor} keyboardType="default" style={{backgroundColor: `${booleanState.isIntendedRequestor === false && "rgba(0,0,0,0.2)"}`,width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Intended Requestor Name" onBlur={onBlur} onChangeText={onChange} value={value}  />
                                </View>
                            )}
                        />
                        {errors.intendedRequestorName && <ShowError errorMessage="this is required" />}
                    </> : setValue("intendedRequestorName","")
                    }
                    {booleanState.isIntendedRequestor ? <>
                        <Controller 
                            name="intendedRequestorEMail" 
                            control={control} 
                            rules={{required: true}} 
                            render={({field: {onChange,onBlur,value}}) => (
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>email</Text>
                                    <TextInput readOnly={!booleanState.isIntendedRequestor} keyboardType="email-address" style={{backgroundColor: `${booleanState.isIntendedRequestor === false && "rgba(0,0,0,0.2)"}`,width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Intended Requestor Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                                </View>
                            )}
                        />
                        {errors.intendedRequestorEMail && <ShowError errorMessage="this is required" />}
                    </> : setValue("intendedRequestorEMail","")}
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
                                <TextInput  keyboardType="decimal-pad" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} defaultValue={getValues("giftValue").toString()} onBlur={onBlur} onChangeText={(value) => onChange(parseFloat(value))} value={value} placeholder="Enter Gift Amount"  />
                            </View>
                        )}
                    />
                    {errors.giftValue && <ShowError errorMessage={errors.giftValue.message || "this is required"} />}
                    {/* TEXT BOX */}
                    {(watch("giftCategory").name === "business-entertainment" || watch("giftCategory").name === "travel-business-entertainment") && 
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
                            name="emailAcknowledgements[0].email" 
                            control={control} 
                            rules={{required: true}} 
                            render={({field: {onChange,onBlur,value}}) => (
                                <View style={{marginTop: 20}}>
                                    <Text style={{fontSize: "16px",fontWeight: "600"}}>Compliance Approval</Text>
                                    <TextInput keyboardType="email-address" style={{width: "100%",height: 30,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10}} placeholder="Enter Compliance Email" onBlur={onBlur} onChangeText={onChange} value={value}  />
                                </View>
                            )}
                        />
                        {errors.emailAcknowledgements?.[0]?.email && <ShowError errorMessage="this is required" />}
                    </> : setValue("emailAcknowledgements[0].email","")}
                    {/* TEXT BOX */}
                    <Controller 
                        name="emailAcknowledgements[1].email" 
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
                    {errors.emailAcknowledgements?.[1]?.email && <ShowError errorMessage="this is required" />}
                    {/* TEXT BOX */}
                    {watch("giftValue") >= 100 ? <>
                        <Controller 
                            name="emailAcknowledgements[2].email" 
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
                        {errors.emailAcknowledgements?.[2]?.email && <ShowError errorMessage="this is required" />}
                    </> : setValue("emailAcknowledgements[2].email","")}
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
                    <View style={{width: "200px",alignSelf: "center",marginVertical: 20,pointerEvents: `${(booleanState.isSubmitting || !canEdit) ? "none" : "auto"}`}}>   
                        <Button onPress={handleSubmit(onFormSubmit)} title="SUBMIT" touchSoundDisabled={false} color={(booleanState.isSubmitting || !canEdit) && "gray"}  />
                    </View>
                </View>
            </ScrollView>
            <LottieMoney style={{width: "20%",position: "absolute",right: "2%",top: "25%"}} loop={true} speed={0.4} />
            {booleanState.isSubmitted && 
                <BlurView intensity={50} tint="systemThickMaterialLight" style={{width: "100%",height: "100%",position: "absolute"}}>
                    <LottieGiftSuccess style={{width: "20%",height: "50%",top: "20%",left: "40%"}} loop={false} />
                </BlurView>
            }
        </>
    )
}


const styles = StyleSheet.create({
    topRowView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#003eff",
        paddingHorizontal: "5px",
        paddingVertical: "10px"
    },
})

export default GiftAndHospitalityForm;