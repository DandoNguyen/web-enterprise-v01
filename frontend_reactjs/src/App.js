import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Management from './components/Management';
import UploadIdea from './components/UploadIdea';
import './App.css';
import Topic from './components/Topic';
import Category from './components/Category';
import ManageAccount from './components/ManageAccount';
import MyProfile from './components/MyProfile';
import MyPost from './components/MyPost';
import AboutUs from './components/AboutUs';


class App extends Component {
render() {
	return (
	<Router>
		<Routes>
                <Route exact path='/' element={<Login />}></Route>
				<Route exact path='/Home' element={< Home />}></Route>
				<Route exact path='/AboutUs' element={< AboutUs />}></Route>
                <Route exact path='/UploadIdea' element={< UploadIdea />}></Route>
                <Route exact path='/Management' element={< Management/>}></Route>
				<Route exact path='/Topic' element={< Topic />}></Route>
				<Route exact path='/Category' element={< Category />}></Route>
				<Route exact path='/ManageAccount' element={< ManageAccount/>}></Route>
				<Route exact path='/MyProfile' element={< MyProfile/>}></Route>
				<Route exact path='/MyPost' element={< MyPost />}></Route>
				{/* <Route exact path='/Profile' element={< Profile />}></Route> */}
				
		</Routes>
	</Router>
);
}
}

export default App;
