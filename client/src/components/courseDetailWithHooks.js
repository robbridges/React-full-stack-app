// trying to get past the rendering bug, think it may be the way componenet did mount is called

import React, {useState, useEffect} from 'react';
import { Link,  } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function CourseDetailWithHooks(props) {
  const params = useParams();
  const id = params.id;

  const [course, setCourse] =useState({})
  
  

  useEffect(() => {
    axios(`http://localhost:5000/api/courses/${id}`)
    .then(data =>  setCourse(data.data))
    .catch(error => console.log('Something went wrong with the courses fetch'))
  }, [id,]);

  return (
    <main>
      <div className ='actions--bar'>
          <div className ="wrap">
            <Link className ="button" to={`/courses/${course.id}/update`} >
              Update Course
            </Link>
            <Link className = "button" to ="/">
              Delete Course
            </Link>
            <Link className = "button" to='/'>
              Return to List
            </Link>
          </div>
      </div>
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.User}   </p>
              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {course.materialsNeeded}
              </ul>
            </div>
          </div>
        </form>
      </div>
   </main>
   
   
  );
}
export default CourseDetailWithHooks;