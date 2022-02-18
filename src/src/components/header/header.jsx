
import { useState } from 'react';
import HeaderAdmin from './header-admin/header-admin';
import HeaderAnonim from './header-anonim/header-anonim';
import HeaderStudent from './header-student/header-student';
import { Link } from 'react-router-dom'
import Logo from './uchihaLogo.png'
import './header.css'
import '../../common/commonStyle.css'
import authService from '../../services/AuthService';
import HeaderDeanAdmin from './header-dean/header-dean'
import HeaderComendantAdmin from './header-comendant/header-comendant'
import HeaderPasswordHolder from './header-passwordHolder/header-passwordHolder';

function Header() {
    // Anonim, Student, Admin
    const [logginState, setLoginState] = useState('anonim');


    let initializeUserRole = async () => {
        const initialLoginState = await authService.getUserRole();
        setLoginState(initialLoginState);
    }
    initializeUserRole();

    let renderControlls = () => {
        if (logginState === 'anonim') {
            return (
                <div>
                    <button onClick={() => console.log(logginState)}>Реєстрація</button>
                    <Link to='/login'>
                        <button onClick={() => authService.login()}>Вхід</button>
                    </Link>
                </div>
            );
        }


        return (
            <div>
                <button onClick={() => authService.logout()}>Вихід</button>
            </div>
        );

    }

    let renderBody = () => {
        if (logginState === 'student') {
            return (
                <HeaderStudent />
            );
        }

        if (logginState === 'admin') {
            return (
                <HeaderAdmin />
            );
        }

        if (logginState === 'dean') {
            return (
                <HeaderDeanAdmin />
            );
        }

        if (logginState === 'comendant') {
            return (
                <HeaderComendantAdmin />
            );
        }

        if (logginState === 'passportHolder') {
            return (
                <HeaderPasswordHolder />
            );
        }


        return (
            <HeaderAnonim />
        );
    }

    return (
        <div className='header'>
            <div className='headerUp'>
                <div className='headerLogo'>
                    <img src={Logo} ></img>
                </div>
                <div className='headerControll'>
                    {renderControlls()}
                </div>
            </div>
            <div className='headerBody'>
                {renderBody()}
            </div>
        </div>
    );
}

export default Header;
