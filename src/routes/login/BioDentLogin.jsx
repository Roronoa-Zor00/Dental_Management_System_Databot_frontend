// src/routes/login/BioDentLogin.jsx
import React ,{useState,useRef,useEffect}from 'react'
import { AuthService } from '../../api/AuthService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/authcontext/AuthContext';
import Logo from '../../images/bio.png'
import Video from '../../images/video.mp4'
import { useContext } from 'react';

const BioDentLogin= () => {
  const inputRef = useRef(null);
 const {updateUser}=useContext(AuthContext)
  const [email,setEmail]=useState('')
  const [loading, setLoading] = useState(false);
  const [password,setPassword]=useState('')
 
  const navigate =useNavigate()
  const loginApi = async (token) => {
    
  
    try {
      const formData = new FormData()
    
         if(!email){
        toast.error("please enter email", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
        
        else if(!password){
        toast.error("please enter password", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
      

       else {
        setLoading(true)
      
         if(email){
          formData.append('email',email)
         }
       
         if(password){
          formData.append('password',password)
         }
        
        const result = await AuthService.login(formData);
    
        if(result?.data?.success == true){
         localStorage.setItem("token",result?.data?.data?.user?.token)
         updateUser(result?.data?.data?.user)
         navigate('/dashboard')
         toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
          
        });
       
          
        } 
        else {
          // if(result?.data?.success == "Unauthenticated.") {
          //   navigate('/biodentlogin')
          // }
          toast.error(result?.data?.message, {
           
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            
          });
        }
        
       }
       
    } catch (error) {
      toast.error(error?.result?.data?.errors[0], {
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        
      });
     
      
    }
    finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        loginApi();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [loginApi]);
  return (
    <>
    {loading && <div className="loader-parent"><div className="_loader"></div></div>}
    <div className='login-wrapper login-main bio'>
    <video autoPlay loop muted className="background-video">
            <source src={Video} type="video/mp4" />
           
        </video>
      <div className='form-wrapper'>
      {/* <ToastContainer /> */}
     
      
      <div className="left-section">
       
        <div className="form-group">
          <label htmlFor="">User Id</label>
          <input type="text" className='input' value={email} onChange={(e)=>setEmail(e.target.value)}  />
        </div>
        
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input type="password" className='input' value={password} onChange={(e)=>setPassword(e.target.value)}  />
        </div>
        <div className="d-flex justify-content-center my-3">
        <button className="button" onClick={loginApi}>Login  </button>
      </div>
      <div className="copy-text mt-4">
      Powered by Clear Care Tech | Copyright © 2024 | All Rights Reserved
      </div>
      </div>
      <div className="right-section">
      <div className="image">
        <img src={Logo} alt="" srcset="" />
      </div>
        </div>
     
     

    </div>
    </div>
    </>
  )
}

export default BioDentLogin