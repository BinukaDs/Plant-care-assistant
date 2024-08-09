import { useEffect, useState, useContext } from "react"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners"
import { UserContext } from "@/App";
import { Input } from "@/components/ui/input";
import FadeIn from "../Components/transitions/FadeIn"
import { Button } from "@/components/ui/button"
import { FetchAuthentication } from "@/services/Authentication";
import { FetchSignIn } from "@/services/Authentication";
const SignIn = () => {
  const navigate = useNavigate()
  const BASE = useContext(UserContext);
  const [Values, setValues] = useState({ email: "", password: "" })
  const [UserId, setUserId] = useState("")
  const [isLoading, setisLoading] = useState(false);

  const loadAuthentication = async () => {
    try {
      const data = await FetchAuthentication(BASE);
      if (data.id) {
        setUserId(data.id);
        data.isLoggedin === true ? navigate('/dashboard') : null
      }
    }
    catch (error) {
      console.error(error);
    }
  }



  const loadFetchSignIn = async (e: React.ChangeEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setisLoading(true)
      const response = await FetchSignIn(BASE, Values)
      if(response.status == "400") {
        setisLoading(false)
        localStorage.setItem("token", response.token);
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Error signining in:", error)
    }
  }
  useEffect(() => {
    loadAuthentication()
  }, [UserId])


  

  const handleChange = (e) => {
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
                  <Input id="email" name="email" type="email" placeholder="email" onChange={handleChange} />
                </div>
                <div className='flex flex-col justify-center items-start text-start w-full'>
                  <label className="text-sm text-secondary mb-2">Password</label>
                  <Input id="password" name="password" type="password" placeholder="password" onChange={handleChange} />
                </div>
              </div>
              <Button className="w-full topic" onClick={loadFetchSignIn}>Sign-In</Button>
              <p className="text-sm mt-3">New here? <span><a href="/register" className="text-primary underline">Sign-Up</a></span></p>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

export default SignIn