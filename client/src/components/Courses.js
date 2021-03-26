import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/*
  Set up the state of our courses to blank array
 */
export default class Courses extends Component {
  state = {
    // populate array with fetched data
    courses: [],
  };

  // once component mounted load the courses into the array to display
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/courses`)
      .then((data) => {
        this.setState({
          courses: data.data,
          user: data.data.User,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        
      });
  }

  

  //push the populated data into the app
  render() {
    const results = this.state.courses;
    let courses = results.map((course) => (
      <React.Fragment key={course.id}>
        <div className='grid-33'>
          <Link
            className='course--module course--link'
            to={`/courses/${course.id}`}
          >
            <h4 className='course--label'>Course</h4>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
        </div>
      </React.Fragment>
    ));

    return(
      <div className='bounds'>
        {courses}
      </div>
    )
  }
}



