import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUserClock, FaPhoneAlt, FaGlobe, FaLanguage } from 'react-icons/fa';
import { CRow, CCol } from '@coreui/react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [languages] = useState(['English', 'Spanish', 'French', 'German']);

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
    };

    return (
        <CRow>
            <CCol xs={20}>
                <div className='profile-container'>
                    <h1>Profile</h1>
                    <br />
                    <div style={{ border: '1px solid grey', borderRadius: '8px', padding: '15px', color: 'g' }}>
                        <h3>Basic Info.</h3>
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Name</p>
                            <p style={{ marginLeft: '250px', fontSize: '20px' }}>{selectedProfile.username}</p>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Gender</p>
                            <input
                                type='text'
                                name='gender'
                                value={selectedProfile.gender}
                                onChange={handleInputChange}
                            />
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Birthday</p>
                            <input
                                type='text'
                                name='birthdate'
                                value={selectedProfile.birthdate}
                                onChange={handleInputChange}
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
                            />
                        </div>
                    </div>
                    <br />
                    <div style={{ border: '1px solid grey', borderRadius: '8px', padding: '15px' }}>
                        <h3>Contact Info.</h3>
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Email ID</p>
                            <p style={{ marginLeft: '230px', fontSize: '20px' }}>{selectedProfile.email}</p>
                        </div>
                        <hr />
                        <div className='profile-name mt-4' style={{ display: 'flex' }}>
                            <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Phone No.</p>
                            <input
                                type='text'
                                name='phone'
                                value={selectedProfile.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Save Changes</button>
                </div>
            </CCol>
        </CRow>
    );
};

export default Profile;
