import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
        <Route path="/home" element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;