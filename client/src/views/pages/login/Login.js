import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Cookies from 'universal-cookie'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const Login = () => {
  const cookies = new Cookies()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [jwtToken, setJwtToken] = useState(null)
  const [errors, setErrors] = useState({})

  const validateForm = (data) => {
    const errors = {}

    // Validate email
    if (!data.username) {
      errors.username = 'Username is required'
    } else if (data.username.length < 5) {
      errors.username = 'Invalid username , more than 5 characters'
    }

    // if (!data.email) {
    //   errors.email = 'Email is required'
    // } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    //   errors.email = 'Invalid email address'
    // }

    // Validate password
    if (!data.password) {
      errors.password = 'Password is required'
    } else if (data.password.length < 8) {
      errors.password = 'Invalid Password , more than 8 characters'
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
      // Form is valid, handle form submission here (e.g., API call, etc.)
      Authentication(formData)
      console.log('Form is valid, submit data:', formData)
    } else {
      // Form is invalid, set errors state to display validation messages
      setErrors(validationErrors)
    }
  }

  const Authentication = (formData) => {
    const url = 'http://localhost:8080/api/auth/signin'

    // Data to be sent in the POST request (replace this with your actual data)
    const postData = {
      username: formData.username,
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
        const accessToken = data.accessToken

        const user = jwt_decode(accessToken)
        console.log('User info:', formData)

        // Store the JWT in an HttpOnly cookie (secure and inaccessible from JavaScript)
        cookies.set('jwtToken', accessToken, { expires: new Date(user.exp * 1000) })

        setJwtToken(accessToken)
        // navigate('/Profile', { profileData: user } );
        // console.log("user info",user)

        navigate('/Dashboard')

        // Decode the JWT to get user information (optional)

        // Handle the response data here (optional, if expecting a response)
        // console.log('Response:', user)
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error.message)
      })
  }
  useEffect(() => {
    if (cookies.get('jwtToken')) {
      navigate('/Dashboard')
    } else {
      console.log('goes here')
    }
  }, [])
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    {errors.username && <div className="errors">{errors.username}</div>}

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    {errors.password && <div className="errors">{errors.password}</div>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4 mt-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    
                    <p>
                      Welcome to our comprehensive ERP solution designed to streamline your business
                      processes and enhance efficiency. Sign up now to access a world of integrated
                      tools and features tailored to your organization's needs.
                    </p>

                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
