// src/routes/subclients/SubClientDetail.jsx
import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline,MdOutlineMarkEmailRead } from "react-icons/md";
import { CiMobile4 } from "react-icons/ci";
import { SubClientService } from '../../api/SubClientsService';
import { Link } from 'react-router-dom';
import Dummy from '../../images/dummy.jpeg'
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { BiBorderRadius } from 'react-icons/bi';
import { FaUserNurse } from "react-icons/fa";
import { AuthService } from '../../api/AuthService';
import { useParams,useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const SubClientDetail = () => {
  const navigate =useNavigate()
 const {id}=useParams()
  const [loading, setLoading] = useState(false);
  const [user,setUser]=useState({})
  const getUserDetailFunction = async (id) => {
    
  
    try {
         const result = await SubClientService.getSubClientDetail(id);
         
        
        if(result?.data?.status == 200){
       
        
        setUser(result?.data?.data)
          
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
 
  const api_url = process.env.REACT_APP_API_URL
  
 


// Function to handle delete action

  return (
    <div className='users-wrapper'>
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      <ToastContainer />
      
        <div className="user-details">
          <div className="profile">
          
            {user?.profile_pic ? <img src={`${api_url}/uploads/${user.profile_pic}`} /> : <img src={Dummy} />}
          </div>

          <div className="text">
        <FaUserNurse />  {user?.username}
          </div>
          <div className="text">
        <MdOutlineMarkEmailRead />  {user?.email}
          </div>
          <div className="text">
        <CiMobile4 />  {user?.mobile_number}
          </div>
          <div className="text">
        <MdOutlineAdminPanelSettings />Role :  {user?.role_name}
          </div>
          <div className="text">
        <GrUserAdmin  />  Permissions
          </div>
         <div className="permissons-allowed">
          <ul>
            {user?.permissions?.map((per,id)=><li>{id+1}. {per}</li>)}
          </ul>
         </div>
          
        </div>
    </div>
  )
}

export default SubClientDetail