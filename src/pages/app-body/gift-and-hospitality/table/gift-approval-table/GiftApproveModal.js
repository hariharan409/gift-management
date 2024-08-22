import React from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

const GiftApproveModal = ({approveModalVisible,setApproveModalVisible,giftObject,onApprove,isApproving}) => {

    return(
        <Modal visible={approveModalVisible} animationType="slide" transparent={true}>
            <View style={styles.viewRootElement}>
                <View style={styles.viewModalContent}>
                    <View style={{flexDirection: "row",justifyContent: "space-between",alignItems: "center"}}>
                        <Text style={styles.headerText}>approve gift : #GH-{giftObject.giftID} </Text>
                        <Ionicons onPress={() => setApproveModalVisible(false)} style={{cursor: "pointer"}} name="close-circle" size={30} color="black" />
                    </View>
                    <Text style={{marginTop: "10px",color: "rgba(0,0,0,0.55)",fontSize: "12px",fontWeight: "bold"}}>
                        Are you sure you want to approve this gift? Once approved, this action cannot be undone. Please review the details carefully before proceeding.
                    </Text>
                    <View style={{flexDirection: "row",justifyContent: "flex-end",columnGap: "20px",marginTop: "20px"}}>
                        <View style={{width: "100px",pointerEvents: `${isApproving ? "none" : "auto"}`}}>
                            <Button title="approve" touchSoundDisabled={false} onPress={() => onApprove(giftObject)} color={(isApproving) && "gray"} />
                        </View>

                        <View style={{width: "100px"}}>
                            <Button title="cancel" touchSoundDisabled={false} color="black" onPress={() => setApproveModalVisible(false)} />
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

export default GiftApproveModal;