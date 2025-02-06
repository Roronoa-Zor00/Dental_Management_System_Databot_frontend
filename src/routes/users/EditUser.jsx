// src/routes/users/EditUser.jsx
import React ,{useState,useEffect,useContext}from 'react'
import { AuthService } from '../../api/AuthService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate,useParams } from 'react-router-dom';
import { AuthContext } from "../../components/authcontext/AuthContext";
const EditUser = () => {
  const {id}=useParams()
 
  const [loading, setLoading] = useState(false);
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
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
   const [isHours,setIsHours]=useState('')
  const navigate =useNavigate()
  const handleProfile = (event)=>{
    const file = event.target.files[0];
    setProfile(file);
  }
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.role_name
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
  
  const getUserDetailFunction = async (idd) => {
    
  
    try {
         const result = await AuthService.getUserDetail(idd);
         
        
        if(result?.data?.status == 200){
       
        
       
        // setUser(result?.data?.data)
        setFirstName(result?.data?.data?.first_name)
        setLastName(result?.data?.data?.last_name)
        setEmail(result?.data?.data?.email)
        setUserName(result?.data?.data?.username)
        setCountry(result?.data?.data?.country_name)
        setMonthlyCases(result?.data?.data?.monthly_target_cases)
        setMobileNumber(result?.data?.data?.mobile_number)
        setIsHours(result?.data?.data?.is_8_hours_enabled)
       setRole(result?.data?.data?.roles[0]?.id)
        result?.data?.data?.roles[0]?.permissions?.forEach((per) => {
          setSelectedCheckboxes((prevSelected) => {
            const newSelected = new Set(prevSelected); // Convert array to Set
            newSelected.add(parseInt(per.id)); // Add new ID
            return Array.from(newSelected); // Convert Set back to array
          });
        });
        
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
  },[])

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
  const updateUserFunction = async () => {
    
  
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
         if(isHours) {
          
          formData.append('is_8_hours_enabled',isHours)
         }
         if(selectedCheckboxes){
          selectedCheckboxes?.map((id,index)=>{
            formData.append(`permissions[${index}]`,id)
          })
         }
        const result = await AuthService.updateUser(id,formData);
     
        if(result?.data?.status == 200){
         toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
          
        });
        // setTimeout(()=>{
        //   navigate('/users')
        // },1300)
          
        } 
        else {
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
        Update user
      </div>
      {userType == 'super_admin' &&  <div className="allow-times">
        <div className="inner">
          <div className="for-group">
          <label htmlFor="">Express setup delivery allowed for this user? <span>*</span></label>
         <select name="" id="" className='input' value={isHours} onChange={(e)=>setIsHours(e.target.value)}>
          <option value="">Select below</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
         </select>
          </div>
        </div>
      </div>}
     
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
          <label htmlFor="">User Id <span>*</span></label>
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
        <button className="button" onClick={updateUserFunction}>Update user </button>
      </div>
      

    </div>
  )
}

export default EditUser