import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import Image from "components/Image";

const cx = classNames.bind(styles);

function Card({ className, label, selector, icon, value, unit, color, contentBottom, contentCenter, ...props }) {
    // Label đặt tên cho tiêu đề, icon là 1 component SVG, value là giá trị của card 
    // unit là đơn vị, color là màu nền của icon
    // selector là button select
    // contentBottom là phần content nằm bên dưới chart nằm trong orders Page
    // contentCenter là phần content nằm torng class content nằm trong card Product sales tatio
    return ( 
        <Wrapper className={cx('card', className)} {...props}>
            <div className={cx('header')}>
                <p className={cx('header__label')}> {label} </p>
                { selector }
            </div>
            <div className={cx('content')}>
                { contentCenter }

                { color && icon && (
                    <div className={cx('content__icon', color)}>
                        <Image comp={icon} />
                    </div>
                ) }

                { value && ( <span className={cx('value')}> {value}{unit} </span> ) }
            </div>

            {contentBottom}
        </Wrapper>
    );
}

export default Card;