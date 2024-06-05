import './App.css'
import React from 'react'
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import axios from 'axios'
import { AuthProvider } from './hooks/AuthContext'

const Login = React.lazy(() => import('./Routes/Login/Login'))
const Register = React.lazy(() => import('./Routes/Register/Register'))
const Home = React.lazy(() => import('./Routes/Home/Home'))


function App() {
  axios.get('http://localhost:3001/').then((res) => {
    console.log(res.data)
  })

  return (
    <AuthProvider>
      <main className='flex justify-center items-center m-48'>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>

            <Routes>
              <Route path='/signin' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/home' element={<Home />}></Route>
            </Routes>


          </BrowserRouter>
        </Suspense>
      </main>
    </AuthProvider>
  )
}

export default App
