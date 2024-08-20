import React, { useEffect, useState } from "react";
import { ScrollView, Text, View,StyleSheet } from "react-native";
import {Ionicons,FontAwesome5} from "@expo/vector-icons";
import { getGiftApprovedByYouAPI } from "../../../../../api/yourApprovalApi";
import { useIsFocused } from "@react-navigation/native";
import { FailureToast } from "../../../../../components/Toast";
import { FullScreenLoader } from "../../../../../components/Loader";

const GiftApprovedByYou = ({navigation}) => {
    const isFocused = useIsFocused();
    const loggedInEmail = localStorage.getItem("user-email")
    const [giftApprovedList,setGiftApprovedList] = useState([]);
    const [isMount,setMount] = useState(true);
 
    const loadDataOnInitialRender = async() => {
        try {
            const responseList = await getGiftApprovedByYouAPI(loggedInEmail);
            if(responseList instanceof Array && responseList.length > 0) {
                setGiftApprovedList(responseList);
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
                <Text style={{fontWeight: "bold",textTransform: "uppercase",fontSize: "16px"}}>gift's approved by you</Text>
                <View />
            </View>
            {/* TABLE HEADER */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>form id</Text>
                <Text style={styles.headerCell}>vendor name</Text>
                <Text style={styles.headerCell}>gift value</Text>
                <Text style={styles.headerCell}>view form</Text>
            </View>
            {/* TABLE BODY */}
            <View style={styles.tableBody}>
                {(giftApprovedList instanceof Array && giftApprovedList.length > 0) ?
                    giftApprovedList.map((approval) => {
                        return(
                            <View key={approval.approvalID} style={styles.tableBodyRow}>
                                <Text style={styles.bodyCell}>#GH-{approval.giftID}</Text>
                                <Text style={styles.bodyCell}>{approval.vendorName}</Text>
                                <Text style={styles.bodyCell}>
                                    <FontAwesome5 name="dollar-sign" size={15} color="black" style={{marginRight: "2px"}}  />
                                    {approval.giftAmount}
                                </Text>
                                <FontAwesome5 onPress={() => navigation.navigate("gift-and-hospitality-form",{giftID: approval.giftID,canEdit: false})} style={{...styles.bodyCell}} name="readme" size={30} color="blue" />
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
        width: "25%",
        textAlign: "center",
        fontWeight: "500",
        borderWidth: "1px",
        borderColor: "rgba(0,0,0,0.3)",
        marginHorizontal: "3px",
        marginTop: "3px",
        padding: "5px",
        minWidth: "200px",
        alignContent: 'center',
    }
});

export default GiftApprovedByYou;