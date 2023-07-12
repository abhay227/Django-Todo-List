
import { Routes, Route, Link, Navigate } from "react-router-dom"
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { useRecoilState } from "recoil";
import userInfoAtom from "./recoil/userInfoAtom";
import { useEffect } from "react";
function App() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  useEffect(()=>{
    if(localStorage?.getItem('userStatus')?.includes('true')){
      setUserInfo(true);
    }else {
      setUserInfo(false);
    }
  },[localStorage?.getItem('userStatus')]);
  return (
    <div>
      <Routes>
        <Route path="/" element={ userInfo === true ? <Home/> : <Navigate to='/login'/>}
         />
        <Route path="/login" element={ userInfo === false ? <Login/> : <Navigate to='/'/>}
        />
      </Routes>
    </div>
  );
}

export default App;
