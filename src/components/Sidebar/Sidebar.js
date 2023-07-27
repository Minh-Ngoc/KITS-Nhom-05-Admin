import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { DashBoardIcon, ResourcesIcon, ArrowBottomIcon } from "components/ImageList";
import Button from "components/Button";
import { useState } from "react";

const cx = classNames.bind(styles);

function Sidebar() {
    const [isActive, setIsActive] = useState(false);
    const [rotate, setRotate] = useState([]);

    const handleClick = (menuName) => {
        if (rotate.includes(menuName)) {
          setRotate(rotate.filter(name => name !== menuName));
        } else {
          setRotate([...rotate, menuName]);
        }
    };

    const menuList = [
        {
            name: 'Dashborads',
            icon: <DashBoardIcon />,
            children: ['Main', 'User'],
        },
        {
            name: 'Resources',
            icon: <ResourcesIcon />,
            children: ['Products', 'Orders'],
        },
    ];

    const SidebarMenu = menuList.map((menu, index) => (
        <div
          key={index}
          className={cx('menu', rotate.includes(menu.name) ? 'rotate' : '')}
        >
          <Button 
            comp="div"
            className={cx('menu-item')}
            srcLeft={menu.icon}
            content={menu.name}
            srcRight={<ArrowBottomIcon />}
            onClick={() => handleClick(menu.name)}
          />
            <div className={cx('subMenu')}>
                { menu.children.map(subMenu => (
                    <Button 
                        key={subMenu} 
                        comp="link"
                        to={`/${subMenu.toLowerCase()}`}
                        className={cx('subMenu__item', isActive === subMenu && 'active')}
                        srcLeft={menu.icon}
                        content={subMenu} 
                        onClick={() => setIsActive(subMenu)}
                    />
                )) }
            </div>
        </div>
    ));

    return (
        <Wrapper className={cx('container')}>
            { SidebarMenu }
        </Wrapper>
    );
}

export default Sidebar;