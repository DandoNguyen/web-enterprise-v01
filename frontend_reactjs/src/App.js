import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';
import UploadIdea from './components/UploadIdea/UploadIdea';
import './App.css';
import Category from './components/Category/Category';
import ManageAccount from './components/Admin/Account/ManageAccount';
import MyProfile from './components/Profile/MyProfile';
import AboutUs from './components/AboutUs/AboutUs'
import MyPost from './components/Mypost/MyPost';
import ManageDeadLine from './components/Topic/ManageDeadLine';
import ManageDepartmentIdea from './components/QACidea/ManageDepartmentIdea';
import ManageDepartmentQamDepartment from './components/department/ManageDepartmentQamDepartment'
import ManageDepartmentAccount from './components/QACAccount/ManageDepartmentAccount'
class App extends Component {
render() {
	return (
	<Router>
		<Routes>
                <Route exact path='/' element={<Login />}></Route>
				<Route exact path='/Home' element={< Home />}></Route>
				<Route exact path='/AboutUs' element={< AboutUs />}></Route>
                <Route exact path='/UploadIdea' element={< UploadIdea />}></Route>
				{/* <Route exact path='/Topic' element={< Topic />}></Route> */}
				<Route exact path='/ManageCategory' element={< Category />}></Route>
				<Route exact path='/ManageAccount' element={< ManageAccount/>}></Route>
				<Route exact path='/MyProfile' element={< MyProfile/>}></Route>
				<Route exact path='/MyPost' element={< MyPost />}></Route>\
				<Route exact path='/ManageDeadLine' element={< ManageDeadLine/>}></Route>
				<Route exact path='/ManageDepartmentIdea' element={< ManageDepartmentIdea/>}></Route>
				<Route exact path='/ManageDepartmentQamDepartment' element={< ManageDepartmentQamDepartment/>}></Route>
				<Route exact path='/ManageDepartmentIdea' element={< ManageDepartmentIdea/>}></Route>
				<Route exact path='/ManageDepartmentAccount' element={< ManageDepartmentAccount/>}></Route>
				{/* <Route exact path='/Profile' element={< Profile />}></Route> */}
				
		</Routes>
	</Router>
);
}
}

export default App;
