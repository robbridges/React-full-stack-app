import config from './Config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };


        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        // Check if auth is required
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        };

        return fetch(url, options);
    }
    
    // checks our database for a user that corresponds to email address and password
    async getUser(emailAddress, password) {
      const response = await this.api('/users', 'GET', null, true, {emailAddress, password});

      if (response.status === 200) {
          return response.json().then(data => data);
      }
      else if (response.status === 401) {
          return null;
      }
      else {
          throw new Error();
      }
    }


    // creates user in our data base
    async createUser(user) {
      const response = await this.api('/users', 'POST', user);
      if (response.status === 201) {
          return [];
      }
      else if (response.status === 400) {
          return response.json().then(data => {
              return data.errors;
          });
      }
      else {
          throw new Error();
      }
    }
    // creates coursee in our database
    async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {emailAddress, password})
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
    }
    // update course method from our database
    async updateCourse(id, course, emailAddress, password) {
    const response = await this.api('/courses/'+id, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      console.log('Course updated')
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  // delete course method from our database
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api('/courses/'+id, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      console.log('Course deleted')
    }
    else {
      throw new Error();
    }
  }
 
}

