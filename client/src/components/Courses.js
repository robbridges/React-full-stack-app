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
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        this.props.history.push('/error');
      });
  }

  


  

  
  

  // setting up on our context values and values to be used in react component  
  render() {
    
    const results = this.state.courses;
    let courses = results.map((course) => (
      <React.Fragment key={course.id}>
        
          <Link
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h2 className='course--label'>Course</h2>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
        
      </React.Fragment>
      
      
    ));

    return (
      
      <div className="wrap main--grid">
        
        {courses}
        
        <Link
            className="course--module course--add--module"
            to='/courses/create'
          >
          <span className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
              New Course
          </span>
        </Link>
        
      </div>
      
    )
  }
}



