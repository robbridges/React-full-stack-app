import React, { Component } from 'react';
import { Link,  } from 'react-router-dom';
import axios from 'axios';




export default class CourseDetail extends Component {
  state = {
    
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userFirstName: '',
    userLastName: '',
    userEmail: '',

  }
  // get our data and set the current state of the course this is being called when we try to hit the link I'm not sure why, need to fix
  componentDidMount() {
    const id = this.props.match.params.id;
    
    axios(`http://localhost:5000/api/courses/${id}`)
      .then((data) => {
        this.setState({ 
          courseId: data.data.id,  
          userFirstName: data.data.User.firstName,
          userLastName: data.data.User.lastName,
          userEmail: data.data.User.emailAddress,
          courseTitle: data.data.title,
          courseDescription: data.data.description,
          courseEstimatedTime: data.data.estimatedTime,
          courseMaterialsNeeded: data.data.materialsNeeded

         });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        this.props.history.push('/');
        
      });
  }
  

  delete = () => {
    const {context} = this.props;
    const user = context.authenticatedUser;
    const {id} = this.props.match.params;
    const userId = user.id;
    
    const { 
      title,
      description,
      estimatedTime,
      materialsNeeded,
      
    }= this.state;
    
    const course = {
      
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      
      
    };
    // create a confirmation window to make sure that the user does want to delete the course
    const confirmation = window.confirm(`Are you sure you want to delete the course "${course.title}"?`);
        if (confirmation) {
            context.data.deleteCourse(id, user.emailAddress, user.password);
            this.props.history.push('/');
    }
  }
// setting up on our context values and values to be used in react component  
render() {
  const {context} = this.props;
  const {
      courseId,
      userFirstName,
      userLastName,
      userEmail,
      courseTitle,
      courseDescription,
      courseEstimatedTime,
      courseMaterialsNeeded,
      
    } = this.state;
    const user = context.authenticatedUser;
  return (
    <main>
      <div className ='actions--bar'>
          <div className ="wrap">
          { user.emailAddress === userEmail ?
          <React.Fragment>
            <Link className ="button" to={`/courses/${courseId}/update`} >
              Update Course
            </Link>
            <Link className = "button" to='/'  onClick={this.delete}>
              Delete Course
            </Link>
            <Link className="button" to="/">Return to List</Link>
          </React.Fragment>  
          :
          <React.Fragment>
            <Link className = "button" to='/'>
              Return to List
            </Link>
          </React.Fragment>  
          }
          </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{courseTitle}</h4>
              <p>By {userFirstName} {userLastName} </p>
              <p>{courseDescription}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{courseEstimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {courseMaterialsNeeded}
              </ul>
            </div>
          </div>
        </form>
      </div>
   </main>
   
   
  );
}

}

