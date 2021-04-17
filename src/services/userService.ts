import { serviceCommon } from "./serviceCommon";

export interface ILogin {
    username: string
    password: string
}

export interface IUser{
    id: string,
    username: string,
    token: string
}

const login = async (loginData: ILogin) => {
    const {username,password} = loginData
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/users/authenticate`, requestOptions)
        .then(serviceCommon.handleResponse)
        .then((user: IUser) => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

const logout = () => {
    localStorage.removeItem('user');
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
    getUserData,
    logout
};



