import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View,StyleSheet, Button } from "react-native";
import {Ionicons,FontAwesome5} from "@expo/vector-icons";
import { getPendingApprovalByYouAPI,approveGiftAPI,rejectGiftAPI } from "../../../../../api/yourApprovalApi";
import { useIsFocused } from "@react-navigation/native";
import { FailureToast, SuccessToast } from "../../../../../components/Toast";
import { FullScreenLoader } from "../../../../../components/Loader";
import GiftApproveModal from "./GiftApproveModal";
import GiftRejectModal from "./GiftRejectModal";
import { DataTable } from "react-native-paper";
import { UserContext } from "../../../../../contexts/UserContext";
import { LottieGiftReject, LottieGiftSuccess } from "../../../../../components/lottie-web-animation/LottieWebAnimation";
import { BlurView } from "expo-blur";

const PendingApprovalByYou = ({navigation}) => {
    const isFocused = useIsFocused();
    const {userEMail} = useContext(UserContext);
    const [booleanState,setBooleanState] = useState({isApproving: false,isApproved: false,isRejecting: false,isRejected: false});
    const [giftApprovalList,setGiftApprovalList] = useState([]);
    const [isMount,setMount] = useState(true);
    const [approveModalVisible,setApproveModalVisible] = useState(false);
    const [rejectModalVisible,setRejectModalVisible] = useState(false);
    const [giftObject,setGiftObject] = useState({});
    const [page,setPage] = useState(0);
    const [itemsPerPage,setItemsPerPage] = useState(6);
    const fromCount = page * itemsPerPage;
    const toCount = Math.min((page + 1) * itemsPerPage,giftApprovalList.length);
 
    const loadDataOnInitialRender = async() => {
        try {
            const responseList = await getPendingApprovalByYouAPI(userEMail);
            if(responseList instanceof Array) {
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
            onUpdateBooleanState({isApproving: true});
            const responseList = await approveGiftAPI(giftObject.giftID,giftObject.approvalID,userEMail);
            onUpdateBooleanState({isApproved: true});
            setApproveModalVisible(false);
            setTimeout(() => {
                setGiftApprovalList(responseList);
                onUpdateBooleanState({isApproving: false,isApproved: false});
                SuccessToast("The gift has been approved successfully!");
            },8000);
        } catch (error) {
            onUpdateBooleanState({isApproving: false});
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
            onUpdateBooleanState({isRejecting: true});
            const responseList = await rejectGiftAPI(giftObject.giftID,rejectionReason,userEMail);
            onUpdateBooleanState({isRejected: true});
            setRejectModalVisible(false);
            setTimeout(() => {
                setGiftApprovalList(responseList);
                onUpdateBooleanState({isRejecting: false,isRejected: false});
                SuccessToast("The gift has been rejected successfully!");
            },8000);
        } catch (error) {
            onUpdateBooleanState({isRejecting: false});
            FailureToast("Oops! Something went wrong.")
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
            <ScrollView style={styles.rootElement}>
                {/* PAGE TITLE */}
                <View style={styles.topRowView}>
                    <Ionicons onPress={() => navigation.navigate("gift-and-hospitality-submission-tab")} style={{cursor: "pointer"}} name="arrow-back-circle-sharp" size={40} color="#FFF" />
                    <Text style={{textTransform: "capitalize",fontSize: "16px",fontWeight: "bold",color: "#000"}}>approval pending list</Text>
                <View />
                </View>
                <DataTable style={styles.dataTable}>
                    {/* TABLE HEADER */}
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title><Text style={styles.tableHeaderTitleContent}>form id</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableHeaderTitleContent}>vendor name</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableHeaderTitleContent}>gift value</Text></DataTable.Title>
                        <DataTable.Title><Text style={styles.tableHeaderTitleContent}>view form</Text></DataTable.Title>
                        <DataTable.Title style={{flex: 1.4}}><Text style={{...styles.tableHeaderTitleContent}}>action</Text></DataTable.Title>
                    </DataTable.Header>
                    {/* TABLE BODY */}
                    {(giftApprovalList instanceof Array && giftApprovalList.length > 0) ?
                        giftApprovalList.slice(fromCount,toCount).map((approval) => {
                            return(
                                <DataTable.Row key={approval.approvalID} style={styles.dataTableBody}>
                                    <DataTable.Cell>#GH-{approval.giftID}</DataTable.Cell>
                                    <DataTable.Cell>{approval.vendorName}</DataTable.Cell>
                                    <DataTable.Cell>
                                        <FontAwesome5 name="dollar-sign" size={15} color="black" style={{marginRight: "2px"}}  />
                                        {approval.giftAmount}
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <FontAwesome5 onPress={() => navigation.navigate("gift-and-hospitality-form",{giftID: approval.giftID,canEdit: false})} name="readme" size={30} color="blue" />
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{flex: 1.4}}>
                                        <View style={{flexDirection: "row",columnGap: "20px"}}>
                                            <View style={{minWidth: "120px"}}>
                                                <Button title="approve" touchSoundDisabled={false} onPress={() => onApproveModalOpen(approval)} />
                                            </View>

                                            <View style={{minWidth: "120px"}}>
                                                <Button title="reject" touchSoundDisabled={false} color="red" onPress={() => onRejectModalOpen(approval)} />
                                            </View>
                                        </View>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        }) : <Text style={{textAlign: "center",paddingVertical: "10px",textTransform: "capitalize",borderBottomColor: "rgba(0,0,0,0.3)",borderBottomWidth: 1}}>no data available</Text>
                    }
                    {/* TABLE PAGINATION */}
                    <DataTable.Pagination 
                        style={styles.pagination}
                        page={page}
                        numberOfPages={Math.ceil(giftApprovalList.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${fromCount + 1}-${toCount} of ${giftApprovalList.length}`}
                        showFastPaginationControls
                        optionsPerPage={[2, 3, 4]}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                    />
                </DataTable>
                <GiftApproveModal  approveModalVisible={approveModalVisible} setApproveModalVisible={setApproveModalVisible} giftObject={giftObject} onApprove={onApprove} isApproving={booleanState.isApproving} />
                <GiftRejectModal rejectModalVisible={rejectModalVisible} setRejectModalVisible={setRejectModalVisible} giftObject={giftObject} onReject={onReject} isRejecting={booleanState.isRejecting} />
            </ScrollView>
            {booleanState.isApproved && 
                <BlurView intensity={50} tint="systemThickMaterialLight" style={{width: "100%",height: "100%",position: "absolute"}}>
                    <LottieGiftSuccess style={{width: "20%",height: "50%",top: "20%",left: "40%"}} loop={true} />
                </BlurView>
            }
            {booleanState.isRejected && 
                <BlurView intensity={50} tint="systemThickMaterialLight" style={{width: "100%",height: "100%",position: "absolute"}}>
                    <LottieGiftReject style={{width: "20%",position: "absolute",top: "20%",left: "40%"}} loop={false} />
                </BlurView>
            }
        </>
    )
}

const styles = StyleSheet.create({
    rootElement: {
        paddingTop: 5,
        paddingHorizontal: 20
    },
    topRowView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#003eff",
        paddingHorizontal: "5px",
        paddingVertical: "10px"
    }, 
    dataTable: {
        marginTop: "10px",
        borderWidth: 1,
        borderTopColor: "rgba(0,0,0,1)",
        borderColor: "rgba(0,0,0,0.3)",
        backgroundColor: "#FAF9F6"
    },
    tableHeader: {
        borderBottomWidth: 5,
        borderColor: "rgba(0,0,0,0.3)"
    },
    tableHeaderTitleContent: {
        textTransform: "capitalize",
        color: "blue",
        fontWeight: "bold",
    },
    dataTableBody: {
        padding: "10px",
        borderBottomColor: "rgba(0,0,0,0.3)",
        borderBottomWidth: 1
    },
});

export default PendingApprovalByYou;