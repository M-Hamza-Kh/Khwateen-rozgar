import React from "react";
import $ from "jquery";
import * as moment from "moment";
import brokenPaper from "../content/svg/brokenpaper.svg";
import {Link} from "react-router-dom";

require("jquery.caret");
let DOMAIN_PREFIX = "";
export const DOWNLOAD_URL = "https://www.khawateenrozgar.com/webapi/api/payment/DownloadInvoice";
export const WEB_HOST_URL = "https://www.khawateenrozgar.com";
export const CONTENT_URL = "https://www.khawateenrozgar.com";
//export const WEB_HOST_URL = "https://localhost:44338";
//export const CONTENT_URL = "https://localhost:44338";
DOMAIN_PREFIX = process.env.NODE_ENV !== '' ? "" : "";

export const slickAutoSpeed = 2000;

export const STRINGS = {
    ENV: {
        PRODUCTION: "production",
        DEVELOPMENT: "development"
    },
    STORAGE: {
        connectionId: "",
        _connectionId: "connectionId",
        token: "token",
        user: "user",
        user_id: "user_id",
        firstName: "firstName",
        middle_name: "middle_name",
        last_name: "lastName",
        department_id: "department_id",
        departmentName: "departmentName",
        hod_id: "hod_id",
        hodName: "hodName",
        hodImage: "hodImage",
        hodDesignation: "hodDesignation",
        designation_id: "designation_id",
        designation: "designation",
        profile_picture: "profile_picture",
        manager_id: "manager_id",
        managerDesignation: "managerDesignation",
        managerImage: "managerImage",
        managerName: "managerName",
        email: "email",
        mobileNo: "mobileNo",
        user_type: "user_type",
        business_id: "business_id",
        branch_id: "branch_id",
        user_name: "user_name",
        birthdate: "birthdate",
        businessName: "businessName",
        branchName: "branchName",
        businessLogo: "businessLogo",
        fullname: "fullname",

    },
    ROUTES: {
        SEARCH: {
            DEFAULT: `${DOMAIN_PREFIX}/search`
        },
        ROOT: `${DOMAIN_PREFIX}/`,
        RESET_PASSWORD: `${DOMAIN_PREFIX}/resetpassword`,
        ABOUT: `${DOMAIN_PREFIX}/about`,
        COMPANY_DETAIL: `${DOMAIN_PREFIX}/company_detail`,
        TESTIMONIAL: `${DOMAIN_PREFIX}/testimonial`,
        REVIEWS: `${DOMAIN_PREFIX}/reviews`,
        REVIEW_DETAIL: `${DOMAIN_PREFIX}/review_detail`,
        REVIEW_ADD: `${DOMAIN_PREFIX}/review_add`,
        CONTACT: `${DOMAIN_PREFIX}/contact`,
        PACKAGES: `${DOMAIN_PREFIX}/packages`,
        BLOG_DETAILS: `${DOMAIN_PREFIX}/blogDetails`,
        BLOGS: `${DOMAIN_PREFIX}/blogs`,
        T_AND_C: `${DOMAIN_PREFIX}/t&c`,
        PRIVACY_POLICY: `${DOMAIN_PREFIX}/privacy_policy`,
        DASHBOARD: {
            HOME: `${DOMAIN_PREFIX}/dashboard`,
            PROFILE: `${DOMAIN_PREFIX}/profile`,
            MESSENGER: `${DOMAIN_PREFIX}/messages`,
            JOBS_ALERTS: `${DOMAIN_PREFIX}/jobs_alerts`,
            REVIEWS: `${DOMAIN_PREFIX}/reviews`,
            SCHEDULES_INTERVIEWS: `${DOMAIN_PREFIX}/sch_interview`,
            COMPANY_LIST: `${DOMAIN_PREFIX}/company_list`,
            SUBSCRIBERS_LIST: `${DOMAIN_PREFIX}/subscribers_list`,
            APPROVALS_LIST: `${DOMAIN_PREFIX}/approvals_list`,
            COMPANY_ADMIN_PAYMENT: `${DOMAIN_PREFIX}/ca_payment`,
            APPLICANT_LIST: `${DOMAIN_PREFIX}/applicant_list`,
            CHANGE_PASSWORD: `${DOMAIN_PREFIX}/change_password`,
            LOG_OUT: `${DOMAIN_PREFIX}/log_out`,
            JOB_POST: `${DOMAIN_PREFIX}/job_post`,
            JOB_LIST: `${DOMAIN_PREFIX}/job_list`,
            REVIEWS_LIST: `${DOMAIN_PREFIX}/reviews_list`,
            JOB_DETAILS: `${DOMAIN_PREFIX}/job_list/job_tabs`,
            PACKAGES: `${DOMAIN_PREFIX}/d_packages`,
            COMPANY_PACKAGES: `${DOMAIN_PREFIX}/c_packages`,
            COMPANY_PAYMENT: `${DOMAIN_PREFIX}/c_payment`,
            SETTINGS: `${DOMAIN_PREFIX}/settings`,
            JOB_SEARCH: `${DOMAIN_PREFIX}/job_search`,
        },
        JOBS: {
            LISTING: `${DOMAIN_PREFIX}/job_listing`,
            JOB: `${DOMAIN_PREFIX}/job`,
            SPONSOR: `${DOMAIN_PREFIX}/sponsor`,
            SKILLS: `${DOMAIN_PREFIX}/skills`,
            ROLES: `${DOMAIN_PREFIX}/roles`,
            LOCATION: `${DOMAIN_PREFIX}/location`,
            FULL_TIME: `${DOMAIN_PREFIX}/full_time`,
            PART_TIME: `${DOMAIN_PREFIX}/part_time`,
            HOME_BASED: `${DOMAIN_PREFIX}/home_base`,
            TUTOR: `${DOMAIN_PREFIX}/tutor`,
            INTERNSHIP: `${DOMAIN_PREFIX}/internship`,
        },
        AUTH: {
            SIGN_UP: `${DOMAIN_PREFIX}/register`,
            SIGN_IN: `${DOMAIN_PREFIX}/login`,
            SIGN_IN_ANONYMOUSLY: `${DOMAIN_PREFIX}/authenticating`,
            FORGOT_PASSWORD: `${DOMAIN_PREFIX}/forgotpassword`
        },
        GROUP: {
            DEFAULT: `${DOMAIN_PREFIX}/groups/`,
            NEWS: `${DOMAIN_PREFIX}/groups/news`,
            SCHEDULES: `${DOMAIN_PREFIX}/groups/schedules`,
            TASKS: `${DOMAIN_PREFIX}/groups/tasks`,
            EXPENSES: `${DOMAIN_PREFIX}/groups/expenses`,
        },
        PROJECT: {
            DEFAULT: `${DOMAIN_PREFIX}/projects/`,
            NEWS: `${DOMAIN_PREFIX}/projects/news`,
            SCHEDULES: `${DOMAIN_PREFIX}/projects/schedules`,
            TASKS: `${DOMAIN_PREFIX}/projects/tasks`,
            EXPENSES: `${DOMAIN_PREFIX}/projects/expenses`,
            TRAVEL: `${DOMAIN_PREFIX}/projects/travels`,
        },
        DOCUMENTS: {
            DEFAULT: `${DOMAIN_PREFIX}/documents/`,
            ITEM: `${DOMAIN_PREFIX}/documents`
        },
        SCHEDULES: `${DOMAIN_PREFIX}/schedules`,
        TASKS: `${DOMAIN_PREFIX}/tasks/`,
        LEAVES: `${DOMAIN_PREFIX}/leaves/`,
        EXPENSES: `${DOMAIN_PREFIX}/expenses`,
        TRAVELS: `${DOMAIN_PREFIX}/travels`,
        TRAVEL: {
            DEFAULT: `${DOMAIN_PREFIX}/travel`,
            CITIES: `${DOMAIN_PREFIX}/travel/cities`,
            APPROVALS: `${DOMAIN_PREFIX}/travel/approvals`,
            EXPENSES: `${DOMAIN_PREFIX}/travel/expenses`
        },
        ELEARNING: `${DOMAIN_PREFIX}/elearning/`,
        E_LEARNING: {
            DEFAULT: `${DOMAIN_PREFIX}/eLearningCourses/`,
            COURSE_LESSON: `${DOMAIN_PREFIX}/eLearningCourses/CoursesLesson`,
        },
        USER: {
            DEFAULT: `${DOMAIN_PREFIX}/user/`,
            TIMELINE: `${DOMAIN_PREFIX}/user/timeline`,
            INFORMATION: `${DOMAIN_PREFIX}/user/information`,
            SETTINGS: `${DOMAIN_PREFIX}/user/settings`,
            NOTES: `${DOMAIN_PREFIX}/user/notes`
        },
        CALL: {
            DEFAULT: `${DOMAIN_PREFIX}/call`,
            AUDIO: `${DOMAIN_PREFIX}/call/audiocall`,
            VIDEO: `${DOMAIN_PREFIX}/call/audiocall`
            // CALL: `${DOMAIN_PREFIX}/videocall/incall/?peer_id=100000554862579`,
        },
        HR: {
            LEAVES: `${DOMAIN_PREFIX}/hr/leaves/`,
            SALARY: `${DOMAIN_PREFIX}/hr/salary/`,
            TAXRECEIPTS: `${DOMAIN_PREFIX}/hr/taxreceipts/`,
            EMPLOYEES: {
                DEFAULT: `${DOMAIN_PREFIX}/hr/employees/`,
                BASIC_INFO: `${DOMAIN_PREFIX}/hr/employees/info`,
                EMAIL_CONFIG: `${DOMAIN_PREFIX}/hr/employees/emailconfig`,
                EDUCATION: `${DOMAIN_PREFIX}/hr/employees/education`,
                EXPERIENCE: `${DOMAIN_PREFIX}/hr/employees/experience`,
                PACKAGE: `${DOMAIN_PREFIX}/hr/employees/package`,
            },
            COMPANIES: `${DOMAIN_PREFIX}/hr/companies/`,
            EMPLOYEES_ADD: `${DOMAIN_PREFIX}/hr/employees/add`,
            DEPARTMENTS: `${DOMAIN_PREFIX}/hr/departments`,
            DETAILDEPARTMENTS: `${DOMAIN_PREFIX}/hr/departments/details`,
            DEFAULTDEPARTMENT: `${DOMAIN_PREFIX}/hr/department/view`,
            OFFICE_TIMINGS: `${DOMAIN_PREFIX}/hr/officetimings/`,
            OFFICE_TIMINGS_DEFAULT: `${DOMAIN_PREFIX}/hr/officetimings/timings`,
            OFFICE_TIMINGS_EMPLOYEES: `${DOMAIN_PREFIX}/hr/officetimings/employees`,
            HOLIDAYS: `${DOMAIN_PREFIX}/hr/holidays/`,
            LEVELS: `${DOMAIN_PREFIX}/hr/addlevels/`,
            APPROVALS_FLOW: {
                DEFAULT: `${DOMAIN_PREFIX}/hr/approvalflow`
            }
        },
        MAIL: {
            DEFAULT: `${DOMAIN_PREFIX}/mail`,
            SPAM: `${DOMAIN_PREFIX}/mail/id=INBOX.spam`,
            ARCHIVE: `${DOMAIN_PREFIX}/mail/id=INBOX.Archive`,
            SENT: `${DOMAIN_PREFIX}/mail/id=INBOX.Sent`,
            TRASH: `${DOMAIN_PREFIX}/mail/id=INBOX.Trash`,
            JUNK: `${DOMAIN_PREFIX}/mail/id=INBOX.Junk`,
            DRAFTS: `${DOMAIN_PREFIX}/mail/id=INBOX.Drafts`,
        }, EMAIL: {
            DEFAULT: `${DOMAIN_PREFIX}/mail`,
            SPAM: `${DOMAIN_PREFIX}/mail?id=INBOX.spam`,
            ARCHIVE: `${DOMAIN_PREFIX}/mail?id=INBOX.Archive`,
            SENT: `${DOMAIN_PREFIX}/mail?id=INBOX.Sent`,
            TRASH: `${DOMAIN_PREFIX}/mail?id=INBOX.Trash`,
            JUNK: `${DOMAIN_PREFIX}/mail?id=INBOX.junk`,
            DRAFTS: `${DOMAIN_PREFIX}/mail?id=INBOX.Drafts`,
        }
    },
    SOCKET_ACTIONS: {
        REGISTER_USER: "registerUser",
        MESSAGES_LISTENER: "messageListner",
        LOGOUT_LISTENER: "logoutFromDevice",
        MESSAGES_STATE_LISTENER: "messageStateListner",
        USER_STATUS_LISTENER: "UserStatus",
        MESSAGE_STATE_LISTENER: "messageStateListner",
        CONVERSATIONS_LISTENER: "conversationListener",
        NOTIFY_LISTENER: "notify",
        TYPING_LISTENER: "typingStatus",
        MESSAGES_STATUS: "messageStatus",
        COMMUNICATION_OUT: "communicationOut",
        COMMUNICATION_IN: "communicationIn",
        TESTING: "testing",
    },
    VIDEO: ["mp4"],
    IMAGE: ["jpg", "jpeg", "png", "gif"],
    DOCUMENT: {
        pdf: ["pdf"],
        word: ["doc", "docx"],
        excel: ["xls", "xlsx"],
        powerPoint: ["ppt", "pptx"]
    },
    TYPES: {
        STATS_TYPE: {
            SALARY: "salary",
            PAYMENT: "payment",
            CITY: "city",
            MARITAL: "marital",
            QUALIFICATION: "qualification",
            MONTHLY: "monthly",
        },
        PAYMENTS: {
            CASH: 1,
            CHEQUE: 2,
            BANK_TRANSFER: 3,
        },
        PACKAGES: {
            MONTHLY: "Monthly",
            YEARLY: "Yearly",
            ONE_TIME: "One Time",
        },
        APPLY_JOB: {
            SHOW_CV: {
                YES: 1,
                NO: 2
            },
            APPLY_TYPE: {
                KRS: "KRS",
                UPLOAD: "Upload",
                LASTCV: "LastCv"
            }
        },
        JOB_LIST_TYPE: {
            APPLY: "Apply",
            REJECT: "Rejected",
            SHORT_LIST: "Shortlisted",
            SCHEDULE: "ScheduleForInterview",
            INTERVIEW: "Interviewed",
            SELECTED: "Selected",
        },
        PROFILE_UPD: {
            ABOUT: 1,
            JOB_OPEN: 2,
            GENERAL_INFO: 3,
            EXP_INFO: 4,
            EDU_INFO: 5,
            SKILLS: 6,
            PROFILE_PIC: 7,
            COMPANY_PIC: 8,
            RESUME_URL: 9,
            AUDIO_URL: 10,
            VIDEO_URL: 11,
            PROJECT: 12,
            COURSE: 13,
            ACCOMPLISHMENT: 14,
        },
        COLORS: {
            DEFAULT: '#C255A0',
            RED: "#ff2626",
            GREY: "#939393",
        },
        ACCOMPLISHMENT: {
            PROJECT: "Project",
            COURSES: "Course"
        },
        USERS: {
            SUPER_ADMIN: 1,
            ADMIN: 2,
        },
        LOGO_TYPE: {
            MAIN: 1,
            LOGIN: 2
        },
        SALARY_RANGE: {
            "1": "0 - 15,000",
            "2": "16000 - 30,000",
            "3": "31,000 - 50,000",
            "4": "51,000 - 70,000",
            "5": "71,000 - 90,000",
            "6": "91,000 - 130,000",
            "7": "161,000 and above",
        },
        ATTACHMENTS: {
            IMAGE: 1,
            VIDEO: 2,
            PDF: 3,
            WORD: 4,
            EXCEL: 5,
            PPT: 6,
            INVALID: 0
        },
        POSTS: {
            DEFAULT: 1, // Text, Image, Video, Document
            POLL: 4
        },
        CHAT: {
            ONE_TO_ONE: 1,
            GROUP: 2
        },
        SIZE: { // MB
            IMAGE: 10,
            VIDEO: 100,
            DOCUMENT: 100,
        },
        STATUS: {
            IN_PROCESS: 1,
            APPROVED: 2,
            DECLINED: 3,
            RE_SEND: 4
        },
        APPROVALS: {
            DOCUMENTS: 89,
            LEAVES: 143,
            EXPENSE: {
                APPROVER: 113,
                EXECUTOR: 136
            }
        },
        CALL: {
            TYPE: {
                INCOMING: 1,
                CREATE_OFFER: 2,
                RECEIVE_OFFER: 3,
                CREATE_ANSWER: 4,
                RECEIVE_ANSWER: 5,
                SEND_ICE_CANDIDATE: 6,
                RECEIVE_ICE_CANDIDATE: 7,
                CREATE_CALL: 8,
                CREATE_CALL_STATUS: 9,
                RECEIVE_CALL: 1,
                RECEIVE_CALL_STATUS: 10,
                REGISTER_CALLING_CONNECTION: 11,
                DISPOSE_FROM_OTHER_CONNECTION: 12,
            },
            MODE: {
                AUDIO: 1,
                VIDEO: 2,
                INITIATE: 3,
                ANSWER: 4,
                VIDEO_ANSWER: 11,
                RINGING: 10,
                DECLINE: 5,
                NOT_ANSWER: 6,
                BUSY: 7,
                END_CALL: 8,
                MUTE: 12,
                UNMUTE: 13,
                CAM_ON: 14,
                CAM_OFF: 15,
            }
        }
    },
    RESPONSE: {
        status: "status",
        error: "error",
        success: "success",
        fail: "fail"
    },
    DEFAULTS: {
        guid: "00000000-0000-0000-0000-000000000000",
        GoogleMapApiKey: "AIzaSyCJFptT4n4M5XEadEHLMhby6abLcc_ZGKw",
        GoogleStaticMapApiKey: "AIzaSyDWPUq0H2sPCFam5mrmtGygH5KdK-m8z8A",
        MapCenter: {
            lat: 30.3894002,
            lng: 69.3532202
        }

    },
    EXPENSE_CATEGORIES: [{
        id: "2685d8ac-b905-4b33-b1d0-39e8b541cb99",
        label: "Transport",
        icon: "ic-transport"
    }, {
        id: "bda743c4-fed7-4a2d-bcb7-44e130ef9561",
        label: "Health",
        icon: "ic-health"
    }, {
        id: "47271eef-4541-4997-8f83-55eb4d15b1c7",
        label: "Food",
        icon: "ic-food"
    }, {
        id: "838deae4-4c22-4454-b8b5-61fc4c1e1d01",
        label: "Shopping",
        icon: "ic-shopping"
    }, {
        id: "7ba4a1e2-2ca7-4c3c-9e9c-6d0caedac3d2",
        label: "Entertainment",
        icon: "ic-entertainment"
    }, {
        id: "df2d36db-2ed1-4d8f-8144-7f2ab4e6ccc3",
        label: "Travel",
        icon: "ic-air-plane"
    }, {
        id: "df74e2dd-4e15-4c35-b192-8d6a81b56da2",
        label: "Bill",
        icon: "ic-dollar-bill"
    }, {
        id: "dd5aa6a2-4060-48d8-93c6-df3c1cd56298",
        label: "Office",
        icon: "ic-clip"
    }, {
        id: "32224d99-ed8e-4ed7-8b23-e06d96c5a9e6",
        label: "Fuel",
        icon: "ic-fuel"
    }],
    USER_RIGHTS: {
        APPLICANT: [1, 2, 5, 14, 9, 7, 3],
        COMPANY: [1, 2, 6, 4, 9, 15, 16, 3],
        ADMIN: [1, 2, 8, 10, 11, 20, 17, 19, 6, 4, 12, 13, 3],
        TUTORRIGHTS: [1, 2, 6, 4, 9, 15, 16, 3],
    },
    USER_TYPE: {
        ADMIN_TYPE: 110,
        COMPANY_TYPE: 100,
        APPLICANT_TYPE: 1,
        SUPER_ADMIN: 210,
        TUTOR: 120,
    },
    RIGHTS: {
        DB: 1,
        UP: 2,
        MSG: 3,
        JP: 4,
        JA: 5,
        JL: 6,
        RV: 8,
        SI: 9,
        CL: 10,
        AL: 11,
        PKG: 12,
        SET: 13,
        JS: 14,
        C_PKG: 15,
        C_PAY: 16,
        APR: 17,
        CA_PAY: 19,
        SL: 20,
    },
    LOGIN_USERS: {
        APPLICANT: {email: "user@applicant.com", pass: '123', type: 3},
        ADMIN: {email: "user@admin.com", pass: '123', type: 1},
        COMPANY: {email: "user@company.com", pass: '123', type: 2},
    }
};

