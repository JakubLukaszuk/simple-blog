import React from 'react'
import { useSelector } from 'react-redux'
import { loginUser, logout } from '../../slices/userSlice'
import { RootState, useAppDispatch } from '../../store'
import { BaseButton } from '../UI/BaseButton/BaseButton'
import './Header.css'

const Header = () => {
    const {isLoggedIn} = useSelector((state:RootState) => state.user);
    const dispatch = useAppDispatch();

    return (
        <header className="Header">
            <h1 className="Header Header__text">Simple Blog</h1>
            <nav className="Header Header__navigaiton">
                <BaseButton onClick={isLoggedIn? ()=> dispatch(logout()): ()=>dispatch(loginUser({username:"user", password: "123"}))}>{isLoggedIn? "Logout": "Login"}</BaseButton>
            </nav>
        </header>
    )
}

export default Header
