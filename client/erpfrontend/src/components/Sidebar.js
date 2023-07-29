import React from 'react'
import { Link } from 'react-router-dom'
import {SlSettings} from 'react-icons/sl'
import {LiaProductHunt} from 'react-icons/lia'
import { FaBars } from 'react-icons/fa'
import {GiShoppingCart } from 'react-icons/gi'
import {MdPointOfSale} from 'react-icons/md'
import {HiOutlineHome} from 'react-icons/hi'


export const Sidebar = () => {
    return (
  <React.Fragment>
    
            <div className='side-bar'>
              <h3>Dash Board</h3>
                <Link to={'/'} className='links' ><span><HiOutlineHome /></span> Home</Link>
                <Link  to={'Product'} className='links'><span><LiaProductHunt/></span> Products</Link>
                <Link to={'Category'} className='links' ><span><FaBars/></span> Categories</Link>
                <Link to={'Purchase'} className='links' ><span><GiShoppingCart/></span> Purchase</Link>
                <Link to={'Sales'} className='links' ><span><MdPointOfSale/></span> Sales</Link>
                <Link to={'Forms'} className='links' ><span><SlSettings/></span> Log in</Link>
                <Link to={'Settings'} className='links' ><span><SlSettings/></span> Settings</Link>           
            </div>
       
       
  </React.Fragment>
    )
}