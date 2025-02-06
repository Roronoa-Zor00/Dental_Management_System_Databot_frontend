// src/routes/subclients/CreateSubClient.jsx
import React ,{useState}from 'react'
import { SubClientService } from '../../api/SubClientsService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
const CreateSubClient = () => {
  const [loading, setLoading] = useState(false);
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [mobileNumber,setMobileNumber]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [profile,setProfile]=useState(null)
  const navigate =useNavigate()
  const handleProfile = (event)=>{
    const file = event.target.files[0];
    setProfile(file);
  }
  const createUserFunction = async () => {
    
  
    try {
      const formData = new FormData()
       if(!firstName){
        toast.error("please enter first name", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
       
        else if(!lastName){
        toast.error("please enter last name", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
        else if(!email){
        toast.error("please enter email", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
        else if(!mobileNumber){
        toast.error("please enter mobile number", {
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
        else if(!confirmPassword){
        toast.error("please re-enter password", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }

       else {
        setLoading(true)
        if(firstName){
          formData.append('first_name',firstName)
         }
         if(lastName){
          formData.append('last_name',lastName)
         }
         if(userName){
          formData.append('username',userName)
         }
         if(email){
          formData.append('email',email)
         }
        
         if(password){
          formData.append('password',password)
         }
         if(confirmPassword){
          formData.append('password_confirmation',confirmPassword)
         }
        const result = await SubClientService.addSubClient(formData);
        if(result?.data?.status == 200){
         toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
          
        });
        setTimeout(()=>{
          navigate('/sub-clients')
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
  return (
    <div className='form-wrapper'>
      <ToastContainer />
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      <div className="title">
        Create Sub client
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">First Name <span>*</span></label>
          <input type="text" className='input' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Last Name <span>*</span></label>
          <input type="text" className='input' value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">User id <span>*</span></label>
          <input type="text" className='input' value={userName} onChange={(e)=>setUserName(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Email <span>*</span></label>
          <input type="text" className='input' value={email} onChange={(e)=>setEmail(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Mobile Number</label>
          <input type="text" className='input' value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Password <span>*</span></label>
          <input type="text" className='input' value={password} onChange={(e)=>setPassword(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Retype Password <span>*</span></label>
          <input type="text" className='input' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Profile Image</label>
          <input type="file" className='input' onChange={handleProfile}  />
        </div>
      </div>

      <div className="d-flex justify-content-center my-3">
        <button className="button" onClick={createUserFunction}>Create now </button>
      </div>

    </div>
  )
}

export default CreateSubClient