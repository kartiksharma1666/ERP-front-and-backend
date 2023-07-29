import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'




export const Layout = () => {
    
    const iconStyle ={
        color: '#fff'
    }
    
    return (
        <React.Fragment>
          
            <section>
               <div>
               <NavBar /> 
                </div>              
            </section>

          
          <section>
            <div className='main'>
            <Sidebar />
            <div>
            <Outlet />
            </div>
            </div>
          </section>

          
          <section>
           
            <Footer />
        
          </section>
        </React.Fragment>
    )
}