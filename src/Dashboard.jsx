import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api";

function Dashboard(){
      const [users,setUsers] = useState([]);
      const navigate = useNavigate();
      async function getUsers(){
            try{
                  const response = await api.get("/employee/get");
                  setUsers(response.data);
            }catch(err){
                  alert("Something went Wrong..");
            }
      }
      async function deleteUser(id){
            try{
                  await api.delete(`/employee/${id}`)
                  alert("User deleted successfully");
                  getUsers();
            }catch(err){
                  alert("Deletion Failed...");
            }
      }
      function updateUser(user){
            const name = prompt("Enter updated name",user.name);
            const email = prompt("Enter updated email",user.email);
            const password = prompt("Enter updated password",user.password);
            const updatedUser = {
                  name:name,
                  email:email,
                  password:password
            }
            
            try{
                  api.put(`/employee/${user.id}`,updatedUser);
                  alert("User updated successfully");
                  getUsers();
            }catch(err){
                  alert("Updation Failed...!!");
            }
      }
      function logout(){
            navigate("/");
            localStorage.removeItem("token");
      }
      return(
            <>
                  <h2>Employee Management System</h2>
                  <button onClick={getUsers}>Get</button>
                  <button onClick={logout}>Logout</button>

                  <table border={1}>
                        <thead>
                              <tr>
                                    <th>ID</th>
                                    <th>Employee name</th>
                                    <th>Employee Role</th>
                                    <th>Employee Email</th>
                                    <th>Action</th>
                              </tr>
                        </thead>
                        <tbody>
                              {
                                    users.map((user)=>(
                                          <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.role}</td>
                                                <td>{user.email}</td>
                                                <td>
                  <button onClick={()=>updateUser(user)}>Update</button>

                  <button onClick={()=>deleteUser(user.id)}>Delete</button>
                                                </td>
                                          </tr>

                                    ))
                              }
                        </tbody>
                  </table>
            </>
      );
}
export default Dashboard