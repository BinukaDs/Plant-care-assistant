import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { user, dispatch } = useAuthContext();

    const LogOut = () => {
        // remove user from storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
        navigate("/signin");
    };
    return (
        <div>
            <button className='bg-blue-500 text-white p-2 rounded-md mt-5' onClick={LogOut}>LogOut</button>
        </div>
    )
}

export default Home