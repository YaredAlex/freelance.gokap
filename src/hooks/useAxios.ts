import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react"
import { base_url } from "../util/api";
import useRefreshToken from "./use_refreshtoken";
import secureLocalStorage from "react-secure-storage";
import customToast from "../components/custom_toast/custom_toast";
import { GTexts } from "../util/string_constants";

type UseAxiosTypes = {
    url:string,
    method:string,
    headers:boolean,
}

axios.defaults.baseURL = base_url;
export const useAxios = (props:UseAxiosTypes)=>{
     
     const [loading,setLoading] = useState(false);
     const [response,setResponse] = useState<AxiosResponse|null>(null);
    const [apiError,setApiError] = useState<string | null>(null)
    const [url,setUrl] = useState(props.url)
    const useRefresh = useRefreshToken()
    function sendRequest<T>(data:T,onSuccess:(res:AxiosResponse)=>void,onError:(error:AxiosError)=>void,requestRefresh:boolean = true){
        const token = secureLocalStorage.getItem("token") || ""
        setLoading(true)
        axios({
            method:props.method,
            url,
            
            headers:props.headers ? {'Content-Type':"application/json",'Authorization':`Bearer ${token}`}: undefined
            ,
           data
         }).then(res=>{
            setResponse(res.data)
            onSuccess(res)
         }
            
         ).catch(async e=>{
            setApiError(e)
            if (e.response?.status == 401 && requestRefresh) {
                //if get new token if there is refresh token
                 useRefresh.getToken(()=>{
                  sendRequest(data,onSuccess,onError,false);
                });
                return;
              }
              if (e.message === "Network Error") {
                customToast({message: GTexts.txt_check_connection,type:"error"});
                return;
              }
            else
            onError(e)
            //refreshRef.current = true;
           
         })
         .finally(()=>
            setLoading(false)
         )
    }
    return {
        loading,
        response,
        apiError,
        sendRequest,
        setUrl
    } 

}