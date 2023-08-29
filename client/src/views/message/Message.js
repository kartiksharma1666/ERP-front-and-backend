import React from 'react'
import {LiaCalendarAltSolid} from 'react-icons/lia'

 const Message = () => {
    
    const notification =[{
        id: 1,
        name: 'Dacosta',
        avatar: 'https://cdn.pixabay.com/photo/2018/05/19/22/03/man-3414477_1280.png',
        createdAt: '8/22/2023',
        time: '5:30 pm' ,
        details: 'ordered a Macbook Pro 256GB'
    },
    {
       id: 2,
        name: 'Omkar',
        avatar: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png',
        createdAt: '8/21/2023',
        time: '12:00 pm',
        details: 'changed his password'
        
    },
    {
        id: 3,
        name: 'Kartik',
        avatar: 'https://cdn.pixabay.com/photo/2020/05/08/02/55/african-american-5143919_1280.png',
        createdAt: '8/21/2023',
        time: '8:00 pm',
        details: 'ordered an ERP software'
    },
    {
        id: 4,
        name: 'Gurleen',
        avatar: 'https://cdn.pixabay.com/photo/2018/08/28/14/40/avatar-3637701_1280.png',
        createdAt: '8/21/2023',
        time: '8:00 pm',
        details: 'logged into her account'
    }]
    
    
    
    return (
        <div className='notification-container'>
         <div className='notification-upper'>
            <h5>Notifications ({notification.length})</h5>
            <div className='panel'>
           {notification.length > 0 && (
            <img src={notification[0].avatar} alt='Avatar'></img>
            )
           }
            </div>
         </div>
           <div className='date-container'>
            <span className='date'>{notification[0].createdAt}          <LiaCalendarAltSolid /></span>
            <span className='calender-icon'></span>
            <span></span>
           </div>
           <div className='notification-details'>
            <h5>Today</h5>
            {notification && notification.map((not) =>(
                <div className='main-details'>
                    <div className='d-flex img-p'> 
                    <img src={not.avatar} ></img>
                <p style={{fontWeight:'500'}}>{not.name}  <span style={{fontWeight:'300', color:'#333333'}} className='p-tag'>{not.details}</span></p>
                   </div>
                <span style={{color: '#333333'}}>{not.time}</span>
                </div>
                
            ))}
            

           </div>
        </div>
    )
}

export default Message

