import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    Rpassword: '',
  })

  const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const errors = {}

    // Validate email
    if (!data.username) {
      errors.username = 'Username is required'
    } else if (data.username.length < 5) {
      errors.username = 'Invalid username , more than 5 characters'
    }

    if (!data.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address'
    }

    // Validate password
    if (!data.password) {
      errors.password = 'Password is required'
    } else if (data.password.length < 8) {
      errors.password = 'Invalid Password , more than 8 characters'
    } else if (data.Rpassword && data.Rpassword != data.password) {
      errors.Rpassword = "Password dosen't match"
    }

    if (data.password && !data.Rpassword) {
      errors.Rpassword = 'Please enter password again'
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

  const storeUserInfo = (formData) => {
    // The URL of the backend node endpoint you want to POST to
    const url = 'http://localhost:8080/api/auth/signup'

    // Data to be sent in the POST request (replace this with your actual data)
    const postData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }

    // Options for the POST request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(postData), // Convert the data to JSON format
    }

    // Sending a GET request using fetch
    fetch(url, requestOptions)
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          console.log(response)
        }
        //redirect to login page

        // Parse the response data as JSON (optional, if expecting a response)
        return response.json()
      })
      .then((data) => {
        if (data.status == 'success') {
          navigate('/login')
        }
        // Handle the response data here (optional, if expecting a response)
        console.log('Response:', data)
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error.message)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Sign Up</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </CInputGroup>
                  {errors.username && <div className="errors">{errors.username}</div>}
                  <CInputGroup className="mt-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  {errors.email && <div className="errors">{errors.email}</div>}
                  <CInputGroup className="mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.password && <div className="errors">{errors.password}</div>}
                  <CInputGroup className="mt-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="Rpassword"
                      value={formData.Rpassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.Rpassword && <div className="errors">{errors.Rpassword}</div>}
                  <div className="d-grid">
                    <CButton type="submit" className="mt-4" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
