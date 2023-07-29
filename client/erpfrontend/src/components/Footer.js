import React from 'react'
import {AiFillGithub,AiOutlineInstagram,AiTwotonePhone} from 'react-icons/ai'
import {FaLinkedinIn} from 'react-icons/fa'

export const Footer = () => {
    
  
    
    
    return (
        <React.Fragment>
            <section>
                <div className='footer'>
                
                  <p><span>&copy; 2023 TechTok4u Erp Group. All right reserved.</span></p>
                  <div className='footer-icons'>
                  
                  <a href='https://github.com/kartiksharma1666/ERP-front-and-backend/tree/main'><AiFillGithub /></a>
                  <a href='https://www.instagram.com/techtok4u/?hl=en'><AiOutlineInstagram /></a>
                  <a href='https://www.linkedin.com/company/techtok4u/'><FaLinkedinIn /></a>
                  <a href='https://techtok4u.com/contact-us.php'><AiTwotonePhone /></a>

                  </div>
                </div>
            </section>
        </React.Fragment>
    )
}