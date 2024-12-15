import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/ui/sidebarupdated';
import Classroom from '@/teacherside_components/Pages/classroom';
import ClassroomContent from '@/teacherside_components/Pages/classroom-content';
import ClassroomGradeCard from '@/teacherside_components/Pages/classroom-grade-card';
import ClassroomPeople from '@/teacherside_components/Pages/classroom-people';
import ClassroomQuizReport from '@/teacherside_components/Pages/classroom-quiz-report';
import ClassroomQuiz from '@/teacherside_components/Pages/classroom-quiz';
import ClassroomWC from '@/teacherside_components/Pages/classroom-WC';
import TeacherProfile from '@/teacherside_components/Pages/teacher-profile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[250px] p-4">
          <Routes>
            <Route path="/classroom" element={<Classroom />}>
              <Route path="content" element={<ClassroomContent />} />
              <Route path="grade-card" element={<ClassroomGradeCard />} />
              <Route path="people" element={<ClassroomPeople />} />
              <Route path="quiz" element={<ClassroomQuiz />} />
              <Route path="quiz-report" element={<ClassroomQuizReport />} />
              <Route path="WC" element={<ClassroomWC />} />
            </Route>
            <Route path="/teacher-profile" element={<TeacherProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
