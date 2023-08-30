import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = async (url: string) => {
    const [data, setData] = useState<string[]>();

    useEffect(() => {
        const fetchData = async () => {
            console.log(url);
            await axios
                .get(url)
                .then((response) => {
                    setData(response.data.meals);
                })
                .catch((error) => {
                    throw new Error("Error" + error);
                });
        };
        fetchData();
    }, [url]);

    return data;
};

export default useFetch;
