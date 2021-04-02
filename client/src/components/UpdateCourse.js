import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';



// update course is now wired up and working 
export default class UpdateCourse extends Component {
  // save all necessary inputs to state
  state = {
    
    
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userFirstName: '',
    userLastName: '',
    ownerEmail: '',
    errors: [],

  }

  
  // pull the current course details from state and populates them into the form
  componentDidMount() {
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    const authUserEmail = authUser.emailAddress;
    
    const id = this.props.match.params.id;
    axios(`http://localhost:5000/api/courses/${id}`)
      .then((data) => {
        
          this.setState({ 
            
            userFirstName: data.data.User.firstName,
            userLastName: data.data.User.lastName,
            ownerEmail: data.data.User.emailAddress,
            title: data.data.title,
            description: data.data.description,
            estimatedTime: data.data.estimatedTime,
            materialsNeeded: data.data.materialsNeeded,
          });

          if (authUserEmail !== data.data.User.emailAddress) {
            this.props.history.push('/forbidden');
          }
        
      })
      
      .catch((error) => {
        console.log('Course not located', error);
        this.props.history.push('/notfound');
        
        
      });
  }
  // returns user to main index
  cancel = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/courses/${id}`);
  }
  

  render() {
    
    
    const {
      userFirstName,
      userLastName,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      
      errors,
    } = this.state;
  
  
    
    
    
  return (
    
    <div className='wrap'>
    
      <h1>Update Course</h1>
      <br />
      <Form
        cancel={this.cancel}
        errors={errors}
        submit={this.submit}
        submitButtonText='Update Course'
        elements={() => (
          <React.Fragment>
              
              <div className="main--flex">
                            <div>
                              <label htmlFor="courseTitle">
                                  Course Title
                                      </label>
                              <input
                                  id="title"
                                  name="title"
                                  type="text"
                                  value={title}
                                  onChange={this.change}
                              />
                              <label htmlFor="courseAuthor">
                                  Course Author
                                      </label>
                              {/* set value to read only as there should be no reason to update course author */}        
                              <input
                                  id="courseAuthor"
                                  name="courseAuthor"
                                  type="text"
                                  readOnly value={`${userFirstName} ${userLastName}`}
                                  onChange={this.change}
                              />
                              <label htmlFor="courseDescription">
                                  Course Description
                                      </label>
                              <textarea
                                  id="description"
                                  name="description"
                                  value={description}
                                  onChange={this.change}
                              />
                            </div>  
                          
                          <div>
                              <label htmlFor="estimatedTime">
                                  Estimated Time
                                      </label>
                              <input
                                  id="estimatedTime"
                                  name="estimatedTime"
                                  type="text"
                                  value={estimatedTime}
                                  onChange={this.change}
                              />
                              <label htmlFor="materialsNeeded">
                                  Materials Needed
                                      </label>
                              <textarea
                                  id="materialsNeeded"
                                  name="materialsNeeded"
                                  value={materialsNeeded}
                                  onChange={this.change}
                              />
                          </div>
                        </div>
            
          </React.Fragment>
        )}
      />
    </div>
  );
// updates any changes on the form to state
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
// request to data.js that actually calls the method into our api in teh app
submit = () => {
  
  const { context } = this.props;
  const user = context.authenticatedUser;
  const userEmail = user.emailAddress;
  const userPassword = user.password;
  const userId = user.id;
  const id = this.props.match.params.id;
  const { title, description, estimatedTime, materialsNeeded } = this.state; // saves all entered data
  const course = {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    userId,
  };
  console.log(user);
  //update the course using the api method in data
  context.data
    .updateCourse(id, course, userEmail, userPassword)
    .then((errors) => {
      if (errors) {
        this.setState({ errors });
      } else {
        this.setState({ course });
        this.props.history.push('/');
      }
    })
    .catch((error) => {
      console.log(error);
      this.props.history.push('/error');
    });
};

}