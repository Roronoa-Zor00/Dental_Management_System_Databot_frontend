// src/routes/teams/TeamDetail.jsx
import React, { useEffect,useState,useContext } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline,MdOutlineMarkEmailRead } from "react-icons/md";
import { CiMobile4 } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Dummy from '../../images/dummy.jpeg'
import Select from 'react-select';
import { BiBorderRadius } from 'react-icons/bi';
import { TeamService } from '../../api/TeamsService';
import { useParams } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { MdAssignmentInd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { AuthContext } from '../../components/authcontext/AuthContext';

const TeamDetail = () => {
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const permissions =currentUser?.permissions
 const {id}=useParams()
  const [loading, setLoading] = useState(false);
  const [team,setTeam]=useState({})

  const [modal,setModal]=useState(false)
  const [planners,setPlanners]=useState([])
  const [selectedIds, setSelectedIds] = useState([]);
  const [teamId,setTeamId]=useState('')
  const [tid,setTid]=useState('')
  const [userId,setUserId]=useState('')
  const [teams,setTeams]=useState([])

  //get all teams

  const getAllTeams = async () => {
    
  
    try {
         const result = await TeamService.getTeams();
       
         
        
        if(result?.data?.status == 200){
        setTeams(result?.data?.data)
          
        
        
          
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
    getAllTeams()
  },[])
  const getTeamDetailFunction = async (id) => {
    
  
    try {
         const result = await TeamService.getTeamDetail(id);
        
         
        
        if(result?.data?.status == 200){
       
        
        setTeam(result?.data?.data)
        setTeamId(result?.data?.data?.id)
          
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
    getTeamDetailFunction(id)
  },[id])
 
  
 //get planner and Quality checker
 const getPlannersandQcApi = async (id) => {
    
  
  try {
       const result = await TeamService.getPlannersandQc();
      
       
      
      if(result?.data?.status == 200){
     
      
      setPlanners(result?.data?.data)
     
        
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
  getPlannersandQcApi()
},[])

const options = planners?.map(user => ({
  value: user.id,
  label: `${user.first_name} ${user.last_name} (${user.role_name})`
}));
const handleChange = selectedOptions => {
  const ids = selectedOptions ? selectedOptions.map(option => option.value) : [];
  setSelectedIds(ids);
};
// Function to assign planner in team
const assignToTeam = async () => {
    
  setLoading(true)
  try {
    const formData = new FormData()
    if(teamId){
      formData.append('team_id',teamId)
    }
    if(selectedIds){
      selectedIds?.map((selc,index)=> {
        formData.append(`user_id[${index}]`,selc)
      })
    }
       const result = await TeamService.assignPlannerTOTeam(formData);
      
       
      
      if(result?.data?.status == 200){
     setSelectedIds([])
     getTeamDetailFunction(id)
      
        toast.success(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
     
        
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

//remove team member


const removeTeamMember = async (idd) => {
    
  setLoading(true)
  try {
    const formData = new FormData()
    if(id){
      formData.append('user_id',idd)
    }
  
       const result = await TeamService.removeMember(formData);
      
       
      
      if(result?.data?.status == 200){
   
     getTeamDetailFunction(id)
      
        toast.success(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
     
        
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
//open modal

const openModal = (id)=>{
  setUserId(id)
  setModal(true)
}
//assign team 

const assignTeam = async () => {
    
  setLoading(true)
  try {
    const formData = new FormData()
    if(tid){
      formData.append('team_id',tid)
    }
  
    if(userId){
      formData.append('user_id[]',userId)
    }
       const result = await TeamService.assignTeamApi(formData);
      
       
      
      if(result?.data?.status == 200){
   
     getTeamDetailFunction(id)
      setModal(false)
        toast.success(result?.data?.message, {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
     
        
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

const api_url = process.env.REACT_APP_API_URL


  return (
    <div className='users-wrapper'>
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      <ToastContainer />
      {modal && <div className='modal-main'>
        <div className="modal-wrapper change-pass">
        <div className="close" onClick={()=>setModal(false)}>
          <IoCloseOutline />
        </div>
        
        <div className="form-group mb-3">
        <label htmlFor="">Assign Team</label>
          <select name="" className='input' value={tid} onChange={(e)=>setTid(e.target.value)}>
            <option value="">Select team</option>
            {teams?.map((team)=><option value={team?.id}>{team?.name}</option>)}
          </select>
        </div>
      
        <div className='text-center'>
          <button className="button" onClick={()=>{assignTeam()}}>Assign</button>
        </div>
        </div>
        
        </div>}
        <div className="user-details">
         

          <div className="text">
        <FaUserNurse />  {team?.name}
          </div>
          {permissions?.includes("teams-assings-to-users") && <div className="assign-users">
          {team?.users?.length > 0 && <div className="title">Team Members   </div>}
          <div className="team-members-wrapper">
             {team?.users?.map((user)=> <div className="user">
              <div className='left'>
              <div className="image">
                {user?.profile_pic ? <img src={`${api_url}/uploads/${user?.profile_pic}`} /> : <img src={Dummy} />}
              </div>
              <div className="name">  {user?.first_name} {user?.last_name} ({user?.role_name})</div>
              </div>
              <div className="icons">
                 <div className="icon" onClick={()=>removeTeamMember(user?.id)}>
                  <FaRegTrashCan style={{color:'red'}} />
                 </div>
                 <div className="icon" onClick={()=>openModal(user?.id)}>
                    <MdAssignmentInd />
                 </div>
              </div>
             </div> )}
          </div>
               <div className="title">Add planners to <span>{team?.name}</span> </div>
               <div className='row'>
                 <div className="col-12 col-md-8">
                 <Select
               className='input'
        isMulti
        options={options}
        onChange={handleChange}
      />
                 </div>
               </div>
             {selectedIds?.length > 0 && <div className="d-flex my-3">
                <button className="button" onClick={()=>assignToTeam()}>Add now</button>
               </div>}
               
               
</div>}
         
          
        </div>

        
    </div>
  )
}

export default TeamDetail