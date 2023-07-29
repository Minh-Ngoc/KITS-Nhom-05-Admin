import Wrapper from 'components/Wrapper';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const navigate = useNavigate();
    const token = Cookies.get("token");
    console.log(token)
    if(!token) {
        return navigate("/login");
    }

    return ( 
        <Wrapper className={cx('layout')}>
            <Header />
            <div className={cx('main')}>
                <Sidebar />
                <div className={cx('container')}>
                    {children}
                </div>
            </div>
        </Wrapper>
    );
}

export default DefaultLayout;