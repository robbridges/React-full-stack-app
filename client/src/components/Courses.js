import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/*
Main route that lists all of the courses, we are correctly pushing the courses to and allowing CORS, 
we just need to find a way to display correctly, as the data is good the presentation of it is not.

*/
export default class Courses extends Component {
  state = {
    courses: [],
  };

  // component first mounts (or on reload), make axios call to API to retrieve the list of courses in the database, we just need to correctly render them. 
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

      });
  }

  

  
  render() {
    const results = this.state.courses;
    return;
  }
}
