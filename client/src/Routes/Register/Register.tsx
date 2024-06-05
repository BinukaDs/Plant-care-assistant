import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PuffLoader } from "react-spinners"
import { useAuthContext } from "../../hooks/useAuthContext"
const Register = (e) => {

    const [Values, setValues] = useState({ name: "", email: "", password: "", pwdRepeat: "" })
    const [isLoading, setisLoading] = useState(false);
    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate()

    async function RegisterUser() {
        console.log(Values)
        try {
            if (Values.password !== Values.pwdRepeat && Values.pwdRepeat !== '') {
                console.log('Passwords do not match')
                return
            }
            else if (Values.name === '' || Values.email === '' || Values.password === '' || Values.pwdRepeat === '') {
                console.log('Please fill in all fields')
                console.log(Values)
                return
            }

            try {
                setisLoading(true)
                const response = await fetch('http://localhost:3001/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Values)
                }).then((response) => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        setisLoading(false)
                        localStorage.setItem(
                            "user",
                            JSON.stringify({
                                name: data.name,
                                token: data.token,
                                email: data.email,
                            })
                        );
                        dispatch({ type: "LOGIN", payload: data });
                        console.log("email: ", data.name)
                        navigate("/signin")
                    }).catch((error) => {
                        console.error('Error:', error);
                    })

                // if (response.ok) {
                //     console.log('Values sent successfully');
                //     console.log(response)
                //     localStorage.setItem(
                //         "user",
                //         JSON.stringify({
                //             name: response.data.name,
                //             token: response.data.token,
                //             email: response.data.email,
                //         })
                //     );
                //     alert("user registered successfully");
                //     dispatch({ type: "LOGIN", payload: response.data });
                //     setisLoading(false)
                //     navigate("/signin")


                // } else if (!response.ok) {
                //     setisLoading(false)
                //     return response.text().then(error => {
                //         throw new Error(error);
                //     });
                // }
            } catch (error) {
                console.log("error in registering user: ", error)
            }


        } catch (err) {
            console.log(err)
        }


    }

    const handleChange = (e) => {
        setValues({ ...Values, [e.target.id]: e.target.value })
    }
    return (
        <main className='flex justify-center items-center'>
            <div>
                <h1 className='text-blue-600 font-bold text-xl text-center'>Register</h1>
                <div>
                    <form onSubmit={(e) => { RegisterUser(); e.preventDefault(); }} className='flex flex-col'>
                        <input type="text" name="name" id="name" maxLength={10} placeholder="Name" className='p-2 border rounded-md m-2' onChange={(e) => handleChange(e)}></input>
                        <input type="email" name="email" id="email" placeholder="Email" className='p-2 border rounded-md m-2' onChange={(e) => handleChange(e)}></input>
                        <input type="text" name="password" id="password" placeholder="Password" className='p-2 border rounded-md m-2' onChange={(e) => handleChange(e)} maxLength={12}></input>
                        <input type="password" name="pwdRepeat" id="pwdRepeat" placeholder="Repeat Password" className='p-2 border rounded-md m-2' onChange={(e) => handleChange(e)} maxLength={12}></input>
                        <button type="submit" className='bg-blue-500 text-white p-2 rounded-md mt-5 flex items-center justify-center'>{isLoading ? <PuffLoader color="#ffffff" size={25} /> : "Register"}</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Register
