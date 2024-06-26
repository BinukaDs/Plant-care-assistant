
import { Suspense } from 'react'
import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
const Register = React.lazy(() => import('./Routes/Register/Register'))
const Home = React.lazy(() => import('./Routes/Home/Home'))
const SignIn = React.lazy(() => import('./Routes/SignIn/SignIn'))
const DashBoard = React.lazy(() => import('./Routes/DashBoard/DashBoard'))
const Plant = React.lazy(() => import('./Routes/DashBoard/Plant/Plant'))

export default function App() {


  return (
    <>


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


    </>
  )
}


