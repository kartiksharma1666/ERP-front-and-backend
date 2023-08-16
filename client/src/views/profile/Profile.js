import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState } from 'react'
import {FaEnvelope,FaUserClock,FaPhoneAlt,FaGlobe,FaLanguage} from 'react-icons/fa'
import {BiSolidMessageSquare} from 'react-icons/bi'


const Profile = () => {
    
   const profileData = [
        {
        id:1,
        name: 'Omkar',
        image: '',
        email: 'omkar@gmail.com',
        phone: '+91 88501 47242',
        age: '21yrs',
        country: 'India',
        store: ['storeX','storeY','storeZ'],
        username: 'omkar21'
    },
        {
        id: 2,
        name: 'Kartik',
        image: '',
        email: 'kartik@gmail.com',
        phone: '+91 98685 39396',
        age: '21yrs',
        country: 'India',
        store: ['storeX','storeY','storeZ'],
        username: 'kartik21'
    },
        {
        id: 3,
        name: 'Gurleen',
        image: '',
        email: 'omkar@gmail.com',
        phone: '+91 88501 47242',
        age: '21yrs',
        country: 'India',
        store: ['storeX','storeY','storeZ'],
        username: 'gurleen21'
    },
        {
        id: 4, 
        name: 'Dacosta',
        image: '',
        email: 'omkar@gmail.com',
        phone: '+91 88501 47242',
        age: '21yrs',
        country: 'India',
        store: ['storeX','storeY','storeZ'],
        username: 'dacosta21'
    }
]
    
    const selectedProfile = profileData.find((profile) => profile.id ===1)
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const profileStyle = {
        display: 'flex',
        marginTop: '60px'
    }
    
    const imageStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        cursor: 'pointer'

    };

    const profileContentStyle = {
     marginRight: '50px',
     marginTop: '10px',
     border: '1px solid grey',
     borderRadius: '8px',
     padding: '20px 50px',
     background: 'blue',
     color: 'white'
    }

    const languages = [
        'English',
        'Spanish',
        'French',
        'German',
        //Add more language
    ];
    


    return (
        <CRow>
            <CCol xs={20}>
                
             
                <div className=' profile-container'>
                    <h1>Profile</h1>
                    <hr />
                    <div className='imgage-upload'  style={profileStyle}>
                        <div className='admin-img'>
                            <label htmlFor='image-upload' className='add-img ms-4' title='Add a profile photo'>
                                {selectedImage ? (
                                    <img className="_aadp" style={imageStyle} src={selectedImage} alt='Uploaded' />
                                ) : (
                                    <img className="_aadp" style={imageStyle} src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt='Default' />
                                )}
                            </label>
                            <input
                                id='image-upload'
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className='' style={{marginLeft: '50px'}}>
                            <h1>{selectedProfile.name}</h1>
                            <p><span style={{color:'blue'}}>{selectedProfile.email}</span> - Administrator</p>
                            <p>{selectedProfile.age}</p>
                            <p>{selectedProfile.store[2]}</p>
                        </div>
                    </div>
                    <section className='profile-content align-item center' >
                     <h2 style={{marginTop: '70px'}}>Account</h2>
                     {selectedProfile && (
                        <div className='profile-details'>
                            <div className='profile-name mt-4' style={{display: 'flex'}}>
                                <h5><FaUserClock/> Name </h5>
                               <p style={{marginLeft:'95px',
                            width:'50%', border: '1px solid  #B2BEB5',borderRadius:'5px', background:'white',padding:'5px',
                            marginBottom:'10px'}}>{selectedProfile.name}</p>
                            </div>
                            <div className='profile-email mt-4' style={{display: 'flex'}}>
                            <h5><FaEnvelope/> Email</h5>
                            <p style={{marginLeft:'100px',
                            width:'50%', border: '1px solid  #B2BEB5', borderRadius:'5px',background:'white',padding:'5px',
                            marginBottom:'10px'}}>{selectedProfile.email}</p>
                            </div>
                            <div className='profile-phone mt-4' style={{display: 'flex'}}>
                            <h5><FaPhoneAlt/> Phone </h5>
                            <p style={{marginLeft:'94px',
                            width:'50%', border: '1px solid  #B2BEB5', borderRadius:'5px',background:'white',padding:'5px',
                            marginBottom:'10px'}}>{selectedProfile.phone}</p>
                            </div>
                            <div className='profile-name mt-4' style={{display: 'flex'}}>
                                <h5><FaUserClock/> Username </h5>
                               <p style={{marginLeft:'60px',
                            width:'50%', border: '1px solid  #B2BEB5',borderRadius:'5px', background:'white',padding:'5px',
                            marginBottom:'10px'}}>{selectedProfile.username}</p>
                            </div>
                            
                            <div className='profile-phone mt-4' style={{display: 'flex'}}>
                            <h5><FaGlobe/> Country </h5>
                            <p style={{marginLeft:'80px',
                            width:'50%', border: '1px solid  #B2BEB5',borderRadius:'5px', background:'white',padding:'5px',
                            marginBottom:'10px'}}>{selectedProfile.country}</p>
                            </div>
                            <div className='language mt-4' style={{ display: 'flex' }}>
    <h5><FaLanguage/> Language</h5>
    <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        style={{
            marginLeft: '64px',
            width: '50%',
            border: '1px solid #B2BEB5',
            borderRadius: '5px',
            background: 'white',
            padding: '5px',
            marginBottom: '10px',
        }}
    >
        <option value=''>Select a language</option>
        {languages.map((language) => (
            <option key={language} value={language}>
                {language}
            </option>
        ))}
    </select>
</div>

                        </div>
                     )}
                    </section>
                </div>
               
            </CCol>
        </CRow>
    )
}


export default Profile;

