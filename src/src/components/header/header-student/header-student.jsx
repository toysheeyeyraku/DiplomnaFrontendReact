
import './header-student.css'

function HeaderStudent() {
  return (
    <div className='headerwrapper'>
      <div className='studentBody'>
        <button className='controll-button'>Головна</button>
        <button className='controll-button'>Проплата</button>
        <button className='controll-button'>Порушення та відробіток</button>
        <button className='controll-button'>Комендант</button>
        <button className='controll-button'>Профіль</button>
      </div>
    </div>
  );
}

export default HeaderStudent;
