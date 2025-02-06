


const  permissions = [
    'users-list',
    'users-store',
    'users-detail',
    'users-update',
    'users-delete',
    'roles-list',
    'roles-store',
    'roles-detail',
    'roles-update',
    'roles-delete',
    'permissions-list',
    'permissions-store',
    'permissions-detail',
    'permissions-update',
    'permissions-delete',
    'patient-cases-list',
    'patient-cases-store',
    'patient-cases-detail',
    'patient-cases-update',
    'patient-cases-delete',
    'patient-cases-case-assign-to',
    'pending-approvals-list',
    'pending-approvals-store',
    'pending-approvals-detail',
    'pending-approvals-update',
    'pending-approvals-delete',
    'modification-receiveds-list',
    'modification-receiveds-store',
    'modification-receiveds-detail',
    'modification-receiveds-update',
    'modification-receiveds-delete',
    'need-more-info-list',
    'need-more-info-store',
    'need-more-info-detail',
    'need-more-info-update',
    'need-more-info-delete',
    'step-file-ready-list',
    'step-file-ready-store',
    'step-file-ready-detail',
    'step-file-ready-update',
    'step-file-ready-delete',
    'teams-list',
    'teams-store',
    'teams-detail',
    'teams-update',
    'teams-delete',
    'sub-client-list',
    'sub-client-store',
    'sub-client-detail',
    'sub-client-update',
    'sub-client-delete',
    'need-more-case-info',
    'ready-for-qa',
    'reject-planner-case',
    'approve-planner-case',
   
    'need-case-modification',
    'approve-case-by-ortho',
    'case-step-files-modification',
    'case-complete',
    'check-stl-files',
    'upload-stl-file',
    'reset-password'
    
    

];
export default permissions
// 1. case submitted case_status => 1
// 2. Treatment Planning case_status => 2
// 3. Passed QA case_status => 3
// 4. Need more info case_status => 4
// 5. Rejected By Qa case_status => 5
// 6. Approved By Qa case_status => 6 == Pending Ortho check == case_status ==6
// 7. Need Modifications (status by doctor to planner)  case_status => 7
// 8. Pending Step files case_status =>  8 (when doctor approves the case)  (post processing uploads files here)
// 9.   post processing adds stls files (status == 9)
// 10. if doctor want motr info  case_status=> 10  (need stepl file modification,case goese back to case processing team)
// 11. if approves  case_status =>11 ... case completed