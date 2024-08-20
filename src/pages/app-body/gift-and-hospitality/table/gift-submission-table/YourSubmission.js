import React, { useEffect, useState } from "react";
import { ScrollView, Text, View,StyleSheet, Button } from "react-native";
import {Ionicons,FontAwesome5,MaterialIcons} from "@expo/vector-icons";
import { getYourPendingApprovalCountAPI } from "../../../../../api/yourApprovalApi";
import { getYourSubmissionAPI } from "../../../../../api/yourSubmissionApi";
import { useIsFocused } from "@react-navigation/native";
import { FailureToast } from "../../../../../components/Toast";
import { FullScreenLoader } from "../../../../../components/Loader";

const YourSubmission = ({navigation}) => {
    const isFocused = useIsFocused();
    const loggedInEmail = localStorage.getItem("user-email")
    const [giftSubmissionList,setGiftSubmissionList] = useState([]);
    const [isMount,setMount] = useState(true);
    const [approvalCount,setApprovalCount] = useState(0);

    const loadDataOnInitialRender = async() => {
        try {
            const responseList = await getYourSubmissionAPI(loggedInEmail);
            if(responseList instanceof Array && responseList.length > 0) {
                setGiftSubmissionList(responseList);
            }
            const pendingApprovalCount = await getYourPendingApprovalCountAPI(loggedInEmail);
            if(pendingApprovalCount > 0) {
                setApprovalCount(pendingApprovalCount);
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

    /* IT WILL RENDER ONCE THE UI IS MOUNTING */
    if(isMount) {
        return <FullScreenLoader />
    };

    return(
        <ScrollView style={styles.rootElement}>
            {/* PAGE TITLE */}
            <View style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center",borderBottomColor: "rgba(0,0,0,0.5)",borderBottomWidth: "1px"}}>
                <Ionicons onPress={() => navigation.goBack(null)} style={{cursor: "pointer"}} name="arrow-back-circle-sharp" size={40} color="black" />
                <Text style={{fontWeight: "bold",textTransform: "uppercase",fontSize: "16px"}}>your gift submission list</Text>
                <View style={{width: "150px",marginVertical: 20,display: "flex",flexDirection: "row",columnGap: "20px",justifyContent: "flex-end"}}> 
                    <View>
                        <Text style={styles.approvalTextElement}>{approvalCount}</Text>
                        <Button onPress={() => navigation.navigate("gift-and-hospitality-approval-tab",{giftID: null,canEdit: true})} title="approve" touchSoundDisabled={false} />
                    </View>
                    <View style={{justifyContent: "flex-end"}}>
                        <Button onPress={() => navigation.navigate("gift-and-hospitality-form",{giftID: null,canEdit: true})} title="add" touchSoundDisabled={false} />
                    </View>
                </View>
            </View>
            {/* TABLE HEADER */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>form id</Text>
                <Text style={styles.headerCell}>vendor name</Text>
                <Text style={styles.headerCell}>gift value</Text>
                <Text style={styles.headerCell}>approval details</Text>
                <Text style={styles.headerCell}>action</Text>
            </View>
            {/* TABLE BODY */}
            <View style={styles.tableBody}>
                {(giftSubmissionList instanceof Array && giftSubmissionList.length > 0) ?
                    giftSubmissionList.map((submission) => {
                        return(
                            <View key={submission.id} style={styles.tableBodyRow}>
                                <Text style={styles.bodyCell}>#GH-{submission.id}</Text>
                                <Text style={styles.bodyCell}>{submission.vendorName}</Text>
                                <Text style={styles.bodyCell}>
                                    <FontAwesome5 name="dollar-sign" size={15} color="black" style={{marginRight: "2px"}}  />
                                    {submission.giftAmount}
                                </Text>
                                <View style={styles.bodyCell}>
                                    {
                                        submission?.approvalList.map((approval) => {
                                            return(
                                                <View key={approval.id} style={styles.approverDetailsElement}>
                                                    <Text style={{...styles.bodyCell,width: "70%",minWidth: "150px"}}>{approval.approverEmail}</Text>
                                                    <MaterialIcons name= {approval.isApproved && "verified-user"} size={30} color={approval.isApproved && "green"} />
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <FontAwesome5 onPress={() => navigation.navigate("gift-and-hospitality-form",{giftID: submission.id,canEdit: submission.isEdit})} style={{...styles.bodyCell}} name= {submission.isEdit ? "edit" : "readme"} size={30} color="blue" />
                            </View>
                        )
                    }) : <Text style={{textAlign: "center",marginBottom: "10px"}}>no data available</Text>
                }
            </View>
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

export default YourSubmission;