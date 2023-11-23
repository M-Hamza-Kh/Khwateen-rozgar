import $ from "jquery";
import {setAuthEnvLocal} from "./base";
import swal from 'sweetalert';

//const BASE_URL = "https://bethebookie.bet/api";
//const BASE_URL = "https://localhost:44338/api";
const BASE_URL = "https://www.khawateenrozgar.com/webapi/api";

const API_TOKEN = sessionStorage.getItem("rememberMe") !== null ? sessionStorage.getItem("token") : localStorage.getItem("token")

export const API = {
    AUTH: {
        SignIn: (data, isRemember) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/user/authenticate`,
                    method: "POST",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("user", response)
                    if (response.status) {
                        if (isRemember) {
                            setAuthEnvLocal(response.data.token, response.data.user, isRemember);
                            document.cookie = `email = ${data.email}`;
                            document.cookie = `pass = ${data.password}`;
                            document.cookie = `remember = ${isRemember}`;
                        } else {
                            setAuthEnvLocal(response.data.token, response.data.user, isRemember);
                            document.cookie = `remember = ${isRemember}`;
                            //setAuthEnv(response.data.token, response.data.user, isRemember);
                        }
                    } else {
                        reject(response.error)
                        alert(response.error)
                    }
                }).catch((error) => {
                    console.log("user", error)
                    reject(JSON.parse(error.responseText).message)
                    //alert(JSON.parse(error.responseText).message)
                    swal("", JSON.parse(error.responseText).message, "error")
                })
            })
        },
        SignUp: data => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/user`,
                    method: "POST",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("user", response)
                    if (response.status)
                        resolve(response)
                    //setAuthEnv(response.token, response.user)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        }
    },
    USER: {
        userSubscribe: data => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/User/Subscribe`,
                    method: "POST",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    //console.log("user", response)
                    if (response.status)
                        resolve(response)
                    //setAuthEnv(response.token, response.user)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        resetPassword: data => $.ajax({
            url: `${BASE_URL}/User/ResetPasswordRequest`,
            method: "POST",
            timeout: 0,
            data: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
        }),
        verifyResetCode: data => $.ajax({
            url: `${BASE_URL}/User/VerifyPasswordRequest`,
            method: "POST",
            timeout: 0,
            data: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
        }),
        submitResetPass: data => $.ajax({
            url: `${BASE_URL}/User/ResetPassword`,
            method: "POST",
            timeout: 0,
            data: JSON.stringify(data),
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
        }),
        userContact: data => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/User/Contact`,
                    method: "POST",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    //console.log("user", response)
                    if (response.status)
                        resolve(response)
                    //setAuthEnv(response.token, response.user)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        updateUser: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    // url: `${BASE_URL}/user/${id}`,
                    url: `${BASE_URL}/user/UpdateMyProfile`,
                    method: "PUT",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("userUpdate", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        updateUserRights: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/User/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        changePassword: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    // url: `${BASE_URL}/user/${id}`,
                    url: `${BASE_URL}/user/ChangePassword`,
                    method: "PUT",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("userUpdate", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getUser: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/user/${id}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("userUpdate", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getCompany: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/user/company/${id}`,
                    method: "GET",
                    timeout: 0,
                    // headers: {
                    //     "Authorization": `Bearer ${API_TOKEN}`,
                    //     "Content-Type": "application/json"
                    // },
                }).then((response) => {
                    console.log("userUpdate", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        }
    },
    ADMIN: {
        getAllCompany: ({page, City, Name, Email}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/User/GetCompanies?page=${page}&City=${City}&name=${Name}&email=${Email}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getAllSubscribers: ({page}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/User/GetAllSubscribers?page=${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getAllApplicant: ({page, City, Phone, Name, Email, Skill, Education}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/User/GetApplicants?page=${page}&City=${City}&phone=${Phone}&name=${Name}&email=${Email}&skils=${Skill}&Education=${Education}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getAllSettings: ({type, page}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/GetByType/${type}/${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getAllSettingsData: ({type, page}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/${type}/${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    COMPANY: {
        getAllPostedJob: (page,Company,City,Title,type) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/MyPostedJobList?page=${page}&company=${Company}&City=${City}&title=${Title}&type=${type}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getCompanyPayments: (id, page) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Payment/GetCompanyPayments/${id}?page=${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getMyCompanyStatus: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/User/GetMyCompanyStatus`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        addJob: (data) => {
           // debugger
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        updateJob: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/Update/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    PAYMENTS: {
        getAllPayments: (page) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Payment?Page=${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        addPayment: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Payment/AddPayment`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    SCHEDULE_INTERVIEW: {
        getAll: (page) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Job/MySchduledInterview?Page=${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    JOBS: {
        getAllJob: ({title, city, type, page, Sortby, skills, industry, salaryRange}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job?title=${title}&city=${city}&type=${type}&Sortby=${Sortby}&page=${page}&Skill=${skills}&SalaryRange=${salaryRange}&industry=${industry}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getJobUniques: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Job/Uniques`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getJobByCriteria: (Criteria, value) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/JobsByCriteria?Criteria=${Criteria}${value !== undefined && `&Value=${value}`}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getMyJobStatus: (page) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/MyJobsStatus?page=${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getMyNotification: (page) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Notification?Page=${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    // console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getJobById: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/${id}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        applyJob: ({ShowVideo, cvurl, ApplyType, id}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/Apply/${id}?ShowVideo=${ShowVideo}&ApplyType=${ApplyType}&cvurl=${cvurl}`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        jobApproved: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Job/Approve/${id}`,
                    method: "PUT",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        jobUpdatesApproved: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Job/ApproveUpdates/${id}`,
                    method: "PUT",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getJobStats: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/JobStats/${id}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getJobDetails: ({id, type, page}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/JobDetails/${id}/${type}/${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        acceptOrReject: (type, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/${type}`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        activeDeActive: (id, isActive) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/ActiveDeactive/${id}/${isActive}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        scheduleInterview: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/SchedulForInterview`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        interviewed: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/Interviewed`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        viewed: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/Viewed`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        selected: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/Selected`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        rejected: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/job/Rejected`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        jobUpdatesAvailable: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Job/JobUpdateAvailable/${id}`,
                    method: "Get",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        }

    },
    SETTINGS: {
        addSettings: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting`,
                    method: "POST",
                    timeout: 0,
                    data: JSON.stringify(data),
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        deleteSettings: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/${id}`,
                    method: "DELETE",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        updateSettings: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getCities: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/GetByType/City/0`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getJobType: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/GetByType/JobType/0`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getJobIndustry: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/GetByType/Industry/0`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getJobSkills: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/GetByType/Skill/0`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getJobQualification: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/GetByType/Qualification/0`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getUniqueSetting: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Setting/Uniques`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
    },
    HOME: {
        getStats: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/stats`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllApplicantStats: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/stats/Applicantstats`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllCompanyStats: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/stats/Companystats`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllPaymentsStats: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/stats/Paymentstats`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllJobsStats: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/stats/Jobstats`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
    },
    CONTENT: {
        getAllHomeContent: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Home/GetContent`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllBanners: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Content/ImageBannerSmall`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllVideos: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Content/YoutubeVideos`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getPageContent: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Content/PageContent`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    //console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        addContent: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Content`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        updateContent: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Content/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    TESTIMONIALS: {
        deleteSettings: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/testimonial/${id}`,
                    method: "DELETE",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getAllTestimonials: (pageNo) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Testimonial?Page=${pageNo}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    //console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllTestAdmin: ({pageNo, isApproved}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Testimonial/GetAllForAdmin?Page=${pageNo}&isApproved=${isApproved}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        approveTestimonial: (data, id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Testimonial/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        addMessage: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Testimonial`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    UPLOAD: {
        upload: files => {
            const formData = new FormData(files);
            return $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: `${BASE_URL}/Upload`,
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
            })
        }
    },
    PACKAGES: {
        getAllPackages: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Package`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllPackagesAdmin: (page) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Package/GetAllForAdmin?page=${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        addPackage: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Package`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        updatePackage: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Package/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    REVIEWS: {
        deleteSettings: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/review/${id}`,
                    method: "DELETE",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getSearchReviews: ({City, Company, SortBy, pageNo}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review?City=${City}&company=${Company}&SortBy=${SortBy}&Page=${pageNo}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getUniqueReviewsCities: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review/Uniques`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },

        getCompanyReviews: ({id, page}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review/GetCompanyReviews/${id}/${page}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAdminCompanyReviews: ({id, isApproved, page}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review/GetCompanyReviewsForAdmin/${id}/${page}?isApproved=${isApproved}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getReviewByCompanyId: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review/GetCompany/${id}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        getAllReviewsAdmin: ({pageNo, isApproved}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review/GetAllForAdmin?Page=${pageNo}&isApproved=${isApproved}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        addReview: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        reviewApproved: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Review/Approve/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    },
    BLOGS: {
        getAllBlogs: ({category, pageNo, details}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog?details=${details}&category=${category}&page=${pageNo}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getCategoriesCount: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/GetCategoriesCount`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getTagsCount: () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/GetTagCount`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getBlogById: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/${id}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    console.log("stats", response)
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message)
                    alert(JSON.parse(error.responseText).message)
                })
            })
        },
        addBlog: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        deleteBlog: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/${id}`,
                    method: "DELETE",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        updateBlog: (id, data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/${id}`,
                    method: "PUT",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        getBlogCommentsById: ({id, pageNo}) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/GetCommentsByBlogID/${id}/${pageNo}`,
                    method: "GET",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        addBlogComment: (data) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/AddComment`,
                    method: "POST",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
        deleteComment: (id) => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${BASE_URL}/Blog/DeleteComment/${id}`,
                    method: "DELETE",
                    timeout: 0,
                    headers: {
                        "Authorization": `Bearer ${API_TOKEN}`,
                        "Content-type": "application/json"
                    },
                }).then((response) => {
                    if (response.status)
                        resolve(response)
                }).catch((error) => {
                    reject(JSON.parse(error.responseText).message);
                    alert(JSON.parse(error.responseText).message);
                })
            })
        },
    }
};