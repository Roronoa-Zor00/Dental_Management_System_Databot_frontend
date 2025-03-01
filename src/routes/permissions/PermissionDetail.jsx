// src/routes/permissions/PermissionDetail.jsx
import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline,MdOutlineMarkEmailRead } from "react-icons/md";
import { CiMobile4 } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Dummy from '../../images/dummy.jpeg'

import { BiBorderRadius } from 'react-icons/bi';
import { FaUserNurse } from "react-icons/fa";
import { AuthService } from '../../api/AuthService';
import { useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const PermissionDetail = () => {
 const {id}=useParams()
  const [loading, setLoading] = useState(false);
  const [permission,setPermission]=useState({})
  const getPermissionDetailFunction = async (id) => {
    
  
    try {
         const result = await AuthService.getPermissionDetail(id);
        
         
        
        if(result?.data?.status == 200){
       
        
        setPermission(result?.data?.data)
          
        } 
        else {
        
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
    getPermissionDetailFunction(id)
  },[id])
 
  
 


// Function to handle delete action

  return (
    <div className='users-wrapper'>
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      {/* <ToastContainer /> */}
      
        <div className="user-details">
         

          <div className="text">
        <FaUserNurse />  {permission?.name}
          </div>
         
          
        </div>
    </div>
  )
}

export default PermissionDetail