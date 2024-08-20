import { getRequest } from "./axiosCall";

export const getGiftPendingApprovalCountAPI = async(email) => {
    try{
        let value = await getRequest('/gift/approval/get-gift-pending-approval-count',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getGiftApprovalAPI = async(email) => {
    try{
        let value = await getRequest('/gift/approval/get-gift-approval',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const approveGiftAPI = async(giftID,approvalID,approverEmail) => {
    try{
        let value = await getRequest('/gift/approval/approve-gift',{giftID,approvalID,approverEmail});
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}