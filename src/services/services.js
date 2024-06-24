import axios from "axios";
export const httpRequest = async (method, endpoint, data = null, headers = {}) => {
    try {
        const url = `${process.env.REACT_APP_LOCAL_BASE_URL}/${endpoint}`;
        const response = await axios({
          method,
          url,
          data,
          headers,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const getlocalStorage = async (key) =>{
 const data = JSON.parse(localStorage.getItem(key));
 return data;
}