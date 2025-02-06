// src/api/CaseService.js 

import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `${api_url}/api`;

// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';


//add case

async function createCase(data, onUploadProgress) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');


    var config = {
      method: 'post',
      url: '/patient_cases/store',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data,
      onUploadProgress: onUploadProgress,

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
//update case

async function updateCase(id, data, onUploadProgress) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/patient_cases/update/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data,
      onUploadProgress: onUploadProgress,

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

//get all histories
// async function getHistoryList(current_page=1,case_id='',casestatus='',patientNname='',clinicName='',dateFrom='',dateTo='', caseType='',caseCompleted='',isProrityCases='',isModificationCases='')
//  url: `/patient_case/cases_histories?paginate=yes&current_page=${current_page}&${queryParams}`,
async function getHistoryList(current_page = 1, case_id = '', caseCompleted = '', patientNname = '') {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    if (case_id) queryParams.append('search', case_id);
    if (caseCompleted) queryParams.append('case_completed', caseCompleted);
    if (patientNname) queryParams.append('patient_name', patientNname);
    //   if (clinicName) queryParams.append('clinic_name', clinicName);
    //   if (dateFrom) queryParams.append('date_from', dateFrom);
    //   if (dateTo) queryParams.append('date_to', dateTo);
    //   if (caseType) queryParams.append('case_type', caseType);
    //   if (caseCompleted) queryParams.append('case_completed', caseCompleted);
    //   if (isProrityCases) queryParams.append('is_prority_cases', isProrityCases);
    //   if (isModificationCases) queryParams.append('is_modification_cases', isModificationCases);
    //   if (dates && Array.isArray(dates) && dates.length === 2) {
    //     queryParams.append('date_from_to', dates.join(',')); // Use a comma or any other delimiter
    // }

    var config = {
      method: 'get',
      url: `/cases_histories?paginate=yes&current_page=${current_page}&${queryParams}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//get all cases

async function getCases(current_page = 1, case_id = '', casestatus = '', patientNname = '', clinicName = '', dateFrom = '', dateTo = '', caseType = '', caseCompleted = '', isProrityCases = '', isModificationCases = '') {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    if (case_id) queryParams.append('search', case_id);
    if (casestatus) queryParams.append('status', casestatus);
    if (patientNname) queryParams.append('patient_name', patientNname);
    if (clinicName) queryParams.append('clinic_name', clinicName);
    if (dateFrom) queryParams.append('date_from', dateFrom);
    if (dateTo) queryParams.append('date_to', dateTo);
    if (caseType) queryParams.append('case_type', caseType);
    if (caseCompleted) queryParams.append('case_completed', caseCompleted);
    if (isProrityCases) queryParams.append('is_prority_cases', isProrityCases);
    if (isModificationCases) queryParams.append('is_modification_cases', isModificationCases);
    //   if (dates && Array.isArray(dates) && dates.length === 2) {
    //     queryParams.append('date_from_to', dates.join(',')); // Use a comma or any other delimiter
    // }

    var config = {
      method: 'get',
      url: `/patient_cases?paginate=yes&current_page=${current_page}&${queryParams}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//get completed cases

async function getCompletedCases() {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: '/patient_case/completed_cases',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//get case detail

async function getCaseDetail(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/patient_cases/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//delete case

async function deleteCase(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'delete',
      url: `/patient_cases/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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


//create peniding-approval

async function createPendingApproval(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: '/pending_approvals/store',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data
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
//update PendingApproval

async function updatePendingApproval(id, data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/pending_approvals/update/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data
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
//get all PendingApproval

async function getPendingApprovals() {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: '/pending_approvals',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//get case PendingApprovalDetai

async function getPendingApprovalDetail(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/pending_approvals/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//delete PendingApproval

async function deletePendingApproval(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'delete',
      url: `/pending_approvals/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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

//assign case to planner
async function assignCase(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/patient_cases/case_assign_to`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data
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
// create case plan
async function createCasePlan(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/case_plans/store`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data
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
// update case plan
async function updateCasePlan(id, data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/case_plans/update/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data
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
//get all plans
async function getCasePlans() {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: '/case_plans',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//get case detail

async function getCasePlan(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/case_plans/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
//delete case

async function deleteCasePlan(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'delete',
      url: `/case_plans/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''
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
// update case status
async function updateCaseStatus(data, onUploadProgress) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/patient_cases/update_patient_case_status`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data,
      onUploadProgress: onUploadProgress
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

// update case status
async function updateCaseToSubmission(id, onUploadProgress) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/patient_cases/verified_by_client/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: '',
      onUploadProgress: onUploadProgress
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
//dashboard api

// update case status
async function getDashboardStats() {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/admin/dashboard`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: ''

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

// update case status
async function isCaseAvailble(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/check_case_id/${id}`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: '',

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

async function updateCaseWorkload(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/patient_case/update_status_workload`,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', 
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + AUTH_TOKEN
      },
      data: data,
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
export const CaseService = { updateCaseWorkload, createCase, updateCase, getHistoryList, getCases, getCompletedCases, getCaseDetail, deleteCase, createPendingApproval, updatePendingApproval, getPendingApprovals, getPendingApprovalDetail, deletePendingApproval, assignCase, createCasePlan, updateCasePlan, getCasePlan, getCasePlans, deleteCasePlan, updateCaseStatus, updateCaseToSubmission, getDashboardStats, isCaseAvailble }