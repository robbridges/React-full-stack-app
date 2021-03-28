import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




export default class CourseDetail extends Component {
  state = {
    
    course: [],
    user: [],
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/${this.props.match.url}`)
      .then((data) => {
        this.setState({ course: data.data, user: data.data.User });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        // push onto error stack
        this.props.history.push('/notfound');
      });
  }
  
render() {
  const course = this.state.course;
  const user = `${this.state.user.firstName} ${this.state.user.lastName}`;
  return (
    <main>
      <div className ='actions--bar'>
          <div className ="wrap">
            <Link className ="button" to={`/courses/${course.id}/update`} >
              Update Course
            </Link>
            <Link className = "button" to ="/">
              Delete Course
            </Link>
            <Link className = "button" to='/'>
              Return to List
            </Link>
          </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {user} </p>
              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {course.materialsNeeded}
              </ul>
            </div>
          </div>
        </form>
      </div>
   </main>
   
   
  )
}

}
