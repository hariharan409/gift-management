import { getRequest } from "./axiosCall";

export const getYourPendingApprovalCountAPI = async(email) => {
    try{
        let value = await getRequest('/gift/approval/get-your-pending-approval-count',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getPendingApprovalByYouAPI = async(email) => {
    try{
        let value = await getRequest('/gift/approval/get-pending-approval-by-you',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getGiftApprovedByYouAPI = async(email) => {
    try{
        let value = await getRequest('/gift/approval/get-gift-approved-by-you',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getGiftRejectedByYouAPI = async(email) => {
    try{
        let value = await getRequest('/gift/approval/get-gift-rejected-by-you',email);
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

export const rejectGiftAPI = async(giftID,rejectionReason,rejecterEmail) => {
    try{
        let value = await getRequest('/gift/approval/reject-gift',{giftID,rejectionReason,rejecterEmail});
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}