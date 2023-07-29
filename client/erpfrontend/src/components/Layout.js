import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'




export const Layout = () => {
    
    // const iconStyle ={
    //     color: '#fff'
    // }
    
    return (
        <React.Fragment>

           {/*heading section*/}

            <section>
               <div>
               <NavBar /> 
                </div>              
            </section>


          {/*sidebar section and main*/}  

          <section>
            <div className='main'>
            <Sidebar />
            <Outlet />
            </div>
          
          </section>


          {/*Footer section*/}

          <section>
           
            <Footer />
        
          </section>
        </React.Fragment>
    )
}