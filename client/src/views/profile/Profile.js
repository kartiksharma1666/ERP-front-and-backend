import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState } from 'react'
import {FaEnvelope,FaUserClock,FaPhoneAlt,FaGlobe,FaStore} from 'react-icons/fa'
import {BiSolidMessageSquare} from 'react-icons/bi'


const Profile = () => {
    
   const profileData = [
        {
        id:1,
        name: 'Omkar',
        image: '',
        email: 'omkar@gmail.com',
        phone: '+91 88501 47242',
        age: 21,
        country: 'India',
        store: ['storeX','storeY','storeZ']
    },
        {
        id: 2,
        name: 'Kartik',
        image: '',
        email: 'kartik@gmail.com',
        phone: '+91 98685 39396',
        age: 21,
        country: 'India',
        store: ['storeX','storeY','storeZ']
    },
        {
        id: 3,
        name: 'Gurleen',
        image: '',
        email: 'omkar@gmail.com',
        phone: '+91 88501 47242',
        age: 21,
        country: 'India',
        store: ['storeX','storeY','storeZ']
    },
        {
        id: 4, 
        name: 'Omkar',
        image: '',
        email: 'omkar@gmail.com',
        phone: '+91 88501 47242',
        age: 21,
        country: 'India',
        store: ['storeX','storeY','storeZ']
    }
]
    
    const selectedProfile = profileData.find((profile) => profile.id ===1)
    
    const [selectedImage, setSelectedImage] = useState(null);

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
        justifyContent: 'space-around',
        marginTop: '20px'
    }
    
    const imageStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',

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


    return (
        <CRow>
            <CCol xs={20}>
                <CCard className='mb-4'>
                <CCardHeader>
              <strong>Profile</strong>
            </CCardHeader>
            <CCardBody>
             
                <div className=' profile-container' style={profileStyle}>
                    <div className='imgage-upload'>
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
                    </div>
                    <section className='profile-content align-item center' style={profileContentStyle}>
                     {selectedProfile && (
                        <div className='profile-details'>
                            <div className='profile-name mt-4'>
                                <h5><FaUserClock/> Name:{'  '}<span>{selectedProfile.name}</span> </h5>
                            </div>
                            <div className='profile-email mt-4'>
                            <h5><FaEnvelope/> Email:{'  '}<span>{selectedProfile.email}</span> </h5>
                            </div>
                            <div className='profile-phone mt-4'>
                            <h5><FaPhoneAlt/> Phone:{'  '}<span>{selectedProfile.phone}</span> </h5>
                            </div>
                            <div className='profile-phone mt-4'>
                            <h5><BiSolidMessageSquare/> Age:{'  '}<span>{selectedProfile.age}</span> </h5>
                            </div>
                            <div className='profile-phone mt-4'>
                            <h5><FaGlobe/> Country:{'  '}<span>{selectedProfile.country}</span> </h5>
                            </div>
                            <div className='profile-phone mt-4'>
                            <h5><FaStore/> Store:{'  '}<span>{selectedProfile.store[2]}</span> </h5>
                            </div>
                        </div>
                     )}
                    </section>
                </div>
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Profile;
