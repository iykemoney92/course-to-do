import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Nav from './components/navigation.component';
import Student from './components/student.component';
import EditCourse from './components/edit-course.component';
import CreateCourse from './components/create-course.component';
import Courses from './components/courses.component';

function App() {
  return (
    <Router>
      <div>
      <Nav /> 
      <Route path="/" exact component={Courses} />
      <Route path="/edit/:id" component={EditCourse} />
      <Route path="/create" component={CreateCourse} />
      <Route path="/student" component={Student} />
      </div>
    </Router>
  );
}

export default App;