export const ACTIONS = {
    FILES: {
        UPLOAD: {
            ERROR: "UPLOAD_ERROR",
            PENDING: "UPLOAD_PENDING",
            FULFILLED: "UPLOAD_FULFILLED"
        }
    },
    AUTH: {
        LOGIN: {
            ERROR: "LOGIN_ERROR",
            PENDING: "LOGIN_PENDING",
            FULFILLED: "LOGIN_FULFILLED"
        },
        SIGNUP: {
            ERROR: "SIGNUP_ERROR",
            PENDING: "SIGNUP_PENDING",
            FULFILLED: "SIGNUP_FULFILLED"
        },
        FORGOT_PASSWORD: {
            ERROR: "FORGOT_PASSWORD_ERROR",
            PENDING: "FORGOT_PASSWORD_PENDING",
            FULFILLED: "FORGOT_PASSWORD_FULFILLED"
        },
        ANONYMOUS: {
            ERROR: "ANONYMOUS_ERROR",
            PENDING: "ANONYMOUS_PENDING",
            FULFILLED: "ANONYMOUS_FULFILLED"
        },
        LOGOUT: "LOGIN_LOGOUT"
    },
    USER: {
        GET_ALL: {
            ERROR: "USER_GET_ALL_ERROR",
            PENDING: "USER_GET_ALL_PENDING",
            FULFILLED: "USER_GET_ALL_FULFILLED"
        },
        GET_BY_ID: {
            ERROR: "USER_GET_BY_ID_ERROR",
            PENDING: "USER_GET_BY_ID_PENDING",
            FULFILLED: "USER_GET_BY_ID_FULFILLED"
        }
    },
    NEWS: {
        GET_POSTS: {
            ERROR: "GET_POSTS_ERROR",
            PENDING: "GET_POSTS_PENDING",
            FULFILLED: "GET_POSTS_FULFILLED"
        },
        GET_POST_COMMENTS: {
            ERROR: "GET_POST_COMMENTS_ERROR",
            PENDING: "GET_POST_COMMENTS_PENDING",
            FULFILLED: "GET_POST_COMMENTS_FULFILLED"
        },
        CREATE_POST: {
            ERROR: "CREATE_POST_ERROR",
            PENDING: "CREATE_POST_PENDING",
            FULFILLED: "CREATE_POST_FULFILLED"
        },
        REMOVE_POST_REACTION: {
            ERROR: "REMOVE_POST_REACTION_ERROR",
            PENDING: "REMOVE_POST_REACTION_PENDING",
            FULFILLED: "REMOVE_POST_REACTION_FULFILLED"
        },
        ADD_POST_REACTION: {
            ERROR: "ADD_POST_REACTION_ERROR",
            PENDING: "ADD_POST_REACTION_PENDING",
            FULFILLED: "ADD_POST_REACTION_FULFILLED"
        },
        ADD_POLL_POST_REACTION: {
            ERROR: "ADD_POLL_POST_REACTION_ERROR",
            PENDING: "ADD_POLL_POST_REACTION_PENDING",
            FULFILLED: "ADD_POLL_POST_REACTION_FULFILLED"
        },
    },
    EXPENSES: {
        ADD: "ADD_EXPENSE",
        GET_ALL: {
            ERROR: "GET_ALL_EXPENSES_ERROR",
            PENDING: "GET_ALL_EXPENSES_PENDING",
            FULFILLED: "GET_ALL_EXPENSES_FULFILLED"
        },
        CREATE: {
            ERROR: "CREATE_EXPENSES_ERROR",
            PENDING: "CREATE_EXPENSES_PENDING",
            FULFILLED: "CREATE_EXPENSES_FULFILLED"
        }
    },
    CHATS: {
        TOGGLE_CHAT_COMPOSER: "TOGGLE_CHAT_COMPOSER",
        UPDATE_BOTTOM_CHAT_ROOMS: "UPDATE_BOTTOM_CHAT_ROOMS",
        UPDATE_CHATS: "UPDATE_CHATS",
        GET_ALL: {
            ERROR: "GET_ALL_CHATS_ERROR",
            PENDING: "GET_ALL_CHATS_PENDING",
            FULFILLED: "GET_ALL_CHATS_FULFILLED"
        }
    },
    GENERAL: {
        CITIES: {
            ERROR: "CITIES_ERROR",
            PENDING: "CITIES_PENDING",
            FULFILLED: "CITIES_FULFILLED"
        },
        Add_EMP: {
            ERROR: "Add_EMP_ERROR",
            PENDING: " Add_EMP_PENDING",
            FULFILLED: " Add_EMP_FULFILLED"
        }
    },
    NOTES: {
        TOGGLE_NOTES_AREA: "TOGGLE_NOTES_AREA",
        OPEN_NOTES_AREA: "OPEN_NOTES_AREA",
        CLOSE_NOTES_AREA: "CLOSE_NOTES_AREA",
    }
};

