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
                <label for="courseTitle">Course Title</label>
                <input id="courseTitle" name="courseTitle" type="text" value="" />
  
                <label for="courseAuthor">Course Author</label>
                <input id="courseAuthor" name="courseAuthor" type="text" value="" />
  
                <label for="courseDescription">Course Description</label>
                <textarea id="courseDescription" name="courseDescription"></textarea>
              </div>
              <div>
                <label for="estimatedTime">Estimated Time</label>
                <input id="estimatedTime" name="estimatedTime" type="text" value="" />
  
                <label for="materialsNeeded">Materials Needed</label>
                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
              </div>
            </div>
            <button class="button" type="submit">Update Course</button><button class="button button-secondary" onClick={this.cancel}>Cancel</button>
        </form>    
      </div>    
    )
  }
}

