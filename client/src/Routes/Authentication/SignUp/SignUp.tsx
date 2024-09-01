import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "@/App";
import { Input } from "@/components/ui/input";
import FadeIn from "../../../components/transitions/FadeIn"
import Cookies from 'universal-cookie';
import { Button } from "@/components/ui/button"
import { responseDataTypes } from "@/types/Plant";
import { FetchRegister } from "@/services/Authentication.service";
const SignUp = () => {
      const cookies = new Cookies()
      const navigate = useNavigate()
      const BASE = useContext(UserContext);
      const [Values, setValues] = useState({ email: "", username: "", password: "", pwdRepeat: "" })
      const [isLoading, setisLoading] = useState(false);


      const loadFetchRegister = async (e: React.ChangeEvent<HTMLElement>) => {
            e.preventDefault();
            setisLoading(true)
            if (!Values.email || !Values.username || !Values.password || !Values.pwdRepeat) {
                  return toast.error("Please fill in all fields!")
            } else if (typeof Values.email != "string" || typeof Values.username != "string" || typeof Values.password != "string" || typeof Values.pwdRepeat != "string") {
                  return toast.error("Please enter the values in correct type!")
            }
            try {
                  const response: responseDataTypes = await FetchRegister(BASE, Values)
                  console.log(response)
                  if (response.status == "201") {
                        setisLoading(false)
                        localStorage.setItem("token", response.token);
                        cookies.set("token", response.token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) })
                        navigate("/dashboard")
                  } else if (response.status) {
                        setisLoading(false)
                        toast.error(response.message)
                  }
            } catch (error) {
                  console.error("Error signing up:", error)
            }
      }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...Values, [e.target.id]: e.target.value })
      }


      return (
            <FadeIn>
                  <section className="h-full w-full flex justify-center items-center my-32 lg:my-72 xl:my-8 2xl:my-24">
                        <div className="conainer flex justify-center items-start w-full md:w-1/2 xl:w-1/4">
                              {/* SignIn Form */}
                              <div className="flex flex-col justify-center items-start h-full w-full">
                                    {/* Top */}
                                    <div className="flex flex-col justify-center items-start">
                                          <h1 className="text-2xl topic">Create an account</h1>
                                          <p className="text-sm text-secondary text-start">Enter your details below to create your account!</p>
                                    </div>

                                    {/* Bottom */}
                                    <div className="flex flex-col items-center justify-center w-full mt-5">
                                          <div>
                                                <p className="text-sm text-secondary">Sign-Up With</p>
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
                                                      <label className="text-sm text-secondary mb-2">Username</label>
                                                      <Input id="username" name="username" type="text" placeholder="username" onChange={handleChange} />
                                                </div>
                                                <div className='flex flex-col justify-center items-start text-start w-full'>
                                                      <label className="text-sm text-secondary mb-2">Password</label>
                                                      <Input id="password" name="password" type="password" placeholder="password" onChange={handleChange} />
                                                </div>
                                                <div className='flex flex-col justify-center items-start text-start w-full'>
                                                      <label className="text-sm text-secondary mb-2">Repeat-Password</label>
                                                      <Input id="pwdRepeat" name="pwdRepeat" type="password" placeholder="Repeat-Password" onChange={handleChange} />
                                                </div>
                                          </div>
                                          <Button className="w-full topic" onClick={loadFetchRegister}>Sign-Up</Button>
                                          <p className="text-sm mt-3">Already have an account <span><a href="/signin" className="text-primary underline">Sign-In</a></span></p>
                                    </div>
                              </div>
                        </div>
                  </section>
            </FadeIn>
      )
}

export default SignUp