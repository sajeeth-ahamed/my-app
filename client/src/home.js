import "./page-styles/Home.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DASH from "./components/Dash-bord";
import All from "./pages/Dashboard";
import QrG from './pages/QRgenerator';
import QrV from './pages/QRviewer';
import Add from './pages/Staffcreate';
import Edit from './pages/Editstaff';
import Staff from './pages/Staff';
import LogOut from "./pages/LogOut";
import Details from "./pages/StaffDetails";
import Settings from './pages/Settings';
import Register from './components/RegisterPage';
import Loginpage from './components/Loginpage';
import Attendance from './pages/Attendance';
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const Home = () => {

    const [staffId, setStaffId] = useState("");

    const getStaffIdHandler = (id) => {
        console.log("ID of the selected staff is :", id)
        setStaffId(id);
    }

    const searchFilterSelected = (searchValue) => {
        console.log(searchValue)
    }

    return (
        <div className="container-fluid m-0 p-0 float-start">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Loginpage />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<DASH />} />
                    <Route path='/dash' element={<All />} />
                    <Route
                        path='/about'
                        element={<Staff getStaffId={getStaffIdHandler} />} />
                    <Route
                        path="/Attendance"
                        element={<Attendance
                            getStaffId={getStaffIdHandler}
                            onSearchFilterSelected={searchFilterSelected}
                        />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/logout" element={<LogOut />} />
                    <Route path="/qrview" element={<QrV />} />
                    <Route
                        path="/qrgenerate"
                        element={<QrG id={staffId} setStaffId={setStaffId} />} />
                    <Route path="/addStaff" element={<Add />} />
                    <Route
                        path="/staffdetails"
                        element={<Details id={staffId} setStaffId={setStaffId} />} />
                    <Route
                        path="/staffedit"
                        element={<Edit id={staffId} setStaffId={setStaffId} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Home;