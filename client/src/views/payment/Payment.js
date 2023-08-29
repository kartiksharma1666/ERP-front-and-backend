import React from 'react'
import {LiaCalendarAltSolid} from 'react-icons/lia'

 const Payment = () => {
    
    const payment =[{
        id: 1,
        name: 'Dacosta',
        avatar: 'https://cdn.pixabay.com/photo/2018/05/19/22/03/man-3414477_1280.png',
        createdAt: '8/22/2023',
        time: '5:30 pm' ,
        details: 'Payment Completed',
        recipient: 'Dacosta',
        bank: 'XYZ',
        amount: '1234'
    },
    {
       id: 2,
        name: 'Omkar',
        avatar: 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png',
        createdAt: '8/21/2023',
        time: '12:00 pm',
        details: 'Payment completed for MacBook',
        recipient: 'Omkar',
        bank: 'ABC',
        amount: '675'
        
    },
    {
        id: 3,
        name: 'Kartik',
        avatar: 'https://cdn.pixabay.com/photo/2020/05/08/02/55/african-american-5143919_1280.png',
        createdAt: '8/21/2023',
        time: '8:00 pm',
        details: 'Payment Remaining'
    },
    {
        id: 4,
        name: 'Gurleen',
        avatar: 'https://cdn.pixabay.com/photo/2018/08/28/14/40/avatar-3637701_1280.png',
        createdAt: '8/21/2023',
        time: '8:00 pm',
        details: 'logged into her account'
    }]

    const not1 = payment.find((payment) => payment.id === 3)
    const not2 = payment.find((payment) => payment.id === 1)
    const not3 = payment.find((payment) => payment.id === 2)
    
    return (
        <div className='notification-container'>
         <div className='notification-upper'>
            <h4 style={{color: 'blue'}}>Payments</h4>
            
            {/* <div className='panel'>
           {payment.length > 0 && (
            <img src={payment[0].avatar} alt='Avatar'></img>
            )
           }
            </div> */}
         </div>
         <hr />
           {/* <div className='date-container'>
            <span style={{marginRight: '-1px'}} className='date'>{payment[0].createdAt}          
            <LiaCalendarAltSolid /></span>
            <span className='calender-icon'></span>
            <span></span>
           </div> */}
           <div className='payment-details'>
            <h5>Today</h5>
                <div className='main-details'>
                    <div className='d-flex img-p'> 
                    <img className='avatar' src={not1.avatar} ></img>
                <p className='payment-details'>{not1.name}  
                <span className='p-tag'>{not1.details}</span>
                </p>
                   </div>
                <span className='p-tag'>{not1.time}</span>
                </div>

                <div className='main-details'>
                    <div className='d-flex img-p'> 
                    <img className='avatar' src={not2.avatar} ></img>
                <p className='payment-details'>{not2.name}  
                <span className='p-tag'>{not2.details}</span>
                </p>
                <p className='payment-details'>Recipient Name:
                <span className='p-tag'>{not2.recipient}</span>
                </p>
                <p className='payment-details'>Amount Paid:
                <span className='p-tag'>{not2.amount}</span>
                </p>
                   </div>
                <span className='p-tag'>{not2.time}</span>
                </div>

                <hr />

                <h5>Yesterday</h5>
                <div className='main-details'>
                    <div className='d-flex img-p'> 
                    <img className='avatar' src={not3.avatar} ></img>
                <p className='payment-details'>{not3.name}  
                <span className='p-tag'>{not3.details}</span>
                </p>
                <p className='payment-details'>Recipient Name:
                <span className='p-tag'>{not3.recipient}</span>
                </p>
                <p className='payment-details'>Amount Paid:
                <span className='p-tag'>{not3.amount}</span>
                </p>
                   </div>
                <span className='p-tag'>{not3.time}</span>
                </div>

                
           </div>
        </div>
    )
}

export default Payment

