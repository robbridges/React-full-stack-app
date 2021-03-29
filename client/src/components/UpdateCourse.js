import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';



// our place holder for the update course page, right now just displays information have not wired the API request up to it yet. 
export default class UpdateCourse extends Component {
  // save all necessary inputs to state
  state = {
    
    errors: [],
    courseTitle: '',
    courseDescription: '',
    courseEstimatedTime: '',
    courseMaterialsNeeded: '',
    userFirstName: '',
    userLastName: ''

  }

  

  componentDidMount() {
    const id = this.props.match.params.id;
    axios(`http://localhost:5000/api/courses/${id}`)
      .then((data) => {
        this.setState({ 
          
          userFirstName: data.data.User.firstName,
          userLastName: data.data.User.lastName,
          courseTitle: data.data.title,
          courseDescription: data.data.description,
          courseEstimatedTime: data.data.estimatedTime,
          courseMaterialsNeeded: data.data.materialsNeeded,});
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
        
        
      });
  }

  cancel = () => {
    this.props.history.push('/');
  }
  

  render() {
    const {
      
      userFirstName,
      userLastName,
      courseTitle,
      courseDescription,
      courseEstimatedTime,
      courseMaterialsNeeded,
      errors,
    } = this.state;
  
  
    
    

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
            
              <div className='course--header'>
                <h4 className='course--label'>Course</h4>
                <div>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    className='input-title course--title--input'
                    placeholder='Course title...'
                    value={courseTitle}
                    onChange={this.change}
                  />
                </div>
                <p>
                  By {userFirstName} {userLastName}
                </p>
              
              <div className='course--description'>
                <div>
                  <textarea
                    id='description'
                    name='description'
                    placeholder='Course description...'
                    value={courseDescription}
                    onChange={this.change}
                  ></textarea>
                </div>
              </div>
            </div>
            
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
                        value={courseEstimatedTime}
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
                        value={courseMaterialsNeeded}
                        onChange={this.change}
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            
          </React.Fragment>
        )}
      />
    </div>
  );

}
change = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  this.setState(() => {
    return {
      [name]: value,
    };
  });
};

}