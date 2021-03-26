import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/**
 * Courses Component
 *  - / home route
 *  - retrieves the list of courses from the REST API /api/courses route
 *  - renders list of courses
 *  - each course needs to link to its respective "Course Detail" screen
 *  - component renders a link to the "Create Course" screen
 */
export default class Courses extends Component {
  state = {
    // populate array with fetched data
    courses: [],
  };

  // component first mounts (or on reload), make axios call to API to retrieve the list of courses in the database
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
        // push onto error stack
        this.props.history.push('/error');
      });
  }

  

  
  render() {
    const results = this.state.courses;
    return;
  }
}
