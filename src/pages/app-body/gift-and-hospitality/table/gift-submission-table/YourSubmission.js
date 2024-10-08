import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, Button } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { DataTable, Tooltip } from "react-native-paper";
import { getYourPendingApprovalCountAPI } from "../../../../../api/yourApprovalApi";
import { getYourSubmissionAPI } from "../../../../../api/yourSubmissionApi";
import { useIsFocused } from "@react-navigation/native";
import { FailureToast } from "../../../../../components/Toast";
import { FullScreenLoader } from "../../../../../components/Loader";
import { UserContext } from "../../../../../contexts/UserContext";

const YourSubmission = ({ navigation }) => {
    const isFocused = useIsFocused();
    const {userEMail} = useContext(UserContext);
    const [giftSubmissionList, setGiftSubmissionList] = useState([]);
    const [isMount, setMount] = useState(true);
    const [approvalCount, setApprovalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const fromCount = page * itemsPerPage;
    const toCount = Math.min((page + 1) * itemsPerPage, giftSubmissionList.length);

    const loadDataOnInitialRender = async () => {
        try {
            const responseList = await getYourSubmissionAPI(userEMail);
            if (responseList instanceof Array) {
                setGiftSubmissionList(responseList);
            }
            const pendingApprovalCount = await getYourPendingApprovalCountAPI(userEMail);
            setApprovalCount(pendingApprovalCount);
        } catch (error) {
            FailureToast("Oops! Something went wrong.")
        } finally {
            setMount(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadDataOnInitialRender();
        }
    }, [isFocused]);

    /* IT WILL RENDER ONCE THE UI IS MOUNTING */
    if (isMount) {
        return <FullScreenLoader />
    };

    return (
        <ScrollView style={styles.rootElement}>
            {/* PAGE TITLE */}
            <View style={styles.topRowView}>
                <Ionicons onPress={() => navigation.goBack(null)} style={{ cursor: "pointer" }} name="arrow-back-circle-sharp" size={40} color="#FFF" />
                <Text style={{textTransform: "capitalize",fontSize: "16px",fontWeight: "bold",color: "#000"}}>your gift submission list</Text>
                <View style={{ width: "150px", marginVertical: 20, display: "flex", flexDirection: "row", columnGap: "20px", justifyContent: "flex-end" }}>
                    <View>
                        <Text style={styles.approvalTextElement}>{approvalCount}</Text>
                        <Button onPress={() => navigation.navigate("gift-and-hospitality-approval-tab", { giftID: null, canEdit: true })} title="approve" touchSoundDisabled={false} />
                    </View>
                    <View style={{ justifyContent: "flex-end" }}>
                        <Button onPress={() => navigation.navigate("gift-and-hospitality-form", { giftID: null, canEdit: true })} title="new submission" touchSoundDisabled={false} />
                    </View>
                </View>
            </View>
            <DataTable style={styles.dataTable}>
                {/* TABLE HEADER */}
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>form id</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>vendor name</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>gift value</Text></DataTable.Title>
                    <DataTable.Title style={{ flex: 2 }}><Text style={{ ...styles.tableHeaderTitleContent }}>approval details</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>action</Text></DataTable.Title>
                </DataTable.Header>
                {/* TABLE BODY */}
                {(giftSubmissionList instanceof Array && giftSubmissionList.length > 0) ?
                    giftSubmissionList.slice(fromCount, toCount).map((submission) => {
                        return (
                            <DataTable.Row key={submission.id} style={styles.dataTableBody}>
                                <DataTable.Cell>#GH-{submission.id}</DataTable.Cell>
                                <DataTable.Cell>{submission.vendorName}</DataTable.Cell>
                                <DataTable.Cell>
                                    <FontAwesome5 name="dollar-sign" size={15} color="black" style={{ marginRight: "2px" }} />
                                    {submission.giftAmount}
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 2 }}>
                                    {
                                        submission?.approvalList.map((approval) => {
                                            return (
                                                <View key={approval.id} style={styles.approverDetailsElement}>
                                                    <Text style={{ ...styles.approverDetailsElementText, width: "100%" }}>{approval.approverEmail}</Text>
                                                    {approval.canApprove ?
                                                        <Tooltip title="pending-approval">
                                                            <MaterialIcons name="pending-actions" size={25} color="orange" />
                                                        </Tooltip> :
                                                        null}
                                                    <Tooltip title="approved">
                                                        <MaterialIcons name={approval.isApproved && "verified-user"} size={25} color={approval.isApproved && "green"} />
                                                    </Tooltip>
                                                </View>
                                            )
                                        })
                                    }
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <FontAwesome5 onPress={() => navigation.navigate("gift-and-hospitality-form", { giftID: submission.id, canEdit: submission.isEdit })} name={submission.isEdit ? "edit" : "readme"} size={30} color="blue" />
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    }) : <Text style={{ textAlign: "center", paddingVertical: "10px", textTransform: "capitalize", borderBottomColor: "rgba(0,0,0,0.3)" }}>no data available</Text>
                }
                {/* TABLE PAGINATION */}
                <DataTable.Pagination
                    style={styles.pagination}
                    page={page}
                    numberOfPages={Math.ceil(giftSubmissionList.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${fromCount + 1}-${toCount} of ${giftSubmissionList.length}`}
                    showFastPaginationControls
                    optionsPerPage={[2, 3, 4]}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />
            </DataTable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootElement: {
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    topRowView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#003eff",
        paddingHorizontal: "5px"
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
        fontWeight: "bold"
    },
    dataTableBody: {
        padding: "10px",
        borderBottomColor: "rgba(0,0,0,0.3)",
        borderBottomWidth: 1
    },
    approverDetailsElement: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    approverDetailsElementText: {
        textAlign: "center",
        fontWeight: "500",
        borderWidth: "1px",
        borderColor: "rgba(0,0,0,0.3)",
        marginHorizontal: "3px",
        marginTop: "3px",
        padding: "5px",
        minWidth: "250px",
        alignContent: 'center',
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
    },
    pagination: {
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.3)"
    }
});

export default YourSubmission;