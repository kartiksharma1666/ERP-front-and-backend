import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Form = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [number, setNumber] = useState('');

  const handleToggleSigns = () => {
    setShowSignIn((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault()
    // Perform sign-in logic here...
    // For now, let's just navigate to '/Layout' when the "Sign In" button is clicked
    navigate('/Layout');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform sign-up logic here...
  };

  return (
    <>
      <div className='form form-content'>
        { !showSignIn ? (
          <div className='sign-in'>
            <h2>Sign In</h2>
            <p className='signs-desc'>Log into your existing account</p>
            <form id='form' className='signin-form' onSubmit={handleSignIn}>
              <div className='username'>
                <input
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className='password'>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    console.log('Password', e.target.value);
                  }}
                />
              </div>
              <button className='btn' type='submit'>Sign In</button>
              <p>
                Don't have an account?{' '}
                <span onClick={handleToggleSigns}>SignUp</span>
              </p>
            </form>
          </div>
        ) : (
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
    </>
  );
};