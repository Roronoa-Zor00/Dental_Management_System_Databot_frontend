// src/routes/notifications/UserDetail.jsx
import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline,MdOutlineMarkEmailRead } from "react-icons/md";
import { CiGlobe, CiMobile4 } from "react-icons/ci";

import { Link } from 'react-router-dom';
import Dummy from '../../images/dummy.jpeg'
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { BiBorderRadius } from 'react-icons/bi';
import { PiTargetThin } from "react-icons/pi";
import { FaUserNurse } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { AuthService } from '../../api/AuthService';
import { useParams,useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const UserDetail = () => {
  const navigate =useNavigate()
 const {id}=useParams()
 const [modal,setModal]=useState(false)
 const [password,setPassowrd]=useState('')
 const [cpassword,setcPassowrd]=useState('')
 const [userId,setUserId]=useState('')
  const [loading, setLoading] = useState(false);
  const [user,setUser]=useState({})
  const getUserDetailFunction = async (id) => {
    
  
    try {
         const result = await AuthService.getUserDetail(id);
         
        
        if(result?.data?.status == 200){
       
        
        setUser(result?.data?.data)
        setUserId(result?.data?.data?.id)
          
        } 
        else {
          if(result?.data?.message == "Unauthenticated.") {
            navigate('/login')
          }
          toast.error(result?.data?.message, {
           
            autoClose: 2000,
            pauseOnHover: true,
            draggable: true,
            
          });
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


  
  useEffect(()=>{
    getUserDetailFunction(id)
  },[id])
 
  //update password function

  const updatePasswordFunction = async () => {
    
  
    try {
      const formData = new FormData()
       if(!password){
        toast.error("please enter password", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
       
       

       else {
        setLoading(true)
        if(password){
          formData.append('password',password)
         }
         if(cpassword){
          formData.append('password_confirmation',cpassword)
         }
         if(userId){
          formData.append('user_id',userId)
         }
         
        const result = await AuthService.updatePasswordByAdmin(formData);
        
        if(result?.data?.status == 200){
        
         toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
          
        });
        setTimeout(()=>{
          navigate('/users')
        },1300)
          
        } 
        else {
          if(result?.data?.success == "Unauthenticated.") {
            navigate('/login')
          }
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


  const api_url = process.env.REACT_APP_API_URL
 


// Function to handle delete action

  return (
    <div className='users-wrapper'>
      {modal && <div className='modal-main'>
        <div className="modal-wrapper change-pass">
        <div className="close" onClick={()=>setModal(false)}>
          <IoCloseOutline />
        </div>
        <div className="title">Update password</div>
        <div className="form-group mb-3">
        <label htmlFor="">Password</label>
          <input type="text" className='input' placeholder='Enter password here' value={password} onChange={(e)=>setPassowrd(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="">Confirm password</label>
          <input type="text" className='input' placeholder='Enter password here' value={cpassword} onChange={(e)=>setcPassowrd(e.target.value)} />
        </div>
        <div className='text-center'>
          <button className="button" onClick={()=>{updatePasswordFunction()}}>Update</button>
        </div>
        </div>
        
        </div>}
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      {/* <ToastContainer /> */}
      
        <div className="user-details">
          <div className="profile">
          <div className="change-password-wrapper">
            <button className="button" onClick={()=>setModal(true)}>
              Update password for user
            </button>
          </div>
            {user?.profile_pic ? <img src={`${api_url}/uploads/${user.profile_pic}`} /> : <img src={Dummy} />}
          </div>

          <div className="text">
        <FaUserNurse />  {user?.username}
          </div>
          <div className="text">
        <MdOutlineMarkEmailRead />  {user?.email}
          </div>
          <div className="text">
          <PiTargetThin />Monthly Target :  {user?.monthly_target_cases} cases
          </div>
          <div className="text">
        <CiMobile4 />  {user?.mobile_number}
          </div>
          <div className="text">
          <CiGlobe />Country :  {user?.country_name}
          </div>
          <div className="text">
        <MdOutlineAdminPanelSettings />Role :  {user?.role_name}
          </div>
          <div className="text">
        
          </div>
          <div className="text">
        <GrUserAdmin  />  Permissions
          </div>
         <div className="permissons-allowed">
          <ul>
            {user?.permissions?.map((per)=><li>{per}</li>)}
          </ul>
         </div>
          
        </div>
    </div>
  )
}

export default UserDetail