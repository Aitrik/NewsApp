import * as React from "react";
import Navbar from "./CMS/Header";
import Main from "./CMS/Feed/Main";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Headlines from "./CMS/Feed/Headlines";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/headlines" element={<Headlines/>}/>
    </Routes>
    
    </BrowserRouter>
    
    </>
  );
}
