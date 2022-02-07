import * as React from 'react';
import AppContent from '../components/AppContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header/header'
import './App.css';
import RegistrationComponent from '../components/registration/Registration.component'
import StudentProfileComponent from '../components/profile/studentProfile.component';
import Home from '../components/home/Home.component'

class App extends React.Component {
  public render() {
    return (
      <Router>

        <div className="body">
          <Header />
          <Routes>
            <Route path="/student/profile" element={<StudentProfileComponent />} />
            <Route path="/appContext" element={<AppContent />} />
            <Route path="/registration" element={<RegistrationComponent />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
