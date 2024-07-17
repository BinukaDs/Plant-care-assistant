
import { Suspense, useEffect } from 'react'
import React from 'react'
import { Toaster } from "@/components/ui/sonner"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
const Register = React.lazy(() => import('./Routes/Register/Register'))
const Home = React.lazy(() => import('./Routes/Home/Home'))
const SignIn = React.lazy(() => import('./Routes/SignIn/SignIn'))
const DashBoard = React.lazy(() => import('./Routes/DashBoard/DashBoard'))
const Plant = React.lazy(() => import('./Routes/DashBoard/Plant/Plant'))
import { useState, createContext } from "react";
import Base from '../endpoints.config';

export const UserContext = createContext("");

export default function App() {
  const BaseUrl = Base.Base.replace(/\/+$/, "");
  const [BASE, setBASE] = useState("")

  useEffect(() => {
    setBASE(BaseUrl)
    
  }, [BASE])

  return (
    <>

      <UserContext.Provider value={BASE}>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/signin' element={<SignIn />}></Route>
              <Route path='/dashboard' element={<DashBoard />}></Route>
              <Route path='/plant/:plantId' element={<Plant />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserContext.Provider>

    </>
  )
}


