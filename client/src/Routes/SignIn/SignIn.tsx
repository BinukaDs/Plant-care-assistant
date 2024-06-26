import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners"


const SignIn = () => {
  const navigate = useNavigate()
  const [Values, setValues] = useState({ email: "", password: "" })
  const [isLoading, setisLoading] = useState(false);

  async function onSubmit(e) {

    e.preventDefault();
    // console.log(Values)

    fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Values)
    }).then((response) => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        });
      }
      return response.json()

    }).then(data => {
      // console.log('Success:', data);
      console.log("Logged In!")
      setisLoading(false)
      localStorage.setItem(
        "token", data.token
      );

    }).catch((error) => {
      console.error('Error:', error);
    })


  }


  fetch("http://localhost:3001/isUserAuth", {
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  }).then((res) => {
    return res.json()
  }).then(data => data.isLoggedin === true ? navigate('/dashboard') : null)
    .catch((error) => {
      console.error('Error:', error);
    })



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
            <button type="submit" className='bg-blue-500 text-white p-2 rounded-md mt-5'>{isLoading ? <PuffLoader color="#ffffff" size={25} /> : "Sign In"}</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default SignIn