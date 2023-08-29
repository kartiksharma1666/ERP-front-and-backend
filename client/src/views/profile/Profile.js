import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUserClock, FaPhoneAlt, FaGlobe, FaLanguage,FaEdit } from 'react-icons/fa';
import { CRow, CCol, CButton } from '@coreui/react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [languages] = useState(['English', 'Spanish', 'French', 'German']);
    const [showEditPage,setEditPage] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

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

    const handleClickEditPage = () => {
     setEditPage(true)
    }

    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get('jwtToken')) {
            const jwtToken = cookies.get('jwtToken');
            const user = jwt_decode(jwtToken);
            setUser(user);
            fetch('http://localhost:8080/api/test/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'x-access-token': jwtToken,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error.message);
                });
        } else {
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        if (userData.length > 0 && user) {
            const matchingUser = userData.find((data) => data._id === user.id);
            setSelectedProfile(matchingUser);
        }
    }, [userData, user]);

    const handleSubmit = () => {
        fetch('http://localhost:8080/api/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedProfile),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Profile updated successfully', data);
            })
            .catch((error) => {
                console.error('Error updating profile:', error.message);
            });

            setEditPage(false)
    };

    return (
        <CRow>
            <CCol xs={20}>
                {!showEditPage ? (<div>
                    <div className='profile-container'>
                     <h2 style={{color: 'blue'}}>Profile</h2>
                    <br />
                    <div className='profile-heading'>
                        <h4>Basic Info.</h4>
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p className='attributes'>Name</p>
                            <span className='info' style={{marginLeft: '250px'}}>{selectedProfile.username}</span>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p className='attributes'>Profile Picture</p>
                            <label htmlFor='image-upload' className='add-img ms-4' title='Add a profile photo'>
                                {selectedImage ? (
                                    <img className="_aadp" src={selectedImage} alt='Uploaded' />
                                ) : (
                                    <img className="_aadp" src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt='Default' />
                                )}
                            </label>
                            <input
                                id='image-upload'
                                type='file'
                                accept='image/*'
                                onChange={handleImageChange}
                                style={{ display: 'none' }} />
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p className='attributes'>Gender</p>
                            <span className='info' style={{marginLeft: '240px'}}>{selectedProfile.gender}</span>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p className='attributes'>Birthday</p>
                            <span className='info' style={{marginLeft: '230px'}}>{selectedProfile.birthdate}</span>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p className='attributes'>Country</p>
                            <span className='info' style={{marginLeft: '230px'}}>{selectedProfile.country}</span>
                        </div>
                        <hr />
                    </div>
                    <br />
                    <div className='profile-heading'>
                        <h4>Contact Info.</h4>
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p className='attributes'>Email ID</p>
                            <span className='info' style={{marginLeft: '230px'}}>{selectedProfile.email}</span>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p className='attributes'>Phone No.</p>
                            <span className='info' style={{marginLeft: '210px'}}>{selectedProfile.phone}</span>
                        </div>
                    </div>
                    </div>
                    <br />
                    <div>
                    <CButton 
                   className='profile-button'
                    onClick={handleClickEditPage}><FaEdit />  Edit Profile</CButton>
                    </div>
                </div>) 
                : 
                (
                    (<div className='edit-profile-container'>
                    <h1>Profile</h1>
                    <br />
                    <div style={{ border: '1px solid grey', borderRadius: '8px', padding: '15px', color: 'g' 
                , background: '#fff'}}>
                        <h3>Basic Info.</h3>
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Name</p>
                            <p style={{ marginLeft: '100px', fontSize: '20px' }}>{selectedProfile.username}</p>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Gender</p>
                            <input
                                type='text'
                                name='gender'
                                value={selectedProfile.gender}
                                onChange={handleInputChange}
                                className='profile-inputs'
                            />
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Birthday</p>
                            <input
                                type='date'
                                name='birthdate'
                                value={selectedProfile.birthdate}
                                onChange={handleInputChange}
                                className='profile-inputs'
                            />
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Country</p>
                            <input
                                type='text'
                                name='country'
                                value={selectedProfile.country}
                                onChange={handleInputChange}
                                className='profile-inputs'
                            />
                        </div>
                    </div>
                    <br />
                    <div style={{ border: '1px solid grey', borderRadius: '8px', padding: '15px',
                background: '#fff' }}>
                        <h3>Contact Info.</h3>
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Email ID</p>
                            <p style={{ marginLeft: '100px', fontSize: '20px' }}>{selectedProfile.email}</p>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Phone No.</p>
                            <input
                                type='text'
                                name='phone'
                                value={selectedProfile.phone}
                                onChange={handleInputChange}
                                className='profile-inputs'
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmit} className='profile-button'>Save Changes</button>
                </div>)
                )}
            </CCol>
        </CRow>
    );
};

export default Profile;
