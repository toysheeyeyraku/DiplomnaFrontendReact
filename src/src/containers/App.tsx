import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header/header'
import './App.css';
import RegistrationComponent from '../components/admin/registration/Registration.component'
import SelfProfileComponent from '../components/self/profile/selfProfile.component';
import Home from '../components/common/home/Home.component'
import StudentPaymentComponent from '../components/student/payment/StudentPayment.component';
import StudentControllPanellComponent from '../components/admin/studentControlPannel/StudentControllPanell.component'
import AdminStudentProfileComponent from '../components/admin/studentProfile/AdminStudentProfile.component';
import AdminPaymentComponent from '../components/admin/payment/AdminPayment.component';
import AdminRoomComponent from '../components/admin/room/AdminRoom.component';
import RoomsControlPanelComponent from '../components/admin/roomsController/RoomsController.component';

class App extends React.Component {
  public render() {
    return (
      <Router>

        <div className="body">
          <Header />
          <Routes>
            <Route path='admin/roomsController' element={<RoomsControlPanelComponent />} />
            <Route path="admin/student/profile" element={<AdminStudentProfileComponent />} />
            <Route path="/admin/studentController" element={<StudentControllPanellComponent />} />
            <Route path='/admin/payment' element={<AdminPaymentComponent />} />
            <Route path='/admin/room' element={<AdminRoomComponent />} />
            <Route path="admin/registration" element={<RegistrationComponent />} />
            <Route path="/self/profile" element={<SelfProfileComponent />} />
            <Route path='/student/payment' element={<StudentPaymentComponent />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