//-------------------- functions -------------------

export function SvgSpinner() {
    return (
        <span className="spinner-holder">
            <svg id="svg-spinner" xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 viewBox="0 0 48 48">
                <circle cx="24" cy="4" r="4" fill="#fff"/>
                <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2"/>
                <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4"/>
                <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7"/>
                <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9"/>
                <circle cx="24" cy="44" r="2.5" fill="#feebbc"/>
                <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af"/>
                <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1"/>
                <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94"/>
                <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86"/>
            </svg>
        </span>
    )
}

export const Spinner = ({myStyles}) => {
    return (
        <div className="spin-holder" style={myStyles}>
            <div className="spinner"/>
        </div>
    )
};

export function dropDownSelection() {
    $(document).ready(function () {
        $('select').niceSelect();
    })
}

export function downloadResume(strData, strFileName, strMimeType) {
    //console.log("download", strData, strFileName, strMimeType)
    var D = document,
        a = D.createElement("a");
    strMimeType = strMimeType || "application/octet-stream";


    if (navigator.msSaveBlob) { // IE10
        return navigator.msSaveBlob(new Blob([strData], {type: strMimeType}), strFileName);
    } /* end if(navigator.msSaveBlob) */


    if ('download' in a) { //html5 A[download]
        a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
        a.setAttribute("download", strFileName);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function () {
            a.click();
            D.body.removeChild(a);
        }, 66);
        return true;
    } /* end if('download' in a) */


    //do iframe dataURL download (old ch+FF):
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + strMimeType + "," + encodeURIComponent(strData);

    setTimeout(function () {
        D.body.removeChild(f);
    }, 333);
    return true;
}

