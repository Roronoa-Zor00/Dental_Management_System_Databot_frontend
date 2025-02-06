// src/routes/reset-password/ResetPassword.jsx
import React ,{useState}from 'react'
import { AuthService } from '../../api/AuthService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/authcontext/AuthContext';
import { useContext } from 'react';

const ResetPassword = () => {
 const {updateUser}=useContext(AuthContext)
  const [oldPassword,setOldPassword]=useState('')
  const [loading, setLoading] = useState(false);
  const [password,setPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
 
  const navigate =useNavigate()
  const resetPasswordApi = async () => {
    
  
    try {
      const formData = new FormData()
    
         if(!oldPassword){
        toast.error("please enter old password", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
        
      else if(!password){
        toast.error("please enter new password", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
      else if(!newPassword){
        toast.error("please enter confirm new password", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
        
      

       else {
        setLoading(true)
      
         if(oldPassword){
          formData.append('old_password',oldPassword)
         }
       
         if(password){
          formData.append('password',password)
         }
         if(newPassword){
          formData.append('confirm_password',newPassword)
         }
        
        const result = await AuthService.updatePassword(formData);
    
        if(result?.data?.success == true){
       
         navigate('/login')
         toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
          
        });
       
          
        } 
        else {
          // if(result?.data?.success == "Unauthenticated.") {
          //   navigate('/login')
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
  return (
    <div className='login-wrapper'>
      <div className='form-wrapper'>
      <ToastContainer />
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      <div className="title">
        Reset Password
      </div>
      <div className="row">
       
        <div className="col-12 mb-4">
          <label htmlFor="">Type Old Password</label>
          <input type="password" className='input' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}  />
        </div>
        
        <div className="col-12 mb-4">
          <label htmlFor="">Password</label>
          <input type="password" className='input' value={password} onChange={(e)=>setPassword(e.target.value)}  />
        </div>
          
        <div className="col-12 mb-4">
          <label htmlFor="">Confirm Password</label>
          <input type="password" className='input' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  />
        </div>
      </div>

      <div className="d-flex justify-content-center my-3">
        <button className="button" onClick={resetPasswordApi}>Reset Now  </button>
      </div>

    </div>
    </div>
  )
}

export default ResetPassword