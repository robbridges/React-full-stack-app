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

  cancel = () => {
    this.props.history.push('/');
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
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText='Create Course'
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
                      value={title}
                      onChange={this.change}
                    />
                  </div>
                  <p>
                    By {user.firstName} {user.lastName}
                  </p>
                
                <div className='course--description'>
                  <div>
                    <textarea
                      id='description'
                      name='description'
                      placeholder='Course description...'
                      value={description}
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
                          value={estimatedTime}
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
                          value={materialsNeeded}
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

  cancel = () => {
    this.props.history.push('/');
  }
  
  submit= () => {
    const {context} = this.props;
    const user = context.authenticatedUser;
    const userEmail = user.email;
    const password = user.password;
    const userId =user.id;

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
    console.log(password);
    context.data
      .createCourse(course, userEmail, password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          this.props.history.push('/');
          console.log(`Course has been created`);
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push('/error');
      });

      


    
  }

  cancel = () => {
    this.props.history.push('/');
  }

}

