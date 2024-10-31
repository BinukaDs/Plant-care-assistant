import FadeIn from "@/components/transitions/FadeIn"
import Layout from "./Layout"
import { Helmet } from "react-helmet"
import { FetchUser, UpdateUser } from "@/services/Profile.service"
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { FetchAuthentication } from "@/services/Authentication.service"
import { useContext, useState, useEffect, useCallback } from "react"
import { AiOutlineEye } from "react-icons/ai";
import { UserContext } from "@/App"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UserDataTypes } from "@/types/User"
import { responseDataTypes } from "@/types/Plant"
import { UpdatePassword } from "@/services/Profile.service"
import { toast } from "sonner"
const Profile = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  const BASE = useContext(UserContext);
  const [UserId, setUserId] = useState("");
  const [UserData, setUserData] = useState<UserDataTypes>()
  const [visible, setVisible] = useState<boolean>()
  const [passwords, setPasswords] = useState({ new: "", repeat: "" })

  //fetch Authentication middleware
  const loadAuthentication = async () => {
    try {
      const data = await FetchAuthentication(BASE, cookies.get("token"));
      if (data.id) {
        if (data.isLoggedin === true) {
          return setUserId(data.id);
        }
      }
      data.isLoggedin === true ? null : navigate('/signin')
    } catch (error) {
      console.error(error);
    }
  }
  const loadFetchUser = async () => {
    if (UserId) {
      try {
        const data = await FetchUser(BASE, UserId);
        if (data) {
          return setUserData(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error Fetching User!")
      }
    }
  }
  const debounce = (func: (value: string) => void, delay: number) => {

    let timeoutId: NodeJS.Timeout;
    return (...args: [string]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedOnusernameChange = useCallback(
    debounce((value: string) => {

      onUsernameChange(value);
    }, 1000),
    [debounce]
  );

  const setVisibility = () => {
    setVisible(!visible)
  }

  const updatePassword = async () => {
    if (!passwords.new || !passwords.repeat) {
      toast.error("Please fill the password fields!")
    } else if (passwords.new && passwords.repeat) {
      if (passwords.new === passwords.repeat) {
        try {
          const response: responseDataTypes = await UpdatePassword(BASE, UserId, passwords.new)
          if (response.status == 200) {
            console.log("✅", response.message)
            toast.success(response.message)
            setPasswords({ new: "", repeat: "" })
          }
        } catch (error) {
          console.error("Error Updating Password: ", error);
          toast.error("Error Updating Password!")
        }
      } else if (passwords.new !== passwords.repeat) {
        toast.error("Passwords doesn't match!")
      }
    }
  }
  const onUsernameChange = async (value: string) => {


    if (value) {

      try {
        const response: responseDataTypes = await UpdateUser(BASE, UserId, value)
        if (response.status == 200) {
          console.log("✅", response.message)
          toast.success(response.message)
          loadFetchUser()
        }
      } catch (error) {
        console.error("Error Updating User: ", error);
        toast.error("Error Updating User!")
      }
    }
  }

  useEffect(() => {
    loadAuthentication();
    loadFetchUser();
  }, [UserId])
  return (
    <Layout>
      <Helmet>
        <title>Profile - PlantLY</title>
      </Helmet>
      <FadeIn>
        <div className=' w-full justify-center items-center m-12 gap-y-5'>
          <section className='flex flex-col w-full justify-center items-start h-full mx-5'>
            <BreadCrumbNav />
            <div className='flex w-full justify-between'>
              <div className='flex flex-col justify-center items-start'>
                <h1 className='text-3xl topic text-start '>Profile</h1>
                <p className='text-sm text-secondary'>Manage Your Profile.</p>
              </div>

            </div>

            <section className='flex flex-col w-full h-full '>
              <div className='bg-white rounded-t-xl relative flex flex-col w-full h-full  mt-24'>
                <div className='relative bg-card rounded-xl h-full p-10 w-full mb-12'>
                  <div className='flex gap-32 '>
                    <div className='flex absolute justify-center items-end gap-2 -top-24 py-6'>
                      <img src={"./profile.webp"} alt={"Profile Image"} width={"100px"} className='rounded-full' />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start w-full">
                    <div className="text-sm text-secondary flex flex-col items-start gap-y-2 w-full">
                      <Label>
                        Name
                      </Label>
                      <Input defaultValue={UserData?.username} onChange={(e) => {

                        if (e.target.value.length > 2) {
                          debouncedOnusernameChange(e.target.value)
                        }
                      }} />
                    </div>
                    <div className="flex flex-col justify-start w-full mt-5 gap-y-2">
                      <div className="text-sm text-secondary flex flex-col items-start gap-y-2 w-full">
                        <Label>
                          New-Password
                        </Label>
                        <div className='flex border bg-white rounded-lg justify-center items-center w-full focus-visible:ring-1 focus-visible:ring-primary'>

                          <Input type={`${visible ? "text" : "password"}`} placeholder="new-password" className="border-none rounded-xl shadow-none focus-visible:ring-0 bg-white" onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
                          <button className='mr-3' onClick={() => setVisibility()}><AiOutlineEye size={18} /></button>
                        </div>

                      </div>
                      <div className="text-sm text-secondary flex flex-col items-start gap-y-2 w-full">
                        <Label>
                          Repeat-Password
                        </Label>
                        <Input type="password" onChange={(e) => setPasswords({ ...passwords, repeat: e.target.value })} placeholder="repeat-password" />
                      </div>
                      <Button className="w-1/4 rounded-lg mt-3" onClick={updatePassword}>Update Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </section>
        </div>
      </FadeIn>
    </Layout>
  )
}


export default Profile