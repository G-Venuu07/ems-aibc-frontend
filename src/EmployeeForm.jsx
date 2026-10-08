import { useEffect, useState } from "react";
import axios from "axios";
function EmployeeForm(){
      const [employees,setEmployees] = useState([]);
      const [formData,setFormData] = useState({
            id:"",
            name:"",
            email:"",
            password:""
      });
      const getEmployees =()=>{
            axios.get("http://localhost:8080/employee")
            .then((response)=>{
                  setEmployees(response.data);
            })
            .catch((error)=>{
                  console.log(error);
            })
      }
      useEffect(()=>{
            getEmployees();
      },[]);
      const handleChange = ((event)=>{
            const name = event.target.name;
            const value = event.target.value;
            setFormData({
                  ...formData,//spread operator
                  [name]:value
            });
      });
      const deleteEmployee=(id)=>{
            axios.delete(`http://localhost:8080/employee/${id}`)
            .then((response)=>{
                  getEmployees();
            }).catch((error)=>{
                  console.log(error);
            })
      }
      const employeeUpdate=(employee)=>{
            setFormData({
                  id:employee.id,
                  name:employee.name,
                  email:employee.email,
                  password:employee.password
            });
      }
      const handleSubmit=((e)=>{
            e.preventDefault();//control reloading the entire page
            if(formData.id===""){
                  axios.post("http://localhost:8080/employee",formData)
                  .then((response)=>{
                        getEmployees();
                        console.log(response.data);
                  })
                  .catch((error)=>{
                        console.log(error);
                  });
            }else{
                  axios.put(`http://localhost:8080/employee/${formData.id}`,formData)
                  .then((response)=>{
                        getEmployees();
                        console.log(response.data);
                  })
                  .catch((error)=>{
                        console.log(error);
                  });
            }
            
            setFormData({
                  id:"",
                  name:"",
                  email:"",
                  password:""
            });
      });
      return(
            <div>
                  <h2>Employee Registration Form</h2>
                  <form onSubmit={handleSubmit}>
                        Name:
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter your name"
                        onChange={handleChange}
                        />
                        <br/>
                        Email:
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        />
                        <br/>
                        Password:
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        />
                        <br/>
                        <button type="submit">{formData.id===""?"Register":"Update"}</button>
                  </form>
                  <table border={1}>
                        <thead>
                              <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Action</th>
                              </tr>
                        </thead>
                        <tbody>
                              {
                                    employees.map((employee)=>(
<tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.password}</td>
      <td>
            <button onClick={()=>{employeeUpdate(employee)}}>Edit</button>
            <button onClick={()=>{
                  deleteEmployee(employee.id)
            }}>Delete</button>
      </td>
                                          </tr>
                                    ))
                              }
                        </tbody>
                  </table>
            </div>
      );
}
export default EmployeeForm;