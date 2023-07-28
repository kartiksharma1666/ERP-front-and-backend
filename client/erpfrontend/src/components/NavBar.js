import React from 'react'
import { Button } from 'react-bootstrap'
import {FaWaze} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'

function NavBar() {
    
    const logoEmoji = {
        fontSize: '40px',
        color: '#fff',  
        marginRight: '30px'
    }
    
    
    return (
       <React.Fragment>
        <section>
            <nav className='navbar-container' >
          <div className='logo'>
           
             <h2>
             ERP
             </h2>
            </div> 
               <div className='control-pannel'>
                <Link to={'Form'} style={logoEmoji}> <CgProfile /> </Link>
                </div> 
            </nav>
        </section>
       </React.Fragment>
    )
}

export default NavBar
