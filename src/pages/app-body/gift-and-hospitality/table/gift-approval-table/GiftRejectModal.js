import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { Controller } from "react-hook-form";

const GiftRejectModal = ({rejectModalVisible,setRejectModalVisible,giftObject,onReject,isRejecting}) => {
    const [rejectionReason,setRejectionReason] = useState("");
    return(
        <Modal visible={rejectModalVisible} animationType="slide" transparent={true}>
            <View style={styles.viewRootElement}>
                <View style={styles.viewModalContent}>
                    <View style={{flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                        <Text style={styles.headerText}>reject gift : #GH-{giftObject.giftID} </Text>
                        <Ionicons onPress={() => setRejectModalVisible(false)} style={{cursor: "pointer"}} name="close-circle" size={30} color="black" />
                    </View>
                    <Text style={{marginTop: "10px",color: "rgba(0,0,0,0.55)",fontSize: "12px",fontWeight: "bold"}}>
                        Are you sure you want to reject this gift? Once rejected, this action cannot be undone. Please review the details carefully before proceeding.                    
                    </Text>
                    {/* DESCRIPTION BOX */}
                    <View style={{marginTop: 20}}>
                        <Text style={{fontSize: "16px",fontWeight: "600",textTransform: "capitalize"}}>rejection reason</Text>
                        <TextInput multiline={true} numberOfLines={4} style={{width: "100%",height: 100,marginTop: 8,borderColor: "rgba(0,0,0,0.2)",borderWidth: 2,borderRadius: "5px",paddingHorizontal: 10,paddingVertical: 3}} placeholder="Enter rejection reason" onChangeText={(value) => setRejectionReason(value)} value={rejectionReason}  />
                    </View>
                    <View style={{flexDirection: "row",justifyContent: "flex-end",columnGap: "20px",marginTop: "20px"}}>
                        <View style={{width: "100px",pointerEvents: `${isRejecting ? "none" : "auto"}`}}>
                            <Button title="reject" touchSoundDisabled={false} color={isRejecting ? "gray" : "red"} onPress={() => onReject(giftObject,rejectionReason)} />
                        </View>

                        <View style={{width: "100px"}}>
                            <Button title="cancel" touchSoundDisabled={false} color="black" onPress={() => setRejectModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    viewRootElement: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",  
        blurRadius: 0.2
    },
    viewModalContent: {
        width: "30%",
        padding: "10px",
        backgroundColor: "rgba(0,0,0,0.15)",
        borderRadius: "5px",
        shadowColor: '#000',
        shadowOffset: {
        width: 4,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    headerText: {
        textTransform: "uppercase",
        fontWeight: "bold"
    }
});

export default GiftRejectModal;