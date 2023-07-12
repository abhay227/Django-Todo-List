import React, { Link, useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import userInfoAtom from '../../recoil/userInfoAtom';

const LoginCard = () => {
    //global variable
    const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
    //local variables
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    // functions

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('username is :', usernameRef?.current?.value);
        console.log('password is :', passwordRef?.current?.value);


        const userCredentials = {
            username: usernameRef?.current?.value,
            password: passwordRef?.current?.value
        };
        fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userCredentials),
        }).then((response) => response.json()).then((data) => {
            console.log(data);
            if(data?.message === 'successfully logined'){
                localStorage.setItem('userStatus', true);
                setUserInfo(true);
            }else {
                localStorage.setItem('userStatus',false);
            }
        }).catch((error) => {
            console.log("Error", error);
        });
    };
    return (
        <div>
            <div className="login-card-container">
                <div>
                    <h1 className='login-heading'>TodoX</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <input className='Input-login' type="text" placeholder='Username' ref={usernameRef} />
                    <input className='Input-login' type="password" placeholder='Password' ref={passwordRef} />

                    <button className='Login-Button' type='submit'>
                        Login
                    </button>

                </form>
            </div>
        </div>
    );

};
export default LoginCard;