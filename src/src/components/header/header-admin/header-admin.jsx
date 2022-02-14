
import './header-student.css'
import { useNavigate } from 'react-router-dom';

function HeaderAdmin() {
  const navigate = useNavigate();
  return (
    <div className='headerwrapper'>
      <div className='studentBody'>
        <button className='controll-button' onClick={() => navigate("/")}>Головна</button>
        <button className='controll-button' onClick={() => navigate("/admin/studentController")}>Студенти</button>
        <button className='controll-button' onClick={() => navigate("/admin/registration")}>Реєстрація</button>
        <button className='controll-button' onClick={() => navigate("/admin/roomsController")}>Кімнати</button>
      </div>
    </div>
  );
}

export default HeaderAdmin;
