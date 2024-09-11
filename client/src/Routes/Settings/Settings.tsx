import React from 'react'
import Layout from './Layout'
import FadeIn from '@/components/transitions/FadeIn'
import BreadCrumbNav from '@/components/BreadCrumbNav'
const Settings = () => {
  return (
    <Layout>
         <FadeIn>
                <div className=' w-full justify-center items-center m-12 gap-y-5'>
                    <section className='flex flex-col w-full justify-center items-start h-full mx-5'>
                        <BreadCrumbNav />
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col justify-center items-start'>
                                <h1 className='text-3xl topic text-start '>Settings</h1>
                                <p className='text-sm text-secondary'>Customize your experience.</p>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='grid grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 w-full my-12 justify-center items-center h-full gap-12'>
                           
                        </div>
                    </section>
                </div>
            </FadeIn>
    </Layout>
  )
}

export default Settings