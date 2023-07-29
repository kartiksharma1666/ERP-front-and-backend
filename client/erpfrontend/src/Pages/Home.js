import React, { useState } from 'react'
import { useEffect } from 'react'

export const Home = () => {

    const [data, setdata]= useState(null)

    const getDataFromDB = async ()=>{
        const res = await fetch("http://localhost:8080/api/products/all")
         .catch((err)=>{console.log(err)})

        const resjson = await res.json();
        console.log(resjson);
        setdata(resjson)
       
       }


    useEffect(()=>{
        getDataFromDB();

    },[]);


    
    return (
        <div className='content'>
        <h1>Products</h1>
        <div className = "row">
         {data?.map((res)=>(
            <div className='col-lg-4 col-md-6 col-sm-12'>
            <div class="card" style={{width:"18rem"}} >
             <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">{res.name}</h5>
                 <p class="card-text">{res.description}</p>
                 <p class="card-text">{res.price}</p>
                 <p class="card-text">{res.category.name}</p>
           
             </div>
             </div>
            
             
            </div>
         ))}
         </div>

            
        </div>
    )
}
