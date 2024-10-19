/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { logout } from '../../store/authSlice';
import { useNavigate } from "react-router-dom";
import {Button} from '../index'
import authService from '../../appwrite/authentication';

export default function LogoutBtn({ onLogout }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
                if (onLogout) onLogout(); // Call the onLogout prop
                navigate("/")
            });
    };

    return (
        <Button
            className="inline-block duration-200 bg-red-500 hover:bg-[#c25c56]"
            paddingX={2}
            paddingY={1}
            bgColor="red"
            fontSize={'0.9rem'}
            onClick={logoutHandler}
        >
            LOGOUT
        </Button>
    );
}