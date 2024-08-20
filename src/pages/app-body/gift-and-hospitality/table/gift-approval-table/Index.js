import React, { useEffect, useState } from "react";
import { ScrollView, Text, View,StyleSheet, Button } from "react-native";
import {Ionicons,FontAwesome5} from "@expo/vector-icons";
import { getGiftApprovalAPI,approveGiftAPI,rejectGiftAPI } from "../../../../../api/giftApprovalApi";
import { useIsFocused } from "@react-navigation/native";
import { FailureToast, SuccessToast } from "../../../../../components/Toast";
import { FullScreenLoader } from "../../../../../components/Loader";
import GiftApproveModal from "./GiftApproveModal";
import GiftRejectModal from "./GiftRejectModal";

const GiftAndHospitalityApprovalTable = ({navigation}) => {
    const isFocused = useIsFocused();
    const loggedInEmail = localStorage.getItem("user-email")
    const [giftApprovalList,setGiftApprovalList] = useState([]);
    const [isMount,setMount] = useState(true);
    const [approveModalVisible,setApproveModalVisible] = useState(false);
    const [rejectModalVisible,setRejectModalVisible] = useState(false);
    const [giftObject,setGiftObject] = useState({});
 
    const loadDataOnInitialRender = async() => {
        try {
            const responseList = await getGiftApprovalAPI(loggedInEmail);
            if(responseList instanceof Array && responseList.length > 0) {
                setGiftApprovalList(responseList);
            }
        } catch (error) {
            FailureToast("Oops! Something went wrong.")
        } finally {
            setMount(false);
        }
    }

    useEffect(() => {
        if(isFocused) {
            loadDataOnInitialRender();
        }
    },[isFocused]);

    const onApproveModalOpen = (approvalObject) => {
        try {
            setGiftObject(approvalObject);
            setApproveModalVisible(!approveModalVisible);
        } catch (error) {
            FailureToast("Oops! Something went wrong.")
        }
    }

    const onApprove = async(giftObject) => {
        try {
            const responseList = await approveGiftAPI(giftObject.giftID,giftObject.approvalID,loggedInEmail);
            setGiftApprovalList(responseList);
            SuccessToast("The gift has been approved successfully!");
            setApproveModalVisible(false);
        } catch (error) {
            FailureToast("Oops! Something went wrong.")
        }
    }

    const onRejectModalOpen = (rejectionObject) => {
        try {
            setGiftObject(rejectionObject);
            setRejectModalVisible(!rejectModalVisible);
        } catch (error) {
            FailureToast("Oops! Something went wrong.")
        }
    }

    const onReject = async(giftObject,rejectionReason) => {
        try {
            const responseList = await rejectGiftAPI(giftObject.giftID,rejectionReason,loggedInEmail);
            setGiftApprovalList(responseList);
            SuccessToast("The gift has been rejected successfully!");
            setRejectModalVisible(false);
        } catch (error) {
            FailureToast("Oops! Something went wrong.")
        }
    }



    /* IT WILL RENDER ONCE THE UI IS MOUNTING */
    if(isMount) {
        return <FullScreenLoader />
    };

    return(
        <ScrollView style={styles.rootElement}>
            {/* PAGE TITLE */}
            <View style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center",borderBottomColor: "rgba(0,0,0,0.5)",borderBottomWidth: "1px"}}>
                <Ionicons onPress={() => navigation.goBack(null)} style={{cursor: "pointer"}} name="arrow-back-circle-sharp" size={40} color="black" />
                <Text style={{fontWeight: "bold",textTransform: "uppercase",fontSize: "16px"}}>approval list - {loggedInEmail}</Text>
                <View />
            </View>
            {/* TABLE HEADER */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>form id</Text>
                <Text style={styles.headerCell}>vendor name</Text>
                <Text style={styles.headerCell}>gift value</Text>
                <Text style={styles.headerCell}>view form</Text>
                <Text style={styles.headerCell}>action</Text>
            </View>
            {/* TABLE BODY */}
            <View style={styles.tableBody}>
                {(giftApprovalList instanceof Array && giftApprovalList.length > 0) ?
                    giftApprovalList.map((approval) => {
                        return(
                            <View key={approval.approvalID} style={styles.tableBodyRow}>
                                <Text style={styles.bodyCell}>#GH-{approval.giftID}</Text>
                                <Text style={styles.bodyCell}>{approval.vendorName}</Text>
                                <Text style={styles.bodyCell}>
                                    <FontAwesome5 name="dollar-sign" size={15} color="black" style={{marginRight: "2px"}}  />
                                    {approval.giftAmount}
                                </Text>
                                <FontAwesome5 onPress={() => navigation.navigate("gift-and-hospitality-form",{giftID: approval.giftID,canEdit: false})} style={{...styles.bodyCell}} name="readme" size={30} color="blue" />
                                <View style={{...styles.bodyCell,flexDirection: "row",columnGap: "20px"}}>
                                    <View style={{flex: 1}}>
                                        <Button title="approve" touchSoundDisabled={false} onPress={() => onApproveModalOpen(approval)} />
                                    </View>

                                    <View style={{flex: 1}}>
                                        <Button title="reject" touchSoundDisabled={false} color="red" onPress={() => onRejectModalOpen(approval)} />
                                    </View>
                                </View>
                            </View>
                        )
                    }) : <Text style={{textAlign: "center",marginBottom: "10px"}}>no data available</Text>
                }
            </View>
            <GiftApproveModal  approveModalVisible={approveModalVisible} setApproveModalVisible={setApproveModalVisible} giftObject={giftObject} onApprove={onApprove} />
            <GiftRejectModal rejectModalVisible={rejectModalVisible} setRejectModalVisible={setRejectModalVisible} giftObject={giftObject} onReject={onReject} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootElement: {
        paddingTop: 5,
        paddingHorizontal: 20
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        marginTop: "20px",
        overflow: "scroll"
    },
    headerCell: {
        width: "50%",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "500",
        borderWidth: "2px",
        borderColor: "rgba(0,0,0,0.3)",
        marginHorizontal: "3px",
        padding: "5px",
        minWidth: "200px"
    },
    tableBody: {
        marginTop: "10px",
        overflow: "scroll"
    },
    tableBodyRow: {
        display: "flex",
        flexDirection: "row"
    },
    bodyCell: {
        width: "20%",
        textAlign: "center",
        fontWeight: "500",
        borderWidth: "1px",
        borderColor: "rgba(0,0,0,0.3)",
        marginHorizontal: "3px",
        marginTop: "3px",
        padding: "5px",
        minWidth: "200px",
        alignContent: 'center',
    },
    approverDetailsElement: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    approvalTextElement: {
        backgroundColor: "#000",
        color: "#FFF",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        alignSelf: "flex-end",
        marginBottom: "-10px",
        marginRight: "-10px",
        textAlign: "center",
        zIndex: 1
    }
});

export default GiftAndHospitalityApprovalTable;