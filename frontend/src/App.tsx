import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 

// Student pages
import StudentWC from "./studentside_components/Pages/student-wc";
import StudentDB from "./studentside_components/Pages/student-dashboard";
import Profile from "./studentside_components/Pages/student-profile";
import StudentCC from './studentside_components/Pages/student-classroom-content';
import StudentCW from './studentside_components/Pages/classroom-classwork'
import StudentPL from './studentside_components/Pages/student-people'
import StudentQL from './studentside_components/Pages/student-quizzes'


// Teacher pages
import ClassroomContent from '@/teacherside_components/Pages/classroom-content';
import ClassroomGradeCard from '@/teacherside_components/Pages/classroom-grade-card';
import ClassroomPeople from '@/teacherside_components/Pages/classroom-people';
import ClassroomQuizReport from '@/teacherside_components/Pages/classroom-quiz-report';
import ClassroomQuiz from '@/teacherside_components/Pages/classroom-quiz';
import ClassroomWC from '@/teacherside_components/Pages/classroom-WC';
import TeacherProfile from '@/teacherside_components/Pages/teacher-profile';
import TeacherQR from '@/teacherside_components/Pages/classroom-reports';

// General Pages
import LandingPage from "./Landing_page_components/landing-page";
import SignUpPage from "./login_components/signupform";
import LoginPage from "./login_components/loginform";
import Verification from "./login_components/email-verification";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<LandingPage/>} />
          <Route path="dashboard" element={<StudentDB />} />
          <Route path="classroom" element={<StudentWC />} />
          <Route path="profile" element={<Profile />} />
          <Route path="classroomcontent/:classid" element={<StudentCC />} />
          <Route path="classroomclasswork" element={<StudentCW />} />
          <Route path="classroompeople" element={<StudentPL />} />
          <Route path="login" element={<LoginPage />} /> 
          <Route path="signup" element={<SignUpPage />} /> 
          <Route path="verification" element={<Verification />} />
          <Route path="quizzes" element={<StudentQL />} />


        {/* Teacher Routes */}
        <Route path="/teacher/*">
          {/* Use :classCode for dynamic routing */}
          <Route path="classroomcontent/:classCode" element={<ClassroomContent />} />
          <Route path="grade-card" element={<ClassroomGradeCard />} />
          <Route path="people" element={<ClassroomPeople />} />
          <Route path="quiz" element={<ClassroomQuiz />} />
          <Route path="quiz-report" element={<ClassroomQuizReport />} />
          <Route path="WC" element={<ClassroomWC />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="classroomreport" element={<TeacherQR />} />
        </Route>

        {/* Redirect if the path doesn't match */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
