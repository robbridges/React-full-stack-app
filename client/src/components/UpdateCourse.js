import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';




export default class UpdateCourse extends Component {
  // save all necessary inputs to state
  state = {
    course: [],
    user: [],
    errors: [],
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
  

  render() {
  const {course} = this.state;
  const user = `${this.state.user.firstName} ${this.state.user.lastName}`;
  const {errors} = this.state;
    
    

  return (
    <div className='bounds course--detail'>
      <h1>Update Course</h1>
      <Form
        cancel={this.cancel}
        errors={errors}
        submit={this.submit}
        submitButtonText='Update Course'
        elements={() => (
          <React.Fragment>
            <div className='grid-66'>
              <div className='course--header'>
                <h4 className='course--label'>Course</h4>
                <div>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    className='input-title course--title--input'
                    placeholder='Course title...'
                    value={course.title}
                    onChange={this.change}
                  />
                </div>
                <p>
                  By {this.state.user.firstName} {this.state.user.lastName}
                </p>
              </div>
              <div className='course--description'>
                <div>
                  <textarea
                    id='description'
                    name='description'
                    placeholder='Course description...'
                    value={course.description}
                    onChange={this.change}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className='grid-25 grid-right'>
              <div className='course--stats'>
                <ul className='course--stats--list'>
                  <li className='course--stats--list--item'>
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id='estimatedTime'
                        name='estimatedTime'
                        type='text'
                        className='course--time--input'
                        placeholder='Hours'
                        value={course.estimatedTime}
                        onChange={this.change}
                      />
                    </div>
                  </li>
                  <li className='course--stats--list--item'>
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id='materialsNeeded'
                        name='materialsNeeded'
                        placeholder='List materials...'
                        value={course.materialsNeeded}
                        onChange={this.change}
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );

}

}