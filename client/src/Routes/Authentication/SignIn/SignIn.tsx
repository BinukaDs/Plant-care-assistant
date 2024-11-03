import { useEffect, useState, useContext } from "react"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/App";
import { Input } from "@/components/ui/input";
import FadeIn from "../../../components/transitions/FadeIn"
import { Button } from "@/components/ui/button"
import { FetchAuthentication } from "@/services/Authentication.service";
import { FetchSignIn } from "@/services/Authentication.service";
import { responseDataTypes } from "@/types/Plant";
import Cookies from "universal-cookie";
import { tailspin } from 'ldrs'
tailspin.register()

const SignIn = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const BASE = useContext(UserContext);
  const [Values, setValues] = useState({ email: "", password: "" })
  const [UserId, setUserId] = useState("")
  const [isLoading, setisLoading] = useState(false);

  const loadAuthentication = async () => {
    try {
      const data = await FetchAuthentication(BASE, cookies.get("token"));
      if (data.id) {
        setUserId(data.id);
        data.isLoggedin === true ? navigate('/dashboard') : null
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const applyDemoCredentials = () => {
    setValues({ email: "plantly@gmail.com", password: "123" })
  }

  const loadFetchSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!Values.email || !Values.password) {
      return toast.error("Please fill in all fields!")
    } else if (typeof Values.email != "string" || typeof Values.password != "string") {
      return toast.error("Please enter the values in correct type!")
    } else {
      try {
        setisLoading(true)
        const response: responseDataTypes = await FetchSignIn(BASE, Values)
        // console.log("response:", response)
        if (response.status == 200) {
          setisLoading(false)
          localStorage.setItem("token", response.token);
          cookies.set("token", response.token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), httpOnly: false })
          
          return navigate("/dashboard")
        } else if (response.status != 200) {
          setisLoading(false)
          return toast.error(response.message)
        }
        return setisLoading(false)
      } catch (error) {
        setisLoading(false);
        console.error("Error signining in:", error);
      }
    }
  }
  useEffect(() => {
    loadAuthentication()
  }, [UserId])




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.id]: e.target.value })

  }
  return (
    <FadeIn>
      <section className="h-full w-full flex justify-center items-center my-48 md:my-96 xl:my-24 2xl:my-48">
        <div className="conainer flex justify-center items-start w-full md:w-1/2 xl:w-1/4">
          {/* SignUp Form */}
          <div className="flex flex-col justify-center items-start h-full w-full">
            {/* Top */}
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-2xl topic">Sign-In</h1>
              <p className="text-sm text-secondary text-start">Good to see you back! 👋</p>
            </div>

            {/* Bottom */}
            <div className="flex flex-col items-center justify-center w-full mt-5">
              <div>
                <p className="text-sm text-secondary">Sign-In With</p>
              </div>
              <Button disabled className=" flex justify-center items-center gap-4 p-2 w-full m-4 rounded-lg border border-border" variant={"secondary"}><img width="24" height="24" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />Google</Button>
              <div>
                <p className="text-sm text-secondary">or Continue with E-mail</p>
              </div>
              <div className="flex flex-col gap-y-4 w-full mb-5">
                <div className='flex flex-col justify-center items-start text-start w-full'>
                  <label className="text-sm text-secondary mb-2">E-mail</label>
                  <Input id="email" name="email" type="email" placeholder="email" onChange={handleChange} value={Values.email}/>
                </div>
                <div className='flex flex-col justify-center items-start text-start w-full'>
                  <label className="text-sm text-secondary mb-2">Password</label>
                  <Input id="password" name="password" type="password" placeholder="password" onChange={handleChange} value={Values.password}/>
                </div>
              </div>
              <Button className="w-full topic" onClick={loadFetchSignIn}>{isLoading ? <l-tailspin
                size="28"
                stroke="5"
                speed="0.9"
                color="white"
              ></l-tailspin> : "Sign-in"}</Button>
              <p className="text-sm text-primary hover:underline hover:cursor-pointer mt-3"><a onClick={applyDemoCredentials}>Use demo credentials</a></p>
              <p className="text-sm mt-3">New here? <span><a href="/register" className="text-primary underline">Sign-Up</a></span></p>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

export default SignIn