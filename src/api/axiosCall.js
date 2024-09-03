import axios from "axios";
const serverURL = "your_server-url"

export const getRequest = async(path, params) => {
    try{
      const response = await axios.get(serverURL + path, {
          params: {payload: params},
        })
        return response.data;
    }catch(error){
      throw new Error(error?.response?.data?.error || error.message);
    }
  }

 export const postRequest = async(path, body) => {
    try {
      const response = await axios.post(serverURL + path,JSON.stringify(body), {
        headers: {"Content-Type": "application/json"},
      });
        return response.data;
    } catch(error) {
        throw new Error(error?.response?.data?.error || error.message);
    }
  }