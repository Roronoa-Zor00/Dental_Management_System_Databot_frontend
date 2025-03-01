// src/routes/history/Histoy.jsx
import React, { useEffect,useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import Dummy from '../../images/dummy.jpeg'
import DataTable from 'react-data-table-component';
import { BiBorderRadius } from 'react-icons/bi';
import { CaseService } from '../../api/CaseService';

import { AuthContext } from '../../components/authcontext/AuthContext';
import moment from 'moment';
import { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {Pagination} from 'react-laravel-paginex'
import { useParams } from 'react-router-dom';

const Histoy = () => {
  const { casestatus } = useParams();
  const {currentUser} = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const permissions =currentUser?.permissions
  const navigate = useNavigate();
  const [dataa,setDataa]=useState([])
  const [timerData, setTimerData] = useState({});
  
  const [loading, setLoading] = useState(false);
  const [isTimeRunningLow,setIsTimeRunningLow]=useState(false)
  const [data, setData] = useState([]);
 //Filters states
 const [caseid,setCaseid]=useState('')
 const [patientName,setPatientName]=useState('')
 const [clinicName,setClinicName]=useState('')
 const [dateFrom,setDateFrom]=useState('')
 const [dateTo,setDateTo]=useState('')
 const [caseType,setCaseType]=useState('')
 const [completed,setCompleted]=useState('')
  
  const getAllCases = async (value=1, caseid,completed,patientName) => {
    setData([])
    setDataa([])
    setLoading(true)
  
    try {
        let current_page = 1;
        if(value && value.page){
          current_page = value.page;
        }
        

         const result = await CaseService.getHistoryList(current_page,caseid,completed,patientName);
       
         
        
         if (result?.data?.status == 200) {
          setData(result.data.data)
          const transformedCases = result?.data?.data?.data?.map((item) => {
            const startDate = new Date(item?.start_date_time);
            const endTime = new Date(
              startDate.getTime() + (item?.expected_time !=null ? parseInt(item?.expected_time) * 60 * 60 * 1000 : 0)
                
            );
            const currentTime = new Date().getTime();
            let remainingTimeMs = endTime - currentTime;
  
            if (remainingTimeMs < 0) {
              remainingTimeMs = 0;
            }
  
            const hours = Math.floor(remainingTimeMs / (1000 * 60 * 60));
            const minutes = Math.floor(
              (remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((remainingTimeMs % (1000 * 60)) / 1000);
            const formattedRemainingTime = `${hours}h ${minutes}m ${seconds}s`;
         
           
            return {
              id: item?.guid,
              caseId: item?.case_id,
              status: item?.status,
              name: item?.name,
             
              gender: item?.gender,
              created: `${moment(item?.created_at).format(
                "ddd, MMM DD YYYY"
              )} :  ${moment(item?.created_at).format("HH:mm:ss")}`,
              
            };
          });
  
          setDataa(transformedCases);
          // setTimerData(transformedCases.reduce((acc, item) => ({ ...acc, [item.id]: item.remainingTime }), {}));
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
    getAllCases(1,caseid,completed,patientName)
  },[caseid,completed,patientName])
  //delete case 
 
   
    const columns = [
        {
            name: 'Case Id',
            selector: row => row.caseId,
            sortable: true,
        },
       
        {
          name: 'Case Status',
          selector: row => <span className='case-status-tag'>
          
          {row?.status == '1' ? 'New Case' : row?.status == '2' ? "In Planning" : row?.status == '3' ? "Ready for QA" : row?.status == '4' ? "Need More Info" : row?.status == '5' ? "Case updated by ortho" : row?.status == '6' ? "Rejected By QA" : row?.status == '7' ? "Pending Ortho Check" : row?.status == '8' ? "Need Modifications" : row?.status == '9' ? "Pending Step Files" : row?.status == '10' ? "Pending Container files" : row?.status == '11' ?  "Stl files ready" : row?.status == '12' ?  "Container files ready" : row?.status == '13' ? "Need Stl File Modifications" : row?.status == '14' ? "Need Container File Modifications" : row?.status == '15' ? "Pending direct printing files" :  row?.status == '16' ? 'Direct printing files ready': row?.status == '17' ? 'Need direct printing files Modifications' : row?.status == '18' ? 'Case completed': ''}
          
          
          </span>,
          sortable: true,
      },
      
     
        {
            name: 'Patient Name',
            selector: row => row.name,
            sortable: true,
        },
        
       
       
        {
          name: 'Case Created',
          selector: row => row.created,
          sortable: true,
      },
        
       
       
        {
            name: 'View History',
            
            cell: row => (
                <div className='icons__parent'>
                
                      <a title='View Case' className='button-icon' target='_blank'  href={`/history-detail/${row.id}`}>
                        <GrView   />
                    </a>
                   
                    
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
  
 


// Function to handle delete action

  return (
    <div className='users-wrapper'>
      {loading && <div className="loader-parent"><div className="_loader">
        
        </div></div>}
      {/* <ToastContainer /> */}
      <div className="search-filer-wrapper">
        
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="">Case id</label>
            <input className='input' type="text" placeholder='Search case by case id' value={caseid} onChange={(e)=>setCaseid(e.target.value)} />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Patient name</label>
            <input className='input' type="text" placeholder='Search  by patien name' value={patientName} onChange={(e)=>setPatientName(e.target.value)} />
            </div>
            {/* <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Clinic name</label>
            <input className='input' type="text" placeholder='Search clinic name' value={clinicName} onChange={(e)=>setClinicName(e.target.value)} />
            </div> */}
            {/* <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Date From</label>
            <input className='input' type="date"  value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)} />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Date To</label>
            <input className='input' type="date"  value={dateTo} onChange={(e)=>setDateTo(e.target.value)} />
            </div> */}
            {/* <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Case type</label>
            <select value={caseType} onChange={(e)=>setCaseType(e.target.value)} className="input">
              <option value="">Select case type</option>
              <option value="(3-3)">(3-3)</option>
            <option value="(5-5)">(5-5)</option>
            <option value="Full arch correction">Full arch correction </option>
            </select>
            
            </div> */}
            <div className="col-12 col-md-6 col-lg-3 mb-3">
            <label htmlFor="">Case status</label>
            <select value={completed} onChange={(e)=>setCompleted(e.target.value)} className="input">
              <option value="">Select </option>
              <option value="1">New Case</option>
            <option value="2">In Planning</option>
            <option value="3">Ready for QA</option>
            <option value="4">Need More Info</option>

            <option value="5">Case updated by ortho</option>
            <option value="6">Rejected By QA</option>
            <option value="7">Pending Ortho Check</option>
            <option value="8">Need Modifications</option>

            <option value="9">Pending Step Files</option>
            <option value="10">Pending Container files</option>
            <option value="11">Stl files ready</option>
            <option value="12">Container files ready</option>
            <option value="13">Need Stl File Modifications</option>
            <option value="14">Need Container File Modifications</option>
            <option value="15">Pending direct printing files</option>
            <option value="16">Direct printing files ready</option>
            <option value="17">Need direct printing files Modifications</option>
            <option value="18">Case completed</option>
            </select>
            
            </div>
          </div>
        </div>
      <div className="d-flex my-3">
        
       <div className="main-title mb-0">Case History</div>
        
      </div>
          <DataTable
			columns={columns}
			data={dataa}
           
		/>
    <Pagination changePage={getAllCases} data={data}/>
    </div>
  )
}

export default Histoy