import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
const SignUp = React.lazy(() => import('../Routes/Authentication/SignUp/SignUp'))
const Home = React.lazy(() => import('../Routes/Home/Home'))
const SignIn = React.lazy(() => import('../Routes/Authentication/SignIn/SignIn'))
const DashBoard = React.lazy(() => import('../Routes/DashBoard/DashBoard'))
const Plant = React.lazy(() => import('../Routes/DashBoard/Plant/Plant'))
const Settings = React.lazy(() => import('../Routes/Settings/Settings'))
import { AnimatePresence } from 'framer-motion'
if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
}
const AnimatedRoutes = () => {
    const location = useLocation()
    return (
        <AnimatePresence
            mode="wait"
            initial={true}
            onExitComplete={() => {
                if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0 })
                }
            }}>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />}></Route>
                <Route path='/register' element={<SignUp />}></Route>
                <Route path='/signin' element={<SignIn />}></Route>
                <Route path='/dashboard' element={<DashBoard />}></Route>
                <Route path='/settings' element={<Settings />}></Route>
                <Route path='/dashboard/plant/:plantId' element={<Plant />}></Route>
            </Routes>
        </AnimatePresence >
    )
}

export default AnimatedRoutes