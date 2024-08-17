import React, { useEffect, useState } from "react";
import { ScrollView, Text, View,StyleSheet, Button } from "react-native";
import {Ionicons,FontAwesome5,MaterialIcons} from "@expo/vector-icons";
import {getGiftSubmissionAPI} from "../../../../api/giftApi";
import { useIsFocused } from "@react-navigation/native";

const GiftAndHospitalityTable = ({navigation}) => {
    const isFocused = useIsFocused();
    const [giftSubmissionList,setGiftSubmissionList] = useState([]);

    const loadDataOnInitialRender = async() => {
        try {
            const responseList = await getGiftSubmissionAPI();
            if(responseList instanceof Array && responseList.length > 0) {
                setGiftSubmissionList(responseList);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if(isFocused) {
            loadDataOnInitialRender();
        }
    },[isFocused]);

    return(
        <ScrollView style={styles.rootElement}>
            {/* PAGE TITLE */}
            <View style={{display: "flex",flexDirection: "row",justifyContent: "space-between",alignItems: "center",borderBottomColor: "rgba(0,0,0,0.5)",borderBottomWidth: "1px"}}>
                <Ionicons onPress={() => navigation.goBack(null)} style={{cursor: "pointer"}} name="arrow-back-circle-sharp" size={40} color="black" />
                <Text style={{fontWeight: "bold",textTransform: "uppercase",fontSize: "16px"}}>submission list</Text>
                <View style={{width: "100px",marginVertical: 20}}>   
                    <Button onPress={() => navigation.navigate("gift-and-hospitality-form",{giftID: null,canEdit: true})} title="ADD" touchSoundDisabled={false} />
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
                {
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
                    })
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
    }
});

export default GiftAndHospitalityTable;