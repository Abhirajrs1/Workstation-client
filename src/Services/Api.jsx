import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import React from 'react'
import Login from "../Containers/User/Login/Login";
import SignUp from "../Containers/User/SignUp/SignUp";
import ForgotPassword from "../Containers/User/ForgotPassword/ForgotPassword";
import Otp from "../Containers/User/Otp/Otp";
import Home from "../Containers/Home/Home";
import RecruiterSignUp from "../Containers/Recruiter/RecruiterSignup/RecruiterSignup";
import RecruiterLogin from "../Containers/Recruiter/RecruiterLogin/RecruiterLogin";
import RecruiterOtp from "../Containers/Recruiter/RecruiterOtp";
import ResetPassword from "../Containers/User/ResetPassword/ResetPassword";
import RecruiterForgotPassword from "../Containers/Recruiter/RecruiterForgotPassword/RecruiterForgotPassword";
import RecruiterResetPassword from "../Containers/Recruiter/RecruiterResetPassword";
import UserContext from "../Context/UserContext";
import Profile from "../Containers/User/Profile/Profile";
import ContactForm from "../Containers/User/Profile/ContactForm";
import Qualifications from "../Containers/User/Profile/Qualifiacations";
import RecruiterHome from "../Containers/Recruiter/RecruiterHome/RecruiterHome";
import RecruiterContext from "../Context/RecruiterContext";
import PageNotFound from "../Components/PageNotFound";
import JobPosting from "../Containers/Recruiter/JobPosting/JobPosting";
import JobListing from "../Containers/Recruiter/JobListing/JobListing";
import AdminLogin from "../Containers/Admin/AdminLogin/AdminLogin";
import AdminContext from "../Context/AdminContext";
import AdminHome from "../Containers/Admin/AdminHome/AdminHome";
import Candidates from "../Containers/Admin/AdminCandidates/Candidates";
import Recruiters from "../Containers/Admin/AdminRecruiters/Recruiters";
import Jobs from "../Containers/Admin/AdminJobs/Jobs";
import AdminJobListing from "../Containers/Admin/AdminJobs/AdminJobListing";
import Categories from "../Containers/Admin/AdminCategories/Categories";
import AddCategory from "../Containers/Admin/AdminCategories/AddCategory";
import EditCategory from "../Containers/Admin/AdminCategories/EditCategory";
import IndividualJob from "../Containers/Recruiter/JobListing/IndividualJob";
import ApplicationSuccess from "../Containers/User/JobApplication/ApplicationSuccess";
import ApplicationFailure from "../Containers/User/JobApplication/ApplicationFailure";
import Resume from "../Containers/User/Resume/Resume";
import EditResume from "../Containers/User/Resume/EditResume";
import EditJob from "../Containers/Recruiter/JobListing/EditJob";
import JobApplications from "../Containers/Recruiter/JobApplications/JobApplications";
import JobApplicationDetails from "../Containers/Recruiter/JobApplications/JobApplicationDetails";
import CompanySignup from "../Containers/Company/CompanySignUp/CompanySignup";
import CompanyContext from "../Context/CompanyContext";
import CompanyLogin from "../Containers/Company/CompanyLogin/CompanyLogin";
import CompanyHome from "../Containers/Company/CompanyHome/CompanyHome";
import WorkExperience from "../Containers/User/Profile/WorkExperience";
import Plans from "../Containers/Admin/Plans/Plans";
import AddPlans from "../Containers/Admin/Plans/AddPlans";
import PlanListing from "../Containers/Recruiter/PlanListing/PlanListing";
import ReviewApplication from "../Containers/User/JobApplication/ReviewApplication";
import ApplicationListing from "../Containers/User/JobApplication/ApplicationListing";
import Companies from "../Containers/Admin/AdminCompanies/Companies";
import CompanyProfile from "../Containers/Company/CompanyProfile/CompanyProfile";
import CompanyProfileForm from "../Containers/Company/CompanyProfile/CompanyProfileForm";

function Api() {
  return (
    <>
    <UserContext>
      <RecruiterContext>
        <AdminContext>
          <CompanyContext>
      <Router>
        <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/employee-signup" element={<SignUp/>}/>
            <Route path="/employee-login" element={<Login/>}/>
            <Route path="/employee-verifyOtp" element={<Otp/>}/>
            <Route path="/employee-forgotPassword" element={<ForgotPassword/>}/>
            <Route path="/employee-resetPassword/:token" element={<ResetPassword/>}/>
            <Route path="/employee-profile" element={<Profile/>}/>
            <Route path="/employee-profile/editcontact" element={<ContactForm/>}/>
            <Route path="/employee-profile/qualifications" element={<Qualifications/>}/>
            <Route path="/employee-jobApplicationSuccess" element={<ApplicationSuccess/>}/>
            <Route path="/employee-jobApplicationFailure" element={<ApplicationFailure/>}/>
            <Route path="/employee-resume" element={<Resume/>}/>
            <Route path="/employee-editResume" element={<EditResume/>}/>
            <Route path="/employee-profile/workexperience" element={<WorkExperience/>}/>
            <Route path="/employee-reviewApplication/:id" element={<ReviewApplication/>}/>
            <Route path="/employee-applicationListing" element={<ApplicationListing/>}/>


            

            <Route path="/recruiter-home" element={<RecruiterHome/>}/>
            <Route path="/recruiter-signup" element={<RecruiterSignUp/>}/>
            <Route path="/recruiter-login" element={<RecruiterLogin/>}/>
            <Route path="/recruiter-verifyOtp" element={<RecruiterOtp/>}/>
            <Route path="/recruiter-forgotPassword" element={<RecruiterForgotPassword/>}/>
            <Route path="/recruiter-resetPassword/:token" element={<RecruiterResetPassword/>}/>
            <Route path='/recruiter-postJob' element={<JobPosting/>}/>
            <Route path="/recruiter-listJob" element={<JobListing/>}/>
            <Route path="/recruiter-viewJob/:id" element={<IndividualJob/>}/>
            <Route path="/recruiter-editJob/:id" element={<EditJob/>}/>
            <Route path="/recruiter-showApplications" element={<JobApplications/>}/>
            <Route path="/recruiter-viewApplicationDetails/:id" element={<JobApplicationDetails/>}/>
            <Route path="/recruiter-planListing" element={<PlanListing/>}/>



            <Route path="/admin-login" element={<AdminLogin/>}/>
            <Route path="/admin-home" element={<AdminHome/>}/>
            <Route path="/admin-candidates" element={<Candidates/>}/>
            <Route path="/admin-recruiters" element={<Recruiters/>}/>
            <Route path="/admin-jobs" element={<Jobs/>}/>
            <Route path="/admin-jobdetails/:id" element={<AdminJobListing/>}/>
            <Route path="/admin-categories" element={<Categories/>}/>
            <Route path="/admin-categories/add" element={<AddCategory/>} />
            <Route path="/admin-editcategory/:id" element={<EditCategory/>}/>
            <Route path="/admin-plans" element={<Plans/>}/>
            <Route path="/admin-addPlans" element={<AddPlans/>}/>
            <Route path="/admin-companies" element={<Companies/>}/>


            <Route path="/company-signup" element={<CompanySignup/>}/>
            <Route path="/company-login" element={<CompanyLogin/>}/>
            <Route path="/company-home" element={<CompanyHome/>}/>
            <Route path="/company-profile" element={<CompanyProfile/>}/>
            <Route path="/company-profile/editForm" element={<CompanyProfileForm/>}/>





            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
      </CompanyContext>
      </AdminContext>
      </RecruiterContext>
      </UserContext>
    </>
  )
}

export default Api
