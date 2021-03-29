import React, { Component } from 'react';

export default class CreateCourse extends Component {

  cancel = () => {
    this.props.history.push('/');
  }


  render() {
    return (
      <div className="wrap">
        <h2>Create Course</h2>
        
        <form>
          <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" defaultValue="" />
  
                <label htmlFor="courseAuthor">Course Author</label>
                <input id="courseAuthor" name="courseAuthor" type="text" defaultValue="" />
  
                <label htmlFor="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription"></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" />
  
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
              </div>
            </div>
            <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
        </form>    
      </div>    
    )
  }
}

