import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CForm, CFormLabel, CFormInput, CFormSelect, CFormText, CFormCheck, CButton } from '@coreui/react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

const CompanyProfile = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      company: '',
      location: '',
      postalcode: ''
    })

    const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const errors = {}

    // Validate email
    if (!data.firstname) {
      errors.firstname = 'Firstname is required'
    } 

    if (!data.lastname) {
      errors.lastname= 'Lastname is required'
    } 

    if (!data.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address'
    }

    if (!data.gender) {
      errors.gender= 'Gender is required'
    } 

    if (!data.company) {
      errors.company= 'Company Name is required'
    } 

    if (!data.location) {
      errors.location= 'Company Location is required'
    } 

    if (!data.postalcode) {
      errors.postalcode= 'Postal Code is required'
    } 

    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Perform form validation
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      storeUserInfo(formData)
      console.log('Form is valid, submit data:', formData)
    } else {
      // Form is invalid, set errors state to display validation messages
      setErrors(validationErrors)
    }
  }

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({});

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

    return (
      <>
      <h2 style={{color: 'blue'}}>Company Profile</h2><hr />
      <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel>First Name</CFormLabel>
          <CFormInput
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            autoComplete="firstname"
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            autoComplete="lastname"
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Email ID</CFormLabel>
          <CFormInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            autoComplete="email"
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Gender</CFormLabel>
          <CFormSelect
            name="gender"
            value={formData.gender}
            onChange={handleChange} 
            aria-label="Default select example">
            <option>Select Gender</option>
            <option value="1">Female</option>
            <option value="2">Male</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel>Company</CFormLabel>
          <CFormInput
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            autoComplete="company"
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Location</CFormLabel>
          <CFormInput
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            autoComplete="location"
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Postal Code</CFormLabel>
          <CFormInput
            name="postalcode"
            value={formData.postalcode}
            onChange={handleChange}
            placeholder="Postal Code"
            autoComplete="postalcode"
          />
        </div>
      </CForm>
      <br />

      <CButton onClick={() => navigate('/Dashboard')} type="submit" color="primary">
        Submit
      </CButton>
      </>
    );
};

export default CompanyProfile;