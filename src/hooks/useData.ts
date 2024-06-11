import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";



interface FetchResponse<T>{
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, desps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, SetError] = useState('');
    const [isLoading, setLoading] = useState(false);
    
    useEffect(()=>{
        const controller = new AbortController();
        setLoading(true);
        apiClient.get<FetchResponse<T>>(endpoint,{signal: controller.signal,...requestConfig})
        .then(res=>{
            setLoading(false);
            setData(res.data.results)
        })
        .catch(err => {
            if(err instanceof CanceledError) return;
            SetError(err.message);
            setLoading(false);
        });
        return () => controller.abort();
    }, desps ? [...desps] : [])

    return {data,error,isLoading};
};

export default useData;