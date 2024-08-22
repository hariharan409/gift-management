import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View,StyleSheet } from "react-native";
import {Ionicons,FontAwesome5} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { FailureToast } from "../../../../../components/Toast";
import { FullScreenLoader } from "../../../../../components/Loader";
import { getYourApprovedSubmissionAPI } from "../../../../../api/yourSubmissionApi";
import { DataTable } from "react-native-paper";
import FadeInOutText from "../../../../../components/animation/FadeInOutText";
import { UserContext } from "../../../../../contexts/UserContext";

const YourApprovedSubmission = ({navigation}) => {
    const isFocused = useIsFocused();
    const {userEMail} = useContext(UserContext);
    const [approvedGiftSubmissionList,setApprovedGiftSubmissionList] = useState([]);
    const [isMount,setMount] = useState(true);
    const [page,setPage] = useState(0);
    const [itemsPerPage,setItemsPerPage] = useState(6);
    const fromCount = page * itemsPerPage;
    const toCount = Math.min((page + 1) * itemsPerPage,approvedGiftSubmissionList.length);
 
    const loadDataOnInitialRender = async() => {
        try {
            const responseList = await getYourApprovedSubmissionAPI(userEMail);
            if(responseList instanceof Array) {
                setApprovedGiftSubmissionList(responseList);
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
            <View style={styles.topRowView}>
                <Ionicons onPress={() => navigation.goBack(null)} style={{cursor: "pointer"}} name="arrow-back-circle-sharp" size={40} color="#FFF" />
                <FadeInOutText text="your approved gift submission list" />
                <View />
            </View>
            {/* TABLE HEADER */}
            <DataTable style={styles.dataTable}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>form id</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>gift value</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>vendor name</Text></DataTable.Title>
                    <DataTable.Title><Text style={styles.tableHeaderTitleContent}>view form</Text></DataTable.Title>
                </DataTable.Header>
                {/* TABLE BODY */}
                {(approvedGiftSubmissionList instanceof Array && approvedGiftSubmissionList.length > 0) ?
                    approvedGiftSubmissionList.slice(fromCount,toCount).map((approved) => {
                        return(
                            <DataTable.Row key={approved.id} style={styles.dataTableBody}>
                                <DataTable.Cell>#GH-{approved.id}</DataTable.Cell>
                                <DataTable.Cell>
                                    <FontAwesome5 name="dollar-sign" size={15} color="black" style={{marginRight: "2px"}}  />
                                    {approved.giftValue}
                                </DataTable.Cell>
                                <DataTable.Cell>{approved.vendor}</DataTable.Cell>
                                <DataTable.Cell>
                                    <FontAwesome5 onPress={() => navigation.navigate("gift-and-hospitality-form",{giftID: approved.id,canEdit: false})} name="readme" size={30} color="blue" />
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    }) : <Text style={{textAlign: "center",paddingVertical: "10px",textTransform: "capitalize",borderBottomColor: "rgba(0,0,0,0.3)",borderBottomWidth: 1}}>no data available</Text>
                }
                {/* TABLE PAGINATION */}
                <DataTable.Pagination 
                    style={styles.pagination}
                    page={page}
                    numberOfPages={Math.ceil(approvedGiftSubmissionList.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${fromCount + 1}-${toCount} of ${approvedGiftSubmissionList.length}`}
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
        fontWeight: "bold"
    },
    dataTableBody: {
        padding: "10px",
        borderBottomColor: "rgba(0,0,0,0.3)",
        borderBottomWidth: 1
    },
});

export default YourApprovedSubmission;