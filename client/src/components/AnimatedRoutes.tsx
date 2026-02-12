import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
const SignUp = React.lazy(() => import('../routes/authentication/SignUp/SignUp'))
const Home = React.lazy(() => import('../routes/home/Home'))
const SignIn = React.lazy(() => import('../routes/authentication/SignIn/SignIn'))
const DashBoard = React.lazy(() => import('../routes/dashBoard/DashBoard'))
const Plant = React.lazy(() => import('../routes/dashBoard/Plant/Plant'))
const Settings = React.lazy(() => import('../routes/settings/Settings'))
const Profile = React.lazy(() => import('../routes/profile/Profile'))
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
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/dashboard/plant/:plantId' element={<Plant />}></Route>
            </Routes>
        </AnimatePresence >
    )
}

export default AnimatedRoutes