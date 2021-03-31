import React, {useState, useRef} from 'react';
import Errors from './Errors';

function CreateCourse(props) {
  
  //Set state using hooks
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [courseMaterials, setCourseMaterials] = useState('')
  const [errors, setErrors] = useState([]);

  //Setting variables and refs
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const timeInput = useRef(null);
  const materialsInput = useRef(null);

  //Helper Functions
  function Cancel(event) {
    event.preventDefault();
    props.history.push('/');
  }

  function Submit(e) {
    e.preventDefault();
    const {context} = props;
    const course = {
      title,
      description,
      estimatedTime,
      courseMaterials,
      userId: context.authenticatedUser.id
    }

    context.data.createCourse(course, context.authenticatedUser.emailAddress, context.authenticatedUser.password)
      .then((err) => {
        if (err.length) {
          setErrors(err)
        } else {
          props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        props.history.push('/error');
      })
  }
  function Change() {
    
      setTitle(titleInput.current.value);
      setDescription(descriptionInput.current.value);
      setEstimatedTime(timeInput.current.value);
      setCourseMaterials(materialsInput.current.value);
    
  }

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <Errors errors={errors} />
      <form onSubmit={Submit}>
        <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" ref={titleInput} onChange={Change} type="text" />
              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" ref={descriptionInput} onChange={Change}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" ref={timeInput} onChange={Change} type="text" />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea 
              id="materialsNeeded" 
              name="materialsNeeded" ref={materialsInput} onChange={Change}></textarea>
            </div>
          </div>
          <button class="button" type="submit">Update Course</button><button className="button button-secondary" onClick={Cancel}>Cancel</button>
      </form>    
    </div>    
  )

  
}
export default CreateCourse;
