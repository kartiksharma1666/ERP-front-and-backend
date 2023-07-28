import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {SlSettings} from 'react-icons/sl'
import {LiaProductHunt} from 'react-icons/lia'
import { FaBars } from 'react-icons/fa'
import {GiShoppingCart } from 'react-icons/gi'
import {MdPointOfSale} from 'react-icons/md'
import {HiOutlineHome} from 'react-icons/hi'
import { Product } from '../Pages/Product'



export const Layout = () => {
    
    const iconStyle ={
        color: '#fff'
    }
    
    return (
        <React.Fragment>
           {/*heading section*/}
            <section>
               <div>
               <NavBar /> 
                </div>              
            </section>

          {/*sidebar secrtion*/}  
        <section>
            <div className='side-bar'>
              <h3>Dash Board</h3>
                <Link to={'/'} className='links' ><span><HiOutlineHome /></span> Home</Link>
                <Link  to={'Product'} className='links'><span><LiaProductHunt/></span> Products</Link>
                <Link to={'Category'} className='links' ><span><FaBars/></span> Categories</Link>
                <Link to={'Purchase'} className='links' ><span><GiShoppingCart/></span> Purchase</Link>
                <Link className='links' ><span><MdPointOfSale/></span> Sales</Link>
                <Link className='links' ><span><SlSettings/></span> Settings</Link>
             
            </div>
        </section>
        <Outlet />
        </React.Fragment>
    )
}
