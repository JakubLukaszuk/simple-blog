import React from 'react'
import { useSelector } from 'react-redux'
import { loginUser, logout } from '../../slices/userSlice'
import { RootState, useAppDispatch } from '../../store'
import { BaseButton } from '../UI/BaseButton/BaseButton'

const Header = () => {
    const {isLoggedIn} = useSelector((state:RootState) => state.user);
    const dispatch = useAppDispatch();

    return (
        <header>
            <h1>Simple Blog</h1>
            <nav>
                <BaseButton onClick={isLoggedIn? ()=> dispatch(logout()): ()=>dispatch(loginUser({username:"user", password: "123"}))}>{isLoggedIn? "Logout": "Login"}</BaseButton>
            </nav>
        </header>
    )
}

export default Header
