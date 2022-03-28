import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Management from './components/Management';
import UploadIdea from './components/UploadIdea';
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
				<Route exact path='/about' element={< AboutUs />}></Route>
				{/* <Route exact path='/Profile' element={< Profile />}></Route> */}
				
		</Routes>
	</Router>
);
}
}

export default App;
