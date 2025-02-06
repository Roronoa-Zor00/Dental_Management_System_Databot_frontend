// src/routes/teams/CreateTeam.jsx
import React ,{useState}from 'react'
import { TeamService } from '../../api/TeamsService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
const CreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const [name,setName]=useState('')
 
  const navigate =useNavigate()
 
  const createTeamApi = async () => {
    
  
    try {
      const formData = new FormData()
       if(!name){
        toast.error("please enter  name", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
       
       

       else {
        setLoading(true)
        if(name){
          formData.append('name',name)
         }
       
        const result = await TeamService.createTeam(formData);
        if(result?.data?.status == 200){
         toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
          
        });
        setTimeout(()=>{
          navigate('/teams')
        },1300)
          
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
        Create Team
      </div>
      <div className="row">
        <div className="col-12 col-md-12 mb-4">
          <label htmlFor="">Enter name</label>
          <input type="text" className='input' value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        
      </div>

      <div className="d-flex justify-content-center my-3">
        <button className="button" onClick={createTeamApi}>Create Team </button>
      </div>

    </div>
  )
}

export default CreateTeam