// src/components/Sidebar.jsx/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUsers } from "react-icons/hi2";
import { FaUserCheck } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { GoWorkflow, GoBell } from "react-icons/go";

import userImage from '../../images/logo.jpeg'
import userImagez from '../../images/smilez.png'
import { CiMedicalCase } from "react-icons/ci";
import { TbUsers } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import { AuthService } from '../../api/AuthService';
import { GoHistory, GoGlobe } from "react-icons/go";
import { NotificationService } from '../../api/NotificationService';
import { IoCloseOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { useContext } from 'react';
import { AuthContext } from '../authcontext/AuthContext';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const Sidebar = () => {
  const { currentUser, updateUser, isReadNot, updateIsReadNot } = useContext(AuthContext)
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState({})
  const [tab, setTab] = useState('')
  const [reload, setReload] = useState(0);
  const [modal, setModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const userType = currentUser?.role_name
  const guid = currentUser?.guid
  const id = currentUser?.id

  const permissions = currentUser?.permissions
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    updateUser(null)
    if (user?.id == '93' || user?.client_id == '93') {
      navigate('/biodentlogin')

    }
    else if (user?.id == '98' || user?.client_id == '98') {
      navigate('/cleverlogin')

    }
    else if (user?.id == '114' || user?.client_id == '114') {
      navigate('/wesmilelogin')

    }
    else if (user?.id == '115' || user?.client_id == '115') {
      navigate('/mysmartalignlogin')

    }
    else if (user?.id == '134' || user?.client_id == '134') {
      navigate('/smilezylogin')

    }
    else if (user?.id == '135' || user?.client_id == '135') {
      navigate('/darrenlogin')

    }
    else if (user?.id == '151' || user?.client_id == '151') {
      navigate('/drabhisheklogin')

    }

    else {
      navigate('/login')
    }


  }
  const getUserDetailFunction = async (idd) => {


    try {
      const result = await AuthService.getUserDetail(idd);



      if (result?.data?.status == 200) {

        setLoaded(true)

        // setUser(result?.data?.data)
        setUser(result?.data?.data)



      }
      else {
        if (result?.data?.message == "Unauthenticated.") {
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




  useEffect(() => {

    getUserDetailFunction(guid)
  }, [isReadNot])
  //get notifications api call
  const getNotificationsList = async () => {


    try {
      const result = await NotificationService.getNotifications();



      if (result?.data?.status == 200) {
        setNotifications(result?.data?.data?.data)




      }
      else {
        if (result?.data?.message == "Unauthenticated.") {
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


  useEffect(() => {

    getNotificationsList()
  }, [isReadNot])

  const handleProfile = (event) => {
    const file = event.target.files[0];
    setProfile(file);
  }

  const updateProfileFunction = async () => {


    try {
      const formData = new FormData()
      if (!profile) {
        toast.error("upload profile first", {
          autoClose: 2000,
          pauseOnHover: true,
          draggable: true,

        });
      }



      else {
        setLoading(true)
        if (profile) {
          formData.append('profile_pic', profile)
        }

        if (currentUser?.id) {
          formData.append('user_id', currentUser?.id)
        }

        const result = await AuthService.updateProfile(formData);


        if (result) {

          toast.success(result?.data?.message, {
            autoClose: 1000,
            pauseOnHover: true,
            draggable: true,

          });
          getUserDetailFunction(guid)
          // setTimeout(()=>{
          //   navigate('/users')
          // },1300)
          setModal(false)

        }
        else {
          if (result?.data?.success == "Unauthenticated.") {
            navigate('/login')
          }

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
  return (
    <div className='side-bar'>
      <ToastContainer />
      {loading && <div className="loader-parent"><div className="_loader"></div></div>}
      {modal && <div className='modal-main'>
        <div className="modal-wrapper change-pass">
          <div className="close" onClick={() => setModal(false)}>
            <IoCloseOutline />
          </div>
          <div className="title">Update profile</div>
          <div className="form-group mb-3">
            <label htmlFor="">upload image</label>
            <input type="file" className='input' onChange={handleProfile} />
          </div>

          <div className='text-center'>
            <button className="button" onClick={() => { updateProfileFunction() }}>Update</button>
          </div>
        </div>

      </div>}

      <div className="user-area">

        <div className="profile-wrapper">
          <div className="user-image">
            <div className="icon" onClick={() => setModal(true)}>
              <BsPencil />
            </div>
            {(user?.profile_pic) ? <img
              src={`${api_url}/uploads/${user?.profile_pic}`}
            /> : (loaded ? <img src={(user?.id == '134' || user?.client_id == '134') ? userImagez : userImage} alt="" /> : <div className="circular-loader"></div>)}
          </div>

          <div className='user-name'>{user?.first_name} {user?.last_name}</div>

        </div>
        <div className='user-id'> ({user?.role_name}) </div>
        <div className="notifications-wrapper">
          <div className="icon-wrapper">


            {notifications?.length > 0 ? <Link to="/notifications" className="icon">
              <Link to="/notifications" className="count">{userType == 'super_admin' ? user?.notifications_admin_count : userType == 'case_submission' ? user?.notifications_case_submission_count : user?.notifications_count}</Link>
              <GoBell />

            </Link> : <div className="icon">
              <div className="count">{notifications?.length}</div>
              <GoBell />
              {/* {showNotification &&   <div className="notifications-list">
                <div className="item">
                  lorem ispum text
                </div>

              </div>} */}
            </div>}

          </div>
        </div>

      </div>
      <Link className={`dashboardd ${tab == 'dashboard' ? 'active' : ''}`} to={'/dashboard'} onClick={() => setTab('dashboard')}><div className="icon"><IoIosLogOut /></div> Dashboard</Link>
      {(permissions?.includes("users-list") || permissions?.includes("roles-list") || permissions?.includes("teams-list") || permissions?.includes("permissions-list")) && <div className="title">
        User management
      </div>}

      <ul>
        {permissions?.includes("users-list") && <li>
          <Link className={`${tab == 'users' ? 'active' : ''}`} onClick={() => setTab('users')} to={'/users'}> <div className="icon">
            <TbUsers /></div> Users</Link>
        </li>}
        {permissions?.includes("roles-list") && <li>
          <Link className={`${tab == 'roles' ? 'active' : ''}`} onClick={() => setTab('roles')} to={'/roles'}> <div className="icon">
            <GoWorkflow /></div>  Roles</Link>
        </li>}
        {permissions?.includes("permissions-list") && <li>
          <Link className={`${tab == 'permissions' ? 'active' : ''}`} onClick={() => setTab('permissions')} to={'/permissions'}> <div className="icon"><FaUserCheck /></div>  Permissions</Link>
        </li>}
        {permissions?.includes("teams-store") && <li>
          <Link className={`${tab == 'teams' ? 'active' : ''}`} onClick={() => setTab('teams')} to={'/teams'}> <div className="icon"><TbUsers /></div>  Teams</Link>
        </li>}

      </ul>


      {(permissions?.includes('patient-cases-list') || permissions?.includes('pending-approvals-list')) && <div className="title">
        Case management
      </div>}
      <ul>
        {permissions?.includes('patient-cases-list') && <li>
          <Link className={`${tab == 'cases' ? 'active' : ''}`} onClick={() => setTab('cases')} to={'/cases'}> <div className="icon"><CiMedicalCase /></div>  My cases</Link>
        </li>}
        {permissions?.includes('patient-cases-list') && <li>
          <Link className={`${tab == 'completed' ? 'active' : ''}`} onClick={() => setTab('completed')} to={'/completed-cases'}> <div className="icon"><CiMedicalCase /></div>  Completed cases</Link>
        </li>}

        {permissions?.includes('external-cases-list') && <li>
          <Link className={`${tab == 'external-cases' ? 'active' : ''}`} onClick={() => setTab('external-cases')} to={'/external-cases'}> <div className="icon"><CiMedicalCase /></div>  External Cases</Link>
        </li>}

        {permissions?.includes('sub-client-list') && <li>
          <Link className={`${tab == 'subclients' ? 'active' : ''}`} onClick={() => setTab('subclients')} to={'/sub-clients'}> <div className="icon"><TbUsers /></div>  Sub clients</Link>
        </li>}

        <li>
          <Link className={`${tab == 'history' ? 'active' : ''}`} onClick={() => setTab('history')} to={'/history'}> <div className="icon"><GoHistory /></div>  History</Link>
        </li>

        {permissions?.includes('softwares-list') && <li>
          <Link className={`${tab == 'softwares' ? 'active' : ''}`} onClick={() => setTab('softwares')} to={'/softwares'}> <div className="icon"><GoGlobe /></div>  Softwares</Link>
        </li>}
        

      </ul>

      {permissions?.includes('reset-password') &&
        <Link to={'/reset-password'} className="logout mb-3"> <div className="icon"><MdPendingActions /></div> Reset Password</Link>}


      <div className='logout' onClick={() => logOut()}> <div className="icon"><IoIosLogOut /></div> Logout</div>
    </div>
  )
}

export default Sidebar