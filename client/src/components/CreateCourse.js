import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],


  }


  render() {
    const {context} = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const user = context.authenticatedUser;
    return (
      <main>
          <div className="wrap">
              <h2>Create Course</h2>

              <Form
                  cancel={this.cancel}
                  submit={this.submit}
                  errors={errors}
                  submitButtonText="Create Course"
                  elements={() => (
                      <React.Fragment>
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
                              <input
                                  id="courseAuthor"
                                  name="courseAuthor"
                                  type="text"
                                  value={ `${user.firstName} ${user.lastName}` }
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

                      </React.Fragment>
                  )}
              />
          </div>
      </main>
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

  
  
  submit= () => {
    const {context} = this.props;
    const user = context.authenticatedUser;
    const userEmail = user.emailAddress;
    //const userEmail = user.emailAddress;
    const password = user.password;
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
    console.log(user);
    console.log(userEmail);
    console.log(userId);
    
    context.data
      .createCourse(course, userEmail, password)
      .then(errors => {
        if (errors.length) {
            this.setState(({errors}));
        } else {
            this.props.history.push('/');
            console.log(`course successfully created`);
        }
    })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });

      


    
  }

  cancel = () => {
    this.props.history.push('/');
  }

}

