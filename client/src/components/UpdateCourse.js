import React, { Component } from 'react';

import axios from 'axios';




export default class UpdateCourse extends Component {
  // save all necessary inputs to state
  state = {
    course: [],
    user: [],
    
  }

  

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/api/courses/${id}`)
      .then((data) => {
        this.setState({ course: data.data, user: data.data.User });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        
        this.props.history.push('/notfound');
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
  getUserName = () => {
    const user = `${this.state.user.firstName} ${this.state.user.lastName}`;
    return user; 
  }

  render() {
  const {course} = this.state;
  const user = `${this.state.user.firstName} ${this.state.user.lastName}`;
  
    
    

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} />

              <label htmlFor="courseAuthor">Course Author</label>
              <input id="courseAuthor" name="courseAuthor" type="text" defaultValue={user}  />

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" defaultValue={course.description}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded}></textarea>
            </div>
          </div>
          <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
      </form>    
    </div>    
  )

}

}