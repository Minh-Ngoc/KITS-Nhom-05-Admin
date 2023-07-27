import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Image from "components/Image";
import Button from "components/Button";
import { Logo, SearchIcon, NotificationIcon, avatar, ArrowBottomIcon } from 'components/ImageList'
import Input from "components/Input";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
    return (
        <Wrapper className={cx('header')}>
            <Link className={cx('logo')} to="/">
                <Image comp={<Logo />} />
            </Link>

            <div className={cx('nav')}>
                <Input className={cx('search')} label="Press / to search" icon={<SearchIcon />} />
                
                <div className={cx('menu')}>
                    <div className={cx('menu__notification')}>
                        <Image comp={<NotificationIcon />} />
                    </div>
                    <Button 
                        className={cx('menu__user')}
                        type="button" 
                        srcLeft={avatar} 
                        alt="Avatar-error" 
                        content="luanvuong" 
                        srcRight={<ArrowBottomIcon />}
                    />
                </div>
            </div>
        </Wrapper>
    );
}

export default Header;