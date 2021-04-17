import { serviceCommon } from "./serviceCommon";

const login = async (username: string, password: string) => {

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(serviceCommon.handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

const getUser = () => {
    return localStorage.getItem('user');
}

const getUserData = () => {
    const user = getUser()
    if(!user)
    {
        return null
    }
    return JSON.parse(user)
}

const getToken = () =>{
    return getUserData().token
}
export const userService = {
    login,
    getToken,
    getUser,
    getUserData
};


