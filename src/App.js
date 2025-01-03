import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Index";
import Home from "./Home/Index";
import BranchManage from './BranchManage/Index'

import BranchTable from "./BranchTable/Index";
const App=()=>{
  return(
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>}/> 
        <Route path="/branch" element={<BranchManage/>}/>
        <Route path="/table" element={<BranchTable/>}/>
        <Route path="/branch/:id" element={<BranchManage />}/>
      </Routes>
    </Router>
    </div>
  )
}
export default App