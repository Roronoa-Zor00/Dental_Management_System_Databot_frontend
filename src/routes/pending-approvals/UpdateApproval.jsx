// src/routes/pending-approvals/UpdateApproval.jsx
import React ,{useState,useEffect}from 'react'
import { CaseService } from '../../api/CaseService';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate,useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "react-quill/dist/quill.snow.css";
const UpdateApproval = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cases,setCases]=useState([])
  const [caseId,setCaseId]=useState('')
  const [simulationLink,setSimulationLink]=useState('')
  const [IPRChart,setIPRChart]=useState(null)
  const [comments,setComments]=useState('')
  const [status,setStatus]=useState('')
 
  const navigate =useNavigate()
  const handleIPRChart = (event)=>{
    const file = event.target.files[0];
    setIPRChart(file);
  }
  const handleComment = (content, delta, source, editor) => {
    setComments(content);
  };
//get single approval detail
const getApprovalDetailFunction = async (id) => {
  try {
    const result = await CaseService.getPendingApprovalDetail(id);

    if (result?.data?.status == 200) {
     
      setCaseId(result?.data?.data?.p_case_id)
      setIPRChart(result?.data?.data?.ipr_chart)
      setComments(result?.data?.data?.comments)
      setSimulationLink(result?.data?.data?.simulation_link_url)
      setStatus(result?.data?.data?.status)
    } else {
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
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getApprovalDetailFunction(id);
}, [id]);
//get all cases here
const getAllCases = async () => {
    
  
    try {
         const result = await CaseService.getCases();
       
         
        
        if(result?.data?.status == 200){
        
          
       setCases(result?.data?.data?.data)
        
          
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
    getAllCases()
  },[])

  const updateApprovalFunction = async () => {
    
  
    try {
      const formData = new FormData()
       if(!caseId){
        toast.error("please select case first", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,
          
        });
       }
       
   

       else {
        setLoading(true)
        if(caseId){
          formData.append('p_case_id',caseId)
         }
         if(simulationLink){
          formData.append('simulation_link_url',simulationLink)
         }
         if(IPRChart){
          formData.append('ipr_chart',IPRChart)
         }
         if(comments){
          formData.append('comments',comments)
         }
         if(status){
          formData.append('status',status)
         }
       
        const result = await CaseService.updatePendingApproval(id,formData);
        if(result?.data?.status == 200){
         toast.success(result?.data?.message, {
          autoClose: 1000,
          pauseOnHover: true,
          draggable: true,
          
        });
        setTimeout(()=>{
          navigate('/approvals')
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
        Pending Approval
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Case Id</label>
          <select className='input' value={caseId}  onChange={(e)=>setCaseId(e.target.value)}>
           <option value="">Select case</option>
          {cases?.map((casee)=> <option value={casee?.id}>{casee?.case_id}</option>)}
          </select>
         
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Simulation Link</label>
          <input type="text" className='input' value={simulationLink} onChange={(e)=>setSimulationLink(e.target.value)}  />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">Status</label>
          <select name="" id="" className="input" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="1">Approve</option>
            <option value="0">Cancel</option>
          </select>
         
        </div>
        <div className="col-12 col-md-6 mb-4">
          <label htmlFor="">IPR Chart</label>
          <input type="file" className='input' onChange={handleIPRChart}  />
        </div>
        <div className="col-12 col-md-12 mb-4">
          <div className="form-group">
            <label htmlFor="">Comments </label>

            <ReactQuill value={comments} onChange={handleComment} />
          </div>
        </div>
        
       
      </div>

      <div className="d-flex justify-content-center my-3">
        <button className="button" onClick={updateApprovalFunction}>Create Approval </button>
      </div>

    </div>
  )
}

export default UpdateApproval