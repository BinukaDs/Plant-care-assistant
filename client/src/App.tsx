import './App.css'
import React from 'react'
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import axios from 'axios'

const Login = React.lazy(() => import('./Routes/Login/Login'))
const Register = React.lazy(() => import('./Routes/Register/Register'))



function App() {
  axios.get('http://localhost:3001/').then((res) => {
    console.log(res.data)
  })

  return (
    <main className='flex justify-center items-center m-48'>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          
            <Routes>
              <Route path='/signin' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
            </Routes>
          
       
        </BrowserRouter>
      </Suspense>
    </main>
  )
}

export default App
