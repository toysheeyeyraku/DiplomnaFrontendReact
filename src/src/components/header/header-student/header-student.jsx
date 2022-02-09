
import './header-student.css'
import { useNavigate } from 'react-router-dom';

function HeaderStudent() {
  const navigate = useNavigate();
  return (
    <div className='headerwrapper'>
      <div className='studentBody'>
        <button className='controll-button' onClick={() => navigate("/")}>Головна</button>
        <button className='controll-button' onClick={() => navigate("/payment")}>Проплата</button>
        <button className='controll-button' onClick={() => navigate("/student/comendant")}>Комендант</button>
        <button className='controll-button' onClick={() => navigate("/student/profile")}>Профіль</button>
      </div>
    </div>
  );
}

export default HeaderStudent;
