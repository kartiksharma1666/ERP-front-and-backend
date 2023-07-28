import React from 'react'
import { useState } from 'react'




export const Form = () => {
    const [showSignIn, setShowSignIn] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [number,setNumber] = useState('')

    const handleToggleSigns = () => {
        setShowSignIn((prev) => !prev)
    }

  


    return (
        <div className='form'>
            {!showSignIn ? (
                <div className='sign-in'>
                    <h2>Sign In</h2>
                    <p className='signs-desc'>Log into your existing account</p>
                    <form id="form" className='signin-form'>
                        <div className='username'>
                            <input type='text' placeholder='Username' value={username} onChange={(e) => setUserName(e.target.value)}></input>
                        </div>
                        <div className='password'>
                            <input type="text" placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)
                           console.log('Password', e.target.value) }}></input>
                        </div>
                        <button className='btn'>Sign In</button>
                        <p>Don't have an account?{' '}
                            <span onClick={handleToggleSigns}>SignUp</span>
                        </p>
                    </form>
                </div>)
                : (
                    <section className='register'>
                        <div className='sign-up'>
                            <h2>Sign Up</h2>
                            <p className='signs-desc'>Create an account with us</p>
                            <form id="form" className='signup-form'>
                                <div className='email'>
                                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className='username'>
                                    <input type='text' placeholder='Username' value={username} onChange={(e) => setUserName(e.target.value)}></input>
                                </div>
                                <div className='password'>
                                    <input type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className='confirm password'>
                                    <input type='text'  placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                </div>
                                <div className='number'>
                                    <input type='text' placeholder='Mobile Number' value={number} onChange={(e) => setNumber(e.target.value)}>
                                    </input></div>
                                <button>Sign Up</button>
                                <p>Already have an account?{" "}
                                    <span onClick={handleToggleSigns}>SignIn</span>
                                </p>
                            </form>
                        </div>
                    </section>
                )}
        </div>
    )
}
