import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Management from './components/Management';
import UploadIdea from './components/UploadIdea';
import MyPost from './components/MyPost';
import AboutIntro from './components/AboutIntro';
import AboutHis from './components/AboutHis';
import AboutInvestor from './components/AboutInvestor';
import ManageAccount from './components/ManageAccount';
import ManageDeadLine from './components/ManageDeadLine';
import MyProfile from './components/MyProfile';
import ManageDepartmentAccount from './components/ManageDepartmentAccount'
import ManageDepartmentIdea from './components/ManageDepartmentIdea';
import ManageCategory from './components/ManageCategory';
import ManageDepartmentQamAccount from './components/ManageDepartmentQamAccount'
import ManageDepartmentQamIdea from './components/ManageDepartmentQamIdea'
import ManageDepartmentQamDepartment from './components/ManageDepartmentQamDepartment';
import './App.css';


class App extends Component {
render() {
	return (
	<Router>
		<Routes>
                <Route exact path='/' element={<Login />}></Route>
				<Route exact path='/Home' element={< Home />}></Route>
                <Route exact path='/UploadIdea' element={< UploadIdea />}></Route>
                <Route exact path='/Management' element={< Management/>}></Route>
				<Route exact path='/AboutUs' element={< AboutUs />}></Route>
				<Route exact path='/MyPost' element={< MyPost />}></Route>
				<Route exact path='/INTRODUCTION' element={< AboutIntro/>}></Route>
                <Route exact path='/HISTORY' element={< AboutHis/>}></Route>
                <Route exact path='/INVESTORRELATIONS' element={< AboutInvestor/>}></Route>
                <Route exact path='/ManageAccount' element={< ManageAccount/>}></Route>
                <Route exact path='/ManageDeadLine' element={< ManageDeadLine/>}></Route>
				<Route exact path='/MyProfile' element={< MyProfile/>}></Route>
				<Route exact path='/ManageDepartmentAccount' element={< ManageDepartmentAccount/>}></Route>
                <Route exact path='/ManageDepartmentIdea' element={< ManageDepartmentIdea/>}></Route>
                <Route exact path='/ManageCategory' element={< ManageCategory/>}></Route>
				<Route exact path='/ManageDepartmentQamAccount' element={< ManageDepartmentQamAccount/>}></Route>
				<Route exact path='/ManageDepartmentQamIdea' element={< ManageDepartmentQamIdea/>}></Route>
				<Route exact path='/ManageDepartmentQamDepartment' element={< ManageDepartmentQamDepartment/>}></Route>
		</Routes>
	</Router>
);
}
}

export default App;
