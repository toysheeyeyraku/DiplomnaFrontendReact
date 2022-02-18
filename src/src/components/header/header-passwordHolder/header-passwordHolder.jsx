
import './header-student.css'
import { useNavigate } from 'react-router-dom';

function HeaderPasswordHolder() {
  const navigate = useNavigate();
  return (
    <div className='headerwrapper'>
      <div className='studentBody'>
        <button className='controll-button' onClick={() => navigate("/")}>Головна</button>
        <button className='controll-button' onClick={() => navigate("/self/profile")}>Профіль</button>
      </div>
    </div>
  );
}

export default HeaderPasswordHolder;
