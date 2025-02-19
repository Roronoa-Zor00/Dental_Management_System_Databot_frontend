// src/api/AuthService.js
import axios from 'axios';
const api_url = process.env.REACT_APP_API_URL;

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `${api_url}/api`;
// axios.defaults.headers.common['Authorization'] = 'Bearer'+AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

//---- LOGIN USER ---------------
async function login(data) {
  try {
    var config = {
      method: 'post',
      url: '/login',
      data: data
    };

    return await axios(config).then(
      function (response) {
        return response;
      }
    ).catch(
      function (error) {
        return error.response
      }
    );
  } catch (err) {
    return err.response
  }
}

//users api start here
//add user

async function addUser(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: '/users/store',
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
//update user
async function updateUser(id, data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/users/update/${id}`,
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
// get users list

async function getUsers(current_page = 1, search) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    const queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    var config = {
      method: 'get',
      url: `/users?current_page=${current_page}&paginate=yes&${queryParams}`,
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


async function getAllUsers() {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/users`,
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


//get user detail

async function getUserDetail(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/users/${id}`,
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
// delete user

async function deleteUser(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'delete',
      url: `/users/${id}`,
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



//Roles api start here
//add role

async function addRole(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: '/roles/store',
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
//update user
async function updateRole(id, data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/roles/update/${id}`,
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
// get users list

async function getRoles() {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: '/roles',
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


//get user detail

async function getRoleDetail(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/roles/${id}`,
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
// delete user

async function deleteRole(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'delete',
      url: `/roles/${id}`,
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








//Permissions api start here
//add role

async function addPermission(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: '/permissions/store',
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
//update user
async function updatePermission(id, data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/permissions/update/${id}`,
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
// get users list

async function getPermissions() {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: '/permissions',
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


//get user detail

async function getPermissionDetail(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `/permissions/${id}`,
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
// delete user

async function deletePermission(id) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'delete',
      url: `/permissions/${id}`,
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


//update password
async function updatePassword(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/password/update`,
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
//update password by admin
async function updatePasswordByAdmin(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/user/password-update`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // "Content-Type": "multipart/form-data",
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
//update profile
async function updateProfile(data) {
  try {
    let AUTH_TOKEN = window.localStorage.getItem('token');
    var config = {
      method: 'post',
      url: `/user/profile-pic-update`,
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

export const AuthService = { login, addUser, updateUser, getUsers, getAllUsers, deleteUser, getUserDetail, addRole, updateRole, getRoles, deleteRole, getRoleDetail, addPermission, updatePermission, getPermissionDetail, getPermissions, deletePermission, updatePassword, updatePasswordByAdmin, updateProfile }