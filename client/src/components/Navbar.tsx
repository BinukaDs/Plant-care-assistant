import React, { useEffect } from 'react'
import { useState } from 'react';


const Navbar = () => {
    const [isLoggedin, setisLoggedin] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json()
        }).then(data => data.isLoggedin === true ? setisLoggedin(true) : setisLoggedin(false))
            .catch((error) => {
                console.error('Error:', error);
            })

    },[isLoggedin])

    function logOut() {
        localStorage.removeItem("token")
        setisLoggedin(false)
    }
    return (
        <nav>
            <div className='container'>
                <div className='nav-content flex justify-between text-center '>
                    <div className='nav-logo'>
                        <a href='/'>Plant-Care</a>
                    </div>
                    <div className='nav-links flex justify-between gap-x-6'>
                        <a href='/'>Home</a>
                        {isLoggedin === true ? <a href='/signin' onClick={logOut}>Sign Out</a> : <a href='/signin'>Sign In</a>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar