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
import Error from './components/Error';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithConext = withContext(UpdateCourse);





const App = () => (
  <div className="App">
    <Router>
      
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <PrivateRoute path ="/courses/create" component={CreateCourseWithContext} />
          <Route exact path ="/courses/:id" component={CourseDetail} />
          <PrivateRoute path ="/courses/:id/update" component={UpdateCourseWithConext} />
          <Route path ="/courses/create" component={CreateCourse} />
          <Route path ="/error" component={Error} />
          <Route component={NotFound} />
          
          

        </Switch>

      

    </Router>


</div>
);

export default App;