export const BrokenPage = () => {
    return (
        <div className="br-content broken">
            <div className="heading">This page isn't available</div>
            <div className="message">The link you followed may be broken, or the page may have been removed.</div>
            <div className="image">
                <img src={brokenPaper} alt="#"/>
            </div>
            <div className="links">
                <Link to={STRINGS.ROUTES.ROOT}>Go to News</Link>
            </div>
        </div>
    )
};

export function setAutoHeightOfInput(element) {
    setTimeout(function () {
        element.css('height', '20px');
        element.css('padding', 0);
        element.css('-moz-box-sizing', 'content-box');
        element.css('height', `${element.prop("scrollHeight")}px`);
    }, 0);
}

export function isLogin() {
    let user = sessionStorage.getItem("rememberMe") !== null ? JSON.parse(sessionStorage.getItem(STRINGS.STORAGE.user)) : localStorage.getItem(STRINGS.STORAGE.user);
    // console.log("red", user)
    let login = true;
    let session = user !== null;
    if (!session) {
        //alert("Your Session has expired");
        login = false
    }
    return login
}

export function getTypeOfFile(fileName) {
    const ext = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length);
    if (STRINGS.IMAGE.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.IMAGE;
    else if (STRINGS.VIDEO.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.VIDEO;
    else if (STRINGS.DOCUMENT.pdf.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.PDF;
    else if (STRINGS.DOCUMENT.word.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.WORD;
    else if (STRINGS.DOCUMENT.excel.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.EXCEL;
    else if (STRINGS.DOCUMENT.powerPoint.includes(ext)) return STRINGS.TYPES.ATTACHMENTS.PPT;
    else return STRINGS.TYPES.ATTACHMENTS.INVALID
}

export function isDocument(ext) {
    let found = false;
    if (STRINGS.DOCUMENT.pdf.includes(ext)) found = true;
    else if (STRINGS.DOCUMENT.word.includes(ext)) found = true;
    else if (STRINGS.DOCUMENT.excel.includes(ext)) found = true;
    else if (STRINGS.DOCUMENT.powerPoint.includes(ext)) found = true;
    return found;
}

export function isValidFileSize(files) {
    const valid = {status: true, message: ""};
    for (const key in files) {
        if (files.hasOwnProperty(key)) {
            const file = files[key];
            const ext = file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length);
            const type = getTypeOfFile(file.name);
            const size = file.size / 1024 / 1024;
            if (type === STRINGS.TYPES.ATTACHMENTS.IMAGE) {
                if (size > STRINGS.TYPES.SIZE.IMAGE) {
                    const m = `${file.name} Size exceeds ${STRINGS.TYPES.SIZE.IMAGE}MB`;
                    valid.status = false;
                    valid.message += valid.message ? `\n${m}` : m;
                }
            } else if (type === STRINGS.TYPES.ATTACHMENTS.VIDEO) {
                if (size > STRINGS.TYPES.SIZE.VIDEO) {
                    const m = `${file.name} Size exceeds ${STRINGS.TYPES.SIZE.VIDEO}MB`;
                    valid.status = false;
                    valid.message += valid.message ? `\n${m}` : m;
                }
            } else if (isDocument(ext)) {
                if (size > STRINGS.TYPES.SIZE.DOCUMENT) {
                    const m = `${file.name} Size exceeds ${STRINGS.TYPES.SIZE.DOCUMENT}MB`;
                    valid.status = false;
                    valid.message += valid.message ? `\n${m}` : m;
                }
            } else {
                const m = `File ${file.name} Not Supported`;
                valid.status = false;
                valid.message = valid.message ? `\n${m}` : m;
            }
        }
    }
    return valid
}

export function resizeTabbableContainer() {
    const tabbableContainer = $(".tabbable-container");
    const tabbableContainerHeader = $(".cont-header");

    if ($(tabbableContainer.parent()[1]).hasClass('mm-tabs')) {
        const innerTabbableContainer = $(tabbableContainer[1]);
        const innerTabbableContainerContainerHeader = $(tabbableContainer[1]).children('.cont-header');
        const innerTabbableContainerContainerBody = $(tabbableContainer[1]).children('.cont-body');

        const innerTabbableContainerHeader = $(tabbableContainerHeader[1]);

        innerTabbableContainerContainerHeader.children('.ln').css('z-index', 0);
        innerTabbableContainerContainerBody.css({'margin-top': '0px'});
        innerTabbableContainerHeader.css({
            'width': `${innerTabbableContainer.outerWidth()}px`,
            'position': 'relative',
            'z-index': 0
        });

        $(window).resize(() => {
            innerTabbableContainerHeader.css({'width': `${innerTabbableContainer.outerWidth()}px`});
        });
    } else {
        const outerTabbableContainer = $(tabbableContainer[0]);
        const outerTabbableContainerHeader = $(tabbableContainerHeader[0]);

        outerTabbableContainerHeader.css({'width': `${outerTabbableContainer.outerWidth()}px`});

        $(window).resize(() => {
            outerTabbableContainerHeader.css({'width': `${outerTabbableContainer.outerWidth()}px`});
        });
    }
}

export function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

export function getCommentLikesView(count, youLike) {
    if (youLike) {
        return (<div className="count">You {count > 1 ? `and ${count - 1} other` : ""}</div>)
    } else {
        return (<div className="count">{count}</div>)
    }
}

export function getUserDataFromStorage(key = STRINGS.STORAGE.user, defaultValue) {
    const user = JSON.parse(localStorage.getItem(STRINGS.STORAGE.user));
    if (key === STRINGS.STORAGE.user) {
        return user;
    } else {
        if (defaultValue === undefined) {
            return user[key]
        } else {
            if (user[key] === undefined || user[key] === null || user[key].trim() === "") {
                return defaultValue
            } else {
                return user[key]
            }
        }
    }
}

// export function setAuthEnv(token, user, isRemember) {
//     sessionStorage.setItem(STRINGS.STORAGE.token, token);
//     sessionStorage.setItem("rememberMe", isRemember);
//     user.fullname = user.first_name + " " + user.last_name;
//     const userRights = user.type === 110 ? user.rights : user.type === 100 ? STRINGS.USER_RIGHTS.COMPANY : user.type === 1 ? STRINGS.USER_RIGHTS.APPLICANT : [];
//     user.rights = [...userRights, 1, 2]
//     // let cookieValue = escape(token + ";" + JSON.stringify(user) + ";");
//     // document.cookie = `${STRINGS.STORAGE.token} =` + cookieValue
//     sessionStorage.setItem(STRINGS.STORAGE.user, JSON.stringify(user));
//     window.location.href = STRINGS.ROUTES.DASHBOARD.HOME;
// }

export function setAuthEnvLocal(token, user, isRemember) {
    localStorage.setItem(STRINGS.STORAGE.token, token);
    localStorage.setItem("rememberMe", isRemember);
    user.fullname = user.first_name + " " + user.last_name;
    const userRights = user.type === 110 ? user.rights : user.type === 100 ? STRINGS.USER_RIGHTS.COMPANY : user.type === 1 ? STRINGS.USER_RIGHTS.APPLICANT : [];
    user.rights = [...userRights, 1, 2];
    localStorage.setItem(STRINGS.STORAGE.user, JSON.stringify(user));
    window.location.href = STRINGS.ROUTES.DASHBOARD.HOME;
}

export function logout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location = STRINGS.ROUTES.ROOT;
}

export function isRememberMe() {
    const rememberMe = sessionStorage.getItem("rememberMe") !== null && sessionStorage.getItem("rememberMe");
    return JSON.parse(rememberMe)
}


export function getNameForImage(name) {
    const split = name.split(' ');
    let firstName = "", lastName = "", symbol = "";
    if (split.length > 1) {
        firstName = split[0];
        lastName = split[1];
        symbol = `${firstName[0]}${lastName.length > 0 ? lastName[0] : ""}`;
    } else {
        symbol = `${firstName[0]}${lastName[0]}`;
    }
    return symbol.toUpperCase()
}

export function setUpMentionsView(inp, selectedList, users, submit = null) {
    let _thisVal, currentFocus = 0, val = "", appendText = false, startPosition = 0;
    let mentionListView = $(`<div id="mentions_list" class="input-search-list"></div>`);

    const mentionListViewPosition = {bottom: 'unset', top: 'unset', left: 'unset'};
    let leftPositionOfMentionList = 0;

    inp.on('mouseup keydown', function (e) {
        if (e.key === "@") {
            appendText = true;
            startPosition = $(this).caret('pos') + 1;
            const position = $(this).caret('position');

            leftPositionOfMentionList = position.left;

            if ((inp.offset().top + inp.outerHeight() + 22) >= $(window).height()) {
                mentionListViewPosition.top = "unset";
                mentionListViewPosition.bottom = 22;
            } else {
                mentionListViewPosition.bottom = "unset";
                mentionListViewPosition.top = !((position.top + 0) + position.height > 220) ? position.top + 22 : 220 + 18;
            }
        }
    });

    inp.on('input', function () {
        _thisVal = $(this).val();
        if (appendText) {
            if (_thisVal[startPosition - 1] === '@' && _thisVal[startPosition] !== ' ') {

                let endPosition = _thisVal.indexOf(' ', startPosition);
                endPosition = endPosition <= 0 ? _thisVal.length : endPosition;

                if (_thisVal[endPosition] !== ' ') {
                    val = _thisVal.substring(startPosition, endPosition).trim();
                    if ($.isEmptyObject(val)) {
                        mentionListView.empty();
                        mentionListView.removeClass('on');
                    } else {
                        inp.parent().append(mentionListView);
                        mentionListView.empty();
                        mentionListView.removeClass('on');
                        if (users.length > 0) {
                            mentionListView.addClass('on');
                            let userFound = false;
                            users.forEach(user => {
                                if (user.name.toLowerCase().includes(val.toLowerCase())) {
                                    userItem(user);
                                    userFound = true;
                                }
                            });
                            if ((leftPositionOfMentionList + inp.offset().left + mentionListView.outerWidth()) >= $(window).width()) {
                                mentionListViewPosition.left = leftPositionOfMentionList - mentionListView.outerWidth() + 15;
                            } else {
                                mentionListViewPosition.left = leftPositionOfMentionList;
                            }
                            mentionListView.css(mentionListViewPosition);

                            if (userFound) {
                                $(".search-item:nth-child(1)").addClass('on');
                                currentFocus = 0;
                            } else {
                                mentionListView.removeClass('on');
                            }
                        } else {
                            mentionListView.empty();
                            mentionListView.removeClass('on');
                        }
                    }
                } else removeMentionsList();
            } else removeMentionsList();
        }
    });

    inp.on('keydown', function (e) {
        let x = document.getElementById("mentions_list");
        if ($.isEmptyObject($(x).html())) {
            if (e.keyCode === 13 && submit !== null) {
                submit.submit();
                e.preventDefault();
            }
            return;
        }
        if (x) x = x.getElementsByClassName("search-item");
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(x);
            e.preventDefault();
        } else if (e.keyCode === 38) { //up
            currentFocus--;
            addActive(x);
            e.preventDefault();
        } else if (e.keyCode === 13) {
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
            e.preventDefault();
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("on");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("on");
        }
    }

    function removeMentionsList() {
        appendText = false;
        mentionListView.empty();
        mentionListView.removeClass('on');
        mentionListView.remove();
    }

    function userItem(user) {
        const contact = $(`<div class="search-item">
                                                    <div class="img"
                                                        ${!$.isEmptyObject(user.profile_picture)
            ? `style="background-image: url(${user.profile_picture}); background-repeat: no-repeat; background-size: 100%;"` : ''}
                                                     >${$.isEmptyObject(user.profile_picture)
            ? getNameForImage(user.name) : ''}</div>
                                                    <div class="pr">
                                                        <div class="n">${user.name}</div>
                                                        ${!$.isEmptyObject(user.designation) ? `<div class="p">${user.designation}</div>` : ''}
                                                    </div>
                                                </div>`);
        mentionListView.append(contact);

        contact.on('click', () => {
            _thisVal = _thisVal.replace(new RegExp(`@${val}`, 'g'), `${user.name} `);
            inp.val(_thisVal);
            selectedList.push({username: user.name, user_id: user.user_id});
            inp.focus();
            removeMentionsList();
        });
    }
}

export const getSalaryRange = (salaryRange) => {
    let val = "";
    const allSalaryRange = Object.entries(STRINGS.TYPES.SALARY_RANGE);
    allSalaryRange.map(([label, value]) => {
        if (salaryRange === parseInt(label)) {
            val = value;
        }
        return value
    })

    return val
}

/*---------------- Time functions -----------------*/
export function parseUrlsInText(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

export function parseDateAndTime(st = Date.now(), type = "short") {
    const date = new Date(parseInt(st));
    const options = {
        weekday: type,
        year: 'numeric',
        month: type,
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return date.toLocaleDateString("en-US", options);
}

export function getRelativeTime(d, t = "short") {
    const parseDate = parseDateAndTime(d, t);
    const difference = moment(parseDate).diff(new Date(), 'days');
    return Math.abs(difference) > 7 ? parseDate : moment(parseDate).fromNow()
}

export function parseDateWithoutTime(st, type = "short") {
    const date = new Date(parseInt(st));
    const options = {
        weekday: type,
        year: 'numeric',
        month: type,
        day: 'numeric'
    };
    return date.toLocaleDateString("en-US", options);
}

export function parseDateWithMontAndYear(st, type = "short") {
    const date = new Date(parseInt(st));
    const options = {
        year: 'numeric',
        month: type,
    };
    return date.toLocaleDateString("en-US", options);
}

export function parseDateTimeIntoLocalDateTime(st) {
    const date = new Date(parseInt(st));
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return {
        date: date.getDate(),
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        time: formatAMPM(date),
        dateAsLocalString: date.toLocaleDateString("en-US", {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
    }
}

export function parseTimeWithoutDate(st) {
    const date = new Date(parseInt(st));
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return date.toLocaleTimeString("en-US", options);
}

export function formatAMPM(dt) {
    let date = new Date(dt);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

export function onTimeChange(inputEle) {
    let timeSplit = inputEle.split(':'),
        hours,
        minutes,
        meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
    } else if (hours < 12) {
        meridian = 'AM';
        if (hours === 0) {
            hours = 12;
        }
    } else {
        meridian = 'PM';
    }
    return (hours + ':' + minutes + ' ' + meridian);
}


/*export function parseTimeWithoutDate(st) {
    const date = new Date(parseInt(st));
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    };
    return date.toLocaleTimeString("en-US", options);
}*/

export function parseDateFormat(st) {
    //2021-01-01
    const date = new Date(st);
    const dateFormat = (date.getFullYear() + "-" + (("0" + date.getMonth() + 1).slice(-2)) + "-" + ("0" + date.getDate()).slice(-2))
    //console.log("dateformate", dateFormat)
    return dateFormat
}

export function currentDateFormat(st) {
    //console.log("dateformate",st)
    //2021-01-01
    const date = st === undefined ? new Date() : new Date(parseDate(new Date().setDate(st)));
    const dateFormat = (date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + ("0" + date.getDate()).slice(-2))
    //console.log("dateformate", dateFormat)
    //console.log("dateformate",date)
    return dateFormat
}

export function setCurrentDateFormat(st) {
    //console.log("dateformate",st)
    //console.log("dateformate",new Date(parseDate(new Date((st)))))
    //2021-01-01
    const date = st === undefined ? new Date() : new Date(parseDate(new Date((st))));
    const dateFormat = (date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + ("0" + date.getDate()).slice(-2))
    //console.log("dateformate", dateFormat)
    //console.log("dateformate",date)
    return dateFormat
}

export function parseDate(d) {
    const date = new Date(d);
    // date.setTime(Date.parse(date.toString()) - Math.abs(date.getTimezoneOffset() * 60000));
    return Date.parse(date.toString());
}

export function calcDiffInDates(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays + 1)
}

export function parseDateToUnix(d) {
    const date = new Date(d);
    return Date.parse(date.toString());
}

/*---------------- Time functions -----------------*/

export function getDocHeight(doc) {
    doc = doc || document;
    // stackoverflow.com/questions/1145850/
    var body = doc.body, html = doc.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
}

export function setIframeHeight(id) {
    var ifrm = document.getElementById(id);
    if (ifrm !== null) {
        var doc = ifrm.contentDocument ? ifrm.contentDocument :
            ifrm.contentWindow.document;
        ifrm.style.visibility = 'hidden';
        ifrm.style.height = "10px"; // reset to minimal height ...
        // IE opt. for bing/msn needs a bit added or scrollbar appears
        ifrm.style.height = getDocHeight(doc) + 4 + "px";
        ifrm.style.visibility = 'visible';
    }

}

export const calculateAverage = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

export const compare_dates = (date1, date2) => (date1 > date2) ? 2 : (date1 < date2) ? 0 : 1;

// export const CryptoJS = () => {
//     const script = document.createElement("script");
//     script.src = "https://sandbox.jazzcash.com.pk/Sandbox/Scripts/hmac-sha256.js";
//     script.async = true;
//     document.body.appendChild(script);
// }

/*--------------------- UI Functions --------------------------*/
export function handleHideShow(dt) {
    //const {navBarUI} = this.state;
    const navBarUI = JSON.parse(dt);
    //console.log("nav", navBarUI)
    if (navBarUI) {
        // $("#sideNavContainer").removeClass("col-xl-2 col-lg-3");
        $(".dashboard-sidebar").css({width: '60px'});
        $(".nav li a span").hide();
        $(".dashboard-menu > ul > li h3").css({paddingLeft: '14px', paddingRight: '14px'})
    } else {
        // $("#sideNavContainer").addClass("col-xl-2 col-lg-3");
        $(".dashboard-sidebar").css({width: '100%'});
        $(".nav li a span").show();
        $(".dashboard-menu > ul > li h3").css({paddingLeft: '32px', paddingRight: '32px'})
    }
};

/*----Current User Data----*/

export function getUserData() {
    return isLogin() ? sessionStorage.getItem("rememberMe") !== null ? JSON.parse(sessionStorage.getItem(STRINGS.STORAGE.user)) : JSON.parse(localStorage.getItem(STRINGS.STORAGE.user)) : {}
}

// /*-------GTAG-------*/
// export const GA_TRACKING_ID = 'G-3MS43ES1FQ';
//
//
// // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// export const pageView = url => {
//     window.gtag('config', GA_TRACKING_ID, {
//         page_location: url
//     })
// }
//
// // https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const event = ({ action, category, label, value }) => {
//     window.gtag('event', action, {
//         event_category: category,
//         event_label: label,
//         value: value
//     })
// }











