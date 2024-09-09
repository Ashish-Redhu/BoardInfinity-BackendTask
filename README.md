
# Admin Panel API | User Management

Created 3-different types of users Admin, Manager, Employee with specified job roles and certain restrictions.
Application built with the help of Nodejs, Expressjs, PostgreSQL, JavaScript.
 

## Documentation

- For SignUp/Login, Admin jobs for Manager/Employee account-creation.


1.) ***'/api/auth/register'*** --> API POST request to register a new user(Admin/Manager/Employee). 

The conditions are added on the basis of what is selected in request body.

1.1) For Admin: If role selected as 'Admin' and admin don't exist, the API query will register a new Admin. Else will show an error message. 

1.2) For Manager/Employee: It will check either an 'Admin' exist or not. If yes, then either it has successfully logged in by the provided token or not. If both conditions satisfies. It will create a new Manager/Employee. Else will show an error message. 


2.) ***'/api/auth/login'*** : API Post request for login an (Admin/Manager/Employee) on the basis of username and password.


- Admin Jobs related to Project

3.) ***'/api/projects/create'***  : API Post request to create a new Project. Possible only by the 'Admin' also must be logged in to perform this action.

4.) ***'api/projects/delete/:id'*** : API Delete request to delete a project. 'authMiddleware' will check either it is the 'Admin' who wants to delete the project.

5.) ***'api/projects/assign-manager/:projectId'*** : API Post request to assign a manager to specified project. Remember you have to provide the managerId in the req.body. And, projectId will be fetched from the APIs parameters. 

- Manager Roles 

6.) ***'api/managers/assign-employee/:projectId'*** : Post API request by Manager to assign an employee to a particular project. Remember to send EmployeeId in request body.

7.) ***'api/managers/remove-employee/:projectId'*** : Post API request by Manager to remove an employee from a project. Here also the manager have to pass the 'EmployeeId' in request body.


- A Normal Employee Roles 
8.) ***'api/employees/projects'*** : Get API request by an employee to access all the projects has been assigned to him/her. 
authMiddleware in b/w to check either the User/employee is logged in or not with proper authentication jwt token. 


## Tech Stack


**Server:** Node, Express, PostgreSql, JavaScript.


## Installation

Install my-project with npm

```bash
  clone the repository
  npm install
  node app.js
```
    