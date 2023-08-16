import React from 'react'
import {MdAdd} from 'react-icons/md'

 const FloatingButton = () => {
    return (
        <div>
        <div className='fab'>
            <button><MdAdd /></button>
        </div>
        <div className='box'>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
        </div>
        </div>
    )
}
export default FloatingButton;
