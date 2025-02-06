// src/App.js
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import ResetPassword from "./routes/reset-password/ResetPassword";
import Layout from "./routes/layout/Layout";
import Client from "./routes/client/Client";
import Dashboard from "./routes/dashboard/Dashboard";
import Login from "./routes/login/Login";
import WeSmileLogin from "./routes/login/WeSmileLogin";
import Smilezy from "./routes/login/Smilezy";
import Drabhishek from "./routes/login/Drabhishek";
import DarrenLogin from "./routes/login/DarrenLogin";
import Model from "./routes/roles/3dmodal";
import NoRecords from "./components/NoRecords";
import NotAuthorized from "./components/NotAuthorized";
//Notifications component
import Notifications from "./routes/notifications/Notifications";
//Users componets
import Users from "./routes/users/Users";
import CreateUser from "./routes/users/CreateUser";
import EditUser from "./routes/users/EditUser";
import UserDetail from "./routes/users/UserDetail";
//Permissions? componets
import Permissions from "./routes/permissions/Permissions";
import AddPermission from "./routes/permissions/AddPermission";
import PermissionDetail from "./routes/permissions/PermissionDetail";
import UpdatePermission from "./routes/permissions/UpdatePermission";
//Roles componets
import Roles from "./routes/roles/Roles";
import AddRole from "./routes/roles/AddRole";
import RoleDetail from "./routes/roles/RoleDetail";
import UpdateRole from "./routes/roles/UpdateRole";

//cases components
import CreateCase from "./routes/cases/CreateCase";
import CaseDetail from "./routes/cases/CaseDetail";
import Cases from "./routes/cases/Cases";
import UpdateCase from "./routes/cases/UpdateCase";
import CompletedCases from "./routes/cases/CompletedCases";
//History components
import Histoy from "./routes/history/Histoy";
import HistoyDetail from "./routes/history/HistoyDetail";
//approval components

import CreateApproval from "./routes/pending-approvals/CreateApproval";
import PendingApprovals from "./routes/pending-approvals/PendingApprovals";
import ApprovalDetail from "./routes/pending-approvals/ApprovalDetails";
import UpdateApproval from "./routes/pending-approvals/UpdateApproval";
import { AuthContext } from "./components/authcontext/AuthContext";
//sub client components
import SubClients from "./routes/subclients/SubClients";
import SubClientDetail from "./routes/subclients/SubClientDetail";
import CreateSubClient from "./routes/subclients/CreateSubClient";
import UpdateSubClient from "./routes/subclients/UpdateSubClient";
import BioDentLogin from "./routes/login/BioDentLogin";
import CleverLogin from "./routes/login/CleverLogin";
//teams components
import Teams from "./routes/teams/Teams";
import CreateTeam from "./routes/teams/CreateTeam";
import UpdateTeam from "./routes/teams/UpdateTeam";
import TeamDetail from "./routes/teams/TeamDetail";
import { useContext } from "react";
import MySmartAlign from "./routes/login/MySmartAlign";

//Software components
import Softwares from "./routes/softwares/Softwares"
import AddSoftware from "./routes/softwares/AddSoftware";
import UpdateSoftware from "./routes/softwares/UpdateSoftware";

