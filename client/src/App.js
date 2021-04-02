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
import UserSignOut from './components/UserSignOut';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import NotFound from './components/NotFound';
import Error from './components/UnhandledError';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import Forbidden from './components/Forbidden';


/* we are using our context class to make sure all the With context components below can access our database methods
and user context saved in state */
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithConext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);





const App = () => (
  <div className="App">
    <Router>
      
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path ="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path ="/courses/:id/update" component={UpdateCourseWithConext} />
          <Route exact path ="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path ="/error" component={Error} />
          <Route path ="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
          
          

        </Switch>

      

    </Router>


</div>
);

export default App;
