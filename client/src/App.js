import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CourseDetail from './components/CourseDetail';
import CourseDetailWithHooks from './components/courseDetailWithHooks'
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import NotFound from './components/Error';



const App = () => (
  <div className="App">
    <Router>
      
        <Header />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signin" component={UserSignIn} />
          <Route path ="/courses/create" component={CreateCourse} />
          <Route exact path ="/courses/:id" component={CourseDetail} />
          <Route path ="/courses/:id/update" component={UpdateCourse} />
          <Route path ="/courses/create" component={CreateCourse} />
          <Route component={NotFound} />
          
          

        </Switch>

      

    </Router>


</div>
);

export default App;
