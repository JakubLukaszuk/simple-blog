const handleResponse = (response: any) =>{
        if (response.statusCode !== 200) {
            if (response.status === 401) {
                console.log("unauthorized");
            }
        }
        return response.data;
}

export const serviceCommon = {
    handleResponse,
};