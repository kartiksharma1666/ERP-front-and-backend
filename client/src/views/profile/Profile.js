import { CRow, CCol, CCard, CCardHeader, CCardBody, CTable, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CTableHead } from '@coreui/react';
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
        name: 'Gurleen Kaur Kalsi',
        image: '',
        email: 'omkar@gmail.com',
        phone: '+91 88501 47242',
        age: '21yrs',
        country: 'India',
        store: ['storeX','storeY','storeZ'],
        username: 'gurleen21',
        gender: 'Female',
        birthdate: '9 April 2003'
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
    
    const selectedProfile = profileData.find((profile) => profile.id === 3)
    
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
        marginTop: '50px'
    }
    
    const imageStyle = {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        cursor: 'pointer',
        marginLeft: '165px'
    };

    const profile = {
        marginLeft:'10px',
        width:'35%',
        height: '20%',
        borderRadius:'5px', 
        background:'white',
        padding:'3px',
        marginBottom: '0px'
    }

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
                    <br />
                    <div style={{border: '1px solid grey', borderRadius: '8px', padding: '15px', color: 'g'}}>
                    <h3>Basic Info.</h3>
                    <div className='profile-name mt-4' style={{display: 'flex'}}>
                        <p style={{marginTop: '5px', fontWeight: 'bold'}}>Name</p>
                       <p style={{marginLeft: '250px', fontSize: '20px'}}>{selectedProfile.name}</p>
                    </div>
                    <hr />
                    <div className='profile-name mt-4' style={{display: 'flex'}}>
                        <p style={{marginTop: '5px', fontWeight: 'bold'}}>Profile Picture</p>
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
                    <hr />
                    <div className='profile-name mt-4' style={{display: 'flex'}}>
                        <p style={{marginTop: '5px', fontWeight: 'bold'}}>Gender</p>
                       <p style={{marginLeft: '240px', fontSize: '20px'}}>{selectedProfile.gender}</p>
                    </div>
                    <hr />
                    <div className='profile-name mt-4' style={{display: 'flex'}}>
                        <p style={{marginTop: '5px', fontWeight: 'bold'}}>Birthday</p>
                       <p style={{marginLeft: '230px', fontSize: '20px'}}>{selectedProfile.birthdate}</p>
                    </div>
                    <hr />
                    <div className='profile-name mt-4' style={{display: 'flex'}}>
                        <p style={{marginTop: '5px', fontWeight: 'bold'}}>Country</p>
                       <p style={{marginLeft: '235px', fontSize: '20px'}}>{selectedProfile.country}</p>
                    </div>
                </div>
                <br />
                <div style={{border: '1px solid grey', borderRadius: '8px', padding: '15px'}}>
                    <h3>Contact Info.</h3>
                    <div className='profile-name mt-4' style={{display: 'flex'}}>
                        <p style={{marginTop: '5px', fontWeight: 'bold'}}>Email ID</p>
                       <p style={{marginLeft: '230px', fontSize: '20px'}}>{selectedProfile.email}</p>
                    </div>
                    <hr />
                    <div className='profile-name mt-4' style={{display: 'flex'}}>
                        <p style={{marginTop: '5px', fontWeight: 'bold'}}>Phone No.</p>
                       <p style={{marginLeft: '210px', fontSize: '20px'}}>{selectedProfile.phone}</p>
                    </div>
                    
                </div>

                    {/* <div className='imgage-upload'  style={profileStyle}>
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
                        <div className='' style={{marginLeft: '50px', marginTop: '20px'}}>
                            <h3>{selectedProfile.name}</h3>
                            <p><span style={{color:'blue'}}>{selectedProfile.email}</span> - Administrator</p>
                            <p style={{marginTop: '-10px'}}>{selectedProfile.age}</p>
                            <p style={{marginTop: '-10px'}}>{selectedProfile.store[2]}</p>
                        </div>
                    </div> */}
                    {/* </div>
                    <section className='profile-content align-item center' >
                     <h2 style={{marginTop: '50px'}}>Account</h2>
                     <hr />
                     {selectedProfile && (
                        <div className='profile-details'>
                            <div className='profile-name mt-4' style={{display: 'flex'}}>
                                <h5><FaUserClock/> Name </h5>
                               <p style={profile}>{selectedProfile.name}</p>
                            </div>
                            <div className='profile-email mt-4' style={{display: 'flex'}}>
                            <h5><FaEnvelope/> Email</h5>
                            <p style={profile}>{selectedProfile.email}</p>
                            </div>
                            <div className='profile-phone mt-4' style={{display: 'flex'}}>
                            <h5><FaPhoneAlt/> Phone </h5>
                            <p style={profile}>{selectedProfile.phone}</p>
                            </div>
                            <div className='profile-name mt-4' style={{display: 'flex'}}>
                                <h5><FaUserClock/> Username </h5>
                               <p style={profile}>{selectedProfile.username}</p>
                            </div>
                            
                            <div className='profile-phone mt-4' style={{display: 'flex'}}>
                            <h5><FaGlobe/> Country </h5>
                            <p style={profile}>{selectedProfile.country}</p>
                            </div>
                            <div className='language mt-4' style={{ display: 'flex' }}>
    <h5><FaLanguage/> Language</h5>
    <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        style={profile}
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
                    </section> */}
                </div>
            </CCol>
        </CRow>
    )
}


export default Profile;

