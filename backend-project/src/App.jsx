import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css'
import Login from './Login'
import Admin from './admin/Admin'
import Enrollment from './Enrollment'
import Dashboard from './Dashboard'
import Faculty from './Faculty'
import Facultyapp from './Facultyapp'
import Facultyconpage from './Facultyconpage'
import Sdao from './Sdao'
import Sdaoapp from './Sdaoapp'
import Sdaoconpage from './Sdaoconpage'
import Itso from './Itso'
import Itsoapp from './Itsoapp'
import Itsoconpage from './Itsoconpage'
import Bulldogex from './Bulldogex'
import Bulldogexapp from './Bulldogexapp'
import Bulldogexconpage from './Bulldogexconpage'
import Accounting from './Accounting'
import Accountingapp from './Accountingapp'
import Accountingconpage from './Accountingconpage'
import User from './admin/User'
import Departments from './admin/Departments'
import AccountingAdmin from './admin/AccountingAdmin'
import BullexAdmin from './admin/BullexAdmin'
import FacultyAdmin from './admin/FacultyAdmin'
import ItsoAdmin from './admin/ItsoAdmin'
import SdaoAdmin from './admin/SdaoAdmin'

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="admin" element={<Admin />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/facultyapp" element={<Facultyapp />} />
            <Route path="/facultyconpage" element={<Facultyconpage />} />
            <Route path="/sdao" element={<Sdao />} />
            <Route path="/sdaoapp" element={<Sdaoapp />} />
            <Route path="/sdaoconpage" element={<Sdaoconpage />} />
            <Route path="/itso" element={<Itso />} />
            <Route path="/itsoapp" element={<Itsoapp />} />
            <Route path="/itsoconpage" element={<Itsoconpage />} />
            <Route path="/bulldogex" element={<Bulldogex />} />
            <Route path="/bulldogexapp" element={<Bulldogexapp />} />
            <Route path="/bulldogexconpage" element={<Bulldogexconpage />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/accountingapp" element={<Accountingapp />} />
            <Route path="/accountingconpage" element={<Accountingconpage />} />
            <Route path="/user" element={<User />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/accadmin" element={<AccountingAdmin />} />
            <Route path="/bulladmin" element={<BullexAdmin />} />
            <Route path="/facadmin" element={<FacultyAdmin />} />
            <Route path="/itsoadmin" element={<ItsoAdmin />} />
            <Route path="/sdaoadmin" element={<SdaoAdmin />} />
        </Routes>
    </Router>
);
}

export default App
