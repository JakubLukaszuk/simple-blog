import { IError } from "../slices/common";

const handleResponse = (response: any) =>{
        if (response.statusCode !== 200 ) {
            if (!response.error || !response.data) {
                const enchancedError: IError = {
                    statusCode: response.statusCode? response.statusCode : 0,
                    error: "Unknown Error"
                }
                throw enchancedError
            }
            throw response.error
        }
        return response.data;
}

export const serviceCommon = {
    handleResponse,
};