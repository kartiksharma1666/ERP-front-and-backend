import React from 'react'
import {MdAdd, MdOutlineCreateNewFolder, MdMenu} from 'react-icons/md'
import {AiOutlineEdit, AiTwotoneDelete} from 'react-icons/ai'

 const FloatingButton = () => {
    
    const handleFabClick = () => {
        document.querySelector('.box').classList.toggle('box-active');
        document.querySelector('.fab').classList.toggle('fab-active');
      };
   
    return (
        <div>
        <div className='fab'>
            <button onClick={handleFabClick} className='fabbtn'><MdAdd /></button>
        </div>
        <div className='box'>
            <button className='floatbtn item1'><AiOutlineEdit /></button>
            <button className='floatbtn item2'><MdOutlineCreateNewFolder /></button>
            <button className='floatbtn item3'><AiTwotoneDelete /></button>
            <button className='floatbtn item4'><MdMenu /></button>
        </div>
        </div>
    )
}
export default FloatingButton;
