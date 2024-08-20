import { getRequest, postRequest } from "./axiosCall";

export const getGiftCategoryAPI = async(giftObject) => {
    try{
        let value = await getRequest('/gift/submission/get-gift-category',giftObject);
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
        let value = await postRequest('/gift/submission/create-gift',giftObject);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getYourSubmissionAPI = async(email) => {
    try{
        let value = await getRequest('/gift/submission/get-your-gift-submission',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getYourApprovedSubmissionAPI = async(email) => {
    try{
        let value = await getRequest('/gift/submission/get-your-approved-gift-submission',email);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getYourRejectedSubmissionAPI = async(email) => {
    try{
        let value = await getRequest('/gift/submission/get-your-rejected-gift-submission',email);
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
        let value = await getRequest('/gift/submission/get-gift-by-id',giftID);
        if(value.success === true) {
            return value.value;
        } else {
            throw new Error("Something went wrong!. Please contact admin");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}