function App() {

  const { currentUser } = useContext(AuthContext)
  const userType = currentUser?.roles[0]?.name
  const permissions = currentUser?.permissions
  const AdminsUser = ({ children }) => {

    return <>{children}</>

  }


  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/biodentlogin",
      element: <BioDentLogin />
    },
    {
      path: "/wesmilelogin",
      element: <WeSmileLogin />
    },
    {
      path: "/mysmartalignlogin",
      element: <MySmartAlign />
    },
    {
      path: "/cleverlogin",
      element: <CleverLogin />
    },
    {
      path: "/smilezylogin",
      element: <Smilezy />
    },
    {
      path: "/drabhisheklogin",
      element: <Drabhishek />
    },
    {
      path: "/darrenlogin",
      element: <DarrenLogin />
    },
    {
      path: "*",
      element: <NoRecords />,
    },



    {
      path: "/",
      element: <AdminsUser> <Layout /> </AdminsUser>,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        //Users routes
        {
          path: "/users",
          element: permissions?.includes('users-list') ? <Users /> : <NotAuthorized />
        },

        {
          path: "/create-user",
          element: permissions?.includes('users-store') ? <CreateUser /> : <NotAuthorized />
        },
        {
          path: "/edit-user/:id",
          element: permissions?.includes('users-update') ? <EditUser /> : <NotAuthorized />
        },
        {
          path: "/user-detail/:id",
          element: permissions?.includes('users-update') ? <UserDetail /> : <NotAuthorized />
        },
        //notifications
        {
          path: "/notifications",
          element: <Notifications />
        },
        //History
        {
          path: "/history",

          element: <Histoy />
        },
        {
          path: "/history-detail/:id",

          element: <HistoyDetail />
        },
        //cases
        {
          path: "/cases/:casestatus?",

          element: permissions?.includes('patient-cases-list') ? <Cases /> : <NotAuthorized />
        },
        {
          path: "/completed-cases",

          element: permissions?.includes('patient-cases-list') ? <CompletedCases /> : <NotAuthorized />
        },
        {
          path: "/create-case",
          element: permissions?.includes('patient-cases-store') ? <CreateCase /> : <NotAuthorized />
        },
        {
          path: "/update-case/:id",
          element: permissions?.includes('patient-cases-update') ? <UpdateCase /> : <NotAuthorized />
        },
        {
          path: "/case-detail/:id",
          element: permissions?.includes('patient-cases-detail') ? <CaseDetail /> : <NotAuthorized />
        },
        //approvals routes
        {
          path: "/approvals",
          element: permissions?.includes('pending-approvals-list') ? <PendingApprovals /> : <NotAuthorized />
        },
        {
          path: "/create-approval",
          element: permissions?.includes('pending-approvals-store') ? <CreateApproval /> : <NotAuthorized />
        },
        {
          path: "/update-approval/:id",
          element: permissions?.includes('pending-approvals-update') ? <UpdateApproval /> : <NotAuthorized />
        },
        {
          path: "/approval-detail/:id",
          element: permissions?.includes('pending-approvals-detail') ? <ApprovalDetail /> : <NotAuthorized />
        },
        //Roles routes
        {
          path: "/roles",
          element: permissions?.includes('roles-list') ? <Roles /> : <NotAuthorized />
        },
        {
          path: "/add-role",
          element: permissions?.includes('roles-store') ? <AddRole /> : <NotAuthorized />
        },
        {
          path: "/update-role/:id",
          element: permissions?.includes('roles-update') ? <UpdateRole /> : <NotAuthorized />
        },
        {
          path: "/role-detail/:id",
          element: permissions?.includes('roles-detail') ? <RoleDetail /> : <NotAuthorized />
        },

        //Permissions? routes
        {
          path: "/permissions",
          element: permissions?.includes('permissions-list') ? <Permissions /> : <NotAuthorized />
        },
        {
          path: "/add-permission",
          element: permissions?.includes('permissions-store') ? <AddPermission /> : <NotAuthorized />
        },
        {
          path: "/update-permission/:id",
          element: permissions?.includes('permissions-update') ? <UpdatePermission /> : <NotAuthorized />
        },
        {
          path: "/permission-detail/:id",
          element: permissions?.includes('permissions-detail') ? <PermissionDetail /> : <NotAuthorized />
        },

        //teams
        {
          path: "/teams",
          element: permissions?.includes('teams-list') ? <Teams /> : <NotAuthorized />
        },
        {
          path: "/create-team",
          element: permissions?.includes('teams-store') ? <CreateTeam /> : <NotAuthorized />
        },
        {
          path: "/update-team/:id",
          element: permissions?.includes('teams-update') ? <UpdateTeam /> : <NotAuthorized />
        },
        {
          path: "/team-detail/:id",
          element: permissions?.includes('teams-detail') ? <TeamDetail /> : <NotAuthorized />
        },

        //sub clients
        {
          path: "/sub-clients",
          element: permissions?.includes('sub-client-list') ? <SubClients /> : <NotAuthorized />
        },
        {
          path: "/create-sub-client",
          element: permissions?.includes('sub-client-store') ? <CreateSubClient /> : <NotAuthorized />
        },
        {
          path: "/update-sub-client/:id",
          element: permissions?.includes('sub-client-update') ? <UpdateSubClient /> : <NotAuthorized />
        },
        {
          path: "/sub-client-detail/:id",
          element: permissions?.includes('sub-client-detail') ? <SubClientDetail /> : <NotAuthorized />
        },
        {
          path: "/reset-password",
          element: permissions?.includes('reset-password') ? <ResetPassword /> : <NotAuthorized />
        },

        //Softwares
        {
          path: "/softwares",
          element: permissions?.includes('softwares-list') ? <Softwares /> : <NotAuthorized />
          // element: <Softwares/>
        },
        {
          path: "/create-software",
          element: permissions?.includes('softwares-store') ? <AddSoftware /> : <NotAuthorized />
        },
        {
          path: "/update-software/:id",
          element: permissions?.includes('softwares-update') ? <UpdateSoftware /> : <NotAuthorized />
        }
      ]
    }
  ]);



  return (

    <RouterProvider router={router} />
  );
}

export default App;
