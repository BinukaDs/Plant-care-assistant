import { useEffect, useContext } from 'react'
import { UserContext } from '@/App';
import { useState } from 'react';


const Navbar = () => {
    const [isLoggedin, setisLoggedin] = useState(false)
    const BASE = useContext(UserContext);

    useEffect(() => {
        fetch(BASE + "/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token") 
            }
        }).then((res) => {
            return res.json()
        }).then(data => {
            data.isLoggedin === true ? setisLoggedin(true) : setisLoggedin(false);
        }).catch((error) => {
            console.error('Error:', error);
        })
    })

    function logOut() {
        localStorage.removeItem("token")
        setisLoggedin(false)
    }
  
    return (
        <nav>
            <div className='container'>
                <div className='nav-content flex justify-between text-center p-6'>
                    <div className='nav-logo'>
                        <a href='/'>Plant-Care</a>
                    </div>
                    <div className='nav-links flex justify-between gap-x-6'>
                        <a href='/'>Home</a>
                        <a href='/dashboard'>DashBoard</a>
                        {isLoggedin === true ? <a href='/signin' onClick={logOut}>Sign Out</a> : <a href='/signin'>Sign In</a>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar