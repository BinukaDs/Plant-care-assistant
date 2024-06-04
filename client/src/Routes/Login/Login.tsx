import { useState } from "react"
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [Values, setValues] = useState({ email: "", password: "" })
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault();
        console.log(Values)

        const response = await fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Values)
        })

        if (response.ok) {
            console.log('Values sent successfully');
            console.log(response)
            setisLoading(false)
           


        } else if (!response.ok) {
            setisLoading(false)
            return response.text().then(error => {
                throw new Error(error);
            });
        }
    }
    const handleChange = (e) => {
        setValues({ ...Values, [e.target.id]: e.target.value })

    }
    return (
        <main className='flex justify-center items-center'>
            <div>
                <h1 className='text-blue-600 font-bold text-xl text-center'>Sign-In</h1>
                <div>
                    <form onSubmit={(e) => { onSubmit(e) }} className='flex flex-col'>
                        <input type="text" name="email" id="email" placeholder="Email" className='p-2 border rounded-md m-2' onChange={(e) => { handleChange(e) }}></input>
                        <input type="password" name="password" id="password" placeholder="Password" className='p-2 border rounded-md m-2' onChange={(e) => { handleChange(e) }} maxLength={12}></input>
                        <button type="submit" className='bg-blue-500 text-white p-2 rounded-md mt-5'>Sign In</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login