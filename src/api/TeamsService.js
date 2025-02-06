// src/api/TeamsService.js
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `${api_url}/api`
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';


//Create Team

async function createTeam(data){
    try {
      let AUTH_TOKEN = window.localStorage.getItem('token');
       var config = {
           method: 'post',
           url: '/teams/store',
           headers:{
            'Accept': 'application/json', 
            // 'Content-Type': 'application/json', 
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+AUTH_TOKEN
          },
           data : data
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
     return err
    }
  }
//update team

async function updateTeam(id,data){
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
     var config = {
         method: 'post',
         url: `/teams/update/${id}`,
         headers:{
          'Accept': 'application/json', 
          // 'Content-Type': 'application/json', 
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer '+AUTH_TOKEN
        },
         data : data
     };
     
   return await axios(config)
     .then(function (response) {
       return response;
     })
     .catch(function (error) {
       return error.response
   });
  } catch (err) {
   return err
  }
}
  //get all teams

  async function getTeams(){
    try {
      let AUTH_TOKEN = window.localStorage.getItem('token');
       var config = {
           method: 'get',
           url: '/teams',
           headers:{
            'Accept': 'application/json', 
            // 'Content-Type': 'application/json', 
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+AUTH_TOKEN
          },
           data : ''
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
     return err
    }
    }
   //get team detail
   
  async function getTeamDetail(id){
    try {
      let AUTH_TOKEN = window.localStorage.getItem('token');
       var config = {
           method: 'get',
           url: `/teams/${id}`,
           headers:{
            'Accept': 'application/json', 
            // 'Content-Type': 'application/json', 
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+AUTH_TOKEN
          },
           data : ''
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
     return err
    }
    }

    //get team users
    async function getTeamUsers(id=0){
      try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
         var config = {
             method: 'get',
             url: `/team/get-teams-detail/${id}`,
             headers:{
              'Accept': 'application/json', 
              // 'Content-Type': 'application/json', 
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
      } catch (err) {
       return err
      }
      }
    
     //delete team

  async function deleteTeam(id){
    try {
      let AUTH_TOKEN = window.localStorage.getItem('token');
       var config = {
           method: 'delete',
           url: `/teams/${id}`,
           headers:{
            'Accept': 'application/json', 
            // 'Content-Type': 'application/json', 
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+AUTH_TOKEN
          },
           data : ''
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
     return err
    }
    }

    //assign planner to team
    async function assignPlannerTOTeam(data){
      try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
         var config = {
             method: 'post',
             url: '/team/assign-teams',
             headers:{
              'Accept': 'application/json', 
              // 'Content-Type': 'application/json', 
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : data
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
      } catch (err) {
       return err
      }
    }
    

    //get treatment-planner and quality checker
    async function getPlannersandQc(){
      try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
         var config = {
             method: 'get',
             url: `/user/treatment-planners-quality-check`,
             headers:{
              'Accept': 'application/json', 
              // 'Content-Type': 'application/json', 
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
      } catch (err) {
       return err
      }
      }
       //get treatment-planner and quality checker
    async function getPlanners(){
      try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
         var config = {
             method: 'get',
             url: `/user/treatment-planners`,
             headers:{
              'Accept': 'application/json', 
              // 'Content-Type': 'application/json', 
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : ''
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
      } catch (err) {
       return err
      }
      }

      //remove team member

       //delete team

  async function removeMember(data){
    try {
      let AUTH_TOKEN = window.localStorage.getItem('token');
       var config = {
           method: 'post',
           url: `/team/remove-teams`,
           headers:{
            'Accept': 'application/json', 
            // 'Content-Type': 'application/json', 
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer '+AUTH_TOKEN
          },
           data : data
       };
       
     return await axios(config)
       .then(function (response) {
         return response;
       })
       .catch(function (error) {
         return error.response
     });
    } catch (err) {
     return err
    }
    }
      
    async function assignTeamApi(data){
      try {
        let AUTH_TOKEN = window.localStorage.getItem('token');
         var config = {
             method: 'post',
             url: `/team/assign-teams`,
             headers:{
              'Accept': 'application/json', 
              // 'Content-Type': 'application/json', 
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer '+AUTH_TOKEN
            },
             data : data
         };
         
       return await axios(config)
         .then(function (response) {
           return response;
         })
         .catch(function (error) {
           return error.response
       });
      } catch (err) {
       return err
      }
      }

    export const TeamService= { createTeam,updateTeam,getTeams ,getTeamDetail,deleteTeam,getPlannersandQc,assignPlannerTOTeam,getPlanners,getTeamUsers,removeMember,assignTeamApi}