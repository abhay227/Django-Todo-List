import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useNavigate } from 'react-router-dom';
// recoil js
import { useRecoilState } from 'recoil';
import userInfoAtom from '../../recoil/userInfoAtom';
import addTaskAtom from '../../recoil/addTaskAtom';
import { useEffect } from 'react';
const Header = () => {
  // Global variables
  const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  useEffect(()=>{
    console.log(addTaskOverlay);
  },[addTaskOverlay])
  const navigate= useNavigate();
  return (
    <header>
      <div className='home-header-container'>
        <div>
          <h1 className='header-logo-text'>TodoX</h1>
        </div>

        <div className='butn-container'>
          <button className='add-new-button' onClick={()=>{
            if(addTaskOverlay){
              setAddTaskOverlay(null);
            }else{
              setAddTaskOverlay(true);
            }
          }}>
            <span><AddIcon /></span>New
          </button>
          <button className="add-new-button" onClick={()=>{
            localStorage?.clear();
            setUserInfo(false);
            navigate('/login');
          }}>
            <ExitToAppRoundedIcon />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header