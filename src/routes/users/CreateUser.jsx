// src/routes/users/CreateUser.jsx
import React ,{useState,useEffect}from 'react'
import { AuthService } from '../../api/AuthService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [userName,setUserName]=useState('')
  const [country,setCountry]=useState("")
  const [monthlyCases,setMonthlyCases]=useState('')
  const [mobileNumber,setMobileNumber]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [profile,setProfile]=useState(null)
  const [roles,setRoles]=useState([])
  const [permissions,setpermissions]=useState([])
  const [role,setRole]=useState('')
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const checkboxId = parseInt(id, 10); // Convert id to a number
  
    setSelectedCheckboxes((prevSelected) => {
      if (checked) {
        // Add the checkbox ID to the array if checked
        return [...prevSelected, checkboxId];
      } else {
        // Remove the checkbox ID from the array if unchecked
        return prevSelected.filter((prevId) => prevId !== checkboxId);
      }
    });
  };
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
         if(country){
          formData.append('country_name',country)
         }
         if(monthlyCases){
          formData.append('monthly_target_cases',monthlyCases)
         }
         
         if(mobileNumber){
          formData.append('mobile_number',mobileNumber)
         }
         if(profile){
          formData.append('profile_pic',profile)
         }
         if(password){
          formData.append('password',password)
         }
         if(confirmPassword){
          formData.append('password_confirmation',confirmPassword)
         }
         if(role){
          formData.append('role_id',role)
         }
         if(selectedCheckboxes){
          selectedCheckboxes?.map((id,index)=>{
            formData.append(`permissions[${index}]`,id)
          })
         }
        const result = await AuthService.addUser(formData);
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


   //get all roles
   const getAllRoles = async () => {
    
  
    try {
         const result = await AuthService.getRoles();
       
         
        
        if(result?.data?.status == 200){
        setRoles(result?.data?.data)
         
        
          
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
    getAllRoles()
  },[])

  //get all permissions
  const getAllPermissions = async () => {
    
  
    try {
         const result = await AuthService.getPermissions();
       
         
        
        if(result?.data?.status == 200){
        
          setpermissions(result?.data?.data)
        
          
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
    getAllPermissions()
  },[])
  return (
    <div className='form-wrapper'>
      <ToastContainer />
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      <div className="title">
        Create user
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
          <label htmlFor="">Email</label>
          <input type="text" className='input' value={email} onChange={(e)=>setEmail(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Monthly target (cases) <span>*</span></label>
          <input type="text" className='input' value={monthlyCases} onChange={(e)=>setMonthlyCases(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Country Name <span>*</span></label>
          <input type="text" className='input' value={country} onChange={(e)=>setCountry(e.target.value)}  />
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
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">User role</label>
          <select className="input" value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="">Please select role</option>
            {roles?.map((rol)=><option value={rol?.id} >{rol?.name}</option>)}
          </select>
          
        </div>
      </div>
      <div className="title">Permissions</div>
   
      <div className="permissions-wrapper">
        
        {permissions?.map((per)=><div className="checkboxx" key={per?.id}>
        <input
            type="checkbox"
            id={parseInt(per.id)}
            onChange={handleCheckboxChange}
           checked={selectedCheckboxes?.includes(parseInt(per.id))}
          />
          <label htmlFor={parseInt(per.id)}>{per.name}</label>
        </div>)}

       
        
      </div>

      <div className="d-flex justify-content-center my-3">
        <button className="button" onClick={createUserFunction}>Create user </button>
      </div>

    </div>
  )
}

export default CreateUser