import { getRequest, postRequest } from "./axiosCall";

export const getGiftCategoryAPI = async(giftObject) => {
    try{
        let value = await getRequest('/gift/get-gift-category',giftObject);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const createGiftAPI = async(giftObject) => {
    try{
        let value = await postRequest('/gift/create-gift',giftObject);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getGiftSubmissionAPI = async(email) => {
    try{
        let value = await getRequest('/gift/get-gift-submission',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getGiftSubmissionByIDAPI = async(giftID) => {
    try{
        let value = await getRequest('/gift/get-gift-by-id',giftID);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getGiftPendingApprovalCountAPI = async(email) => {
    try{
        let value = await getRequest('/gift/get-gift-pending-approval-count',email);
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
        let value = await getRequest('/gift/get-gift-approval',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}