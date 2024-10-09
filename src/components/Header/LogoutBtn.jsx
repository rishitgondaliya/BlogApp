/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { logout } from '../../store/authSlice';
import authService from '../../appwrite/authentication';

export default function LogoutBtn({ onLogout }) {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
                if (onLogout) onLogout(); // Call the onLogout prop
            });
    };

    return (
        <button
            className="inline-block text-base px-6 py-2 duration-200 bg-red-500 hover:bg-[#f9928d] rounded"
            onClick={logoutHandler}
        >
            LOGOUT
        </button>
    );
}