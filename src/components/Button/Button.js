import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import Image from "../Image";
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Button({ className, comp, srcLeft, alt, content, srcRight, ...prop }) {
    let Type = 'button';

//  Nếu muốn dùng thẻ div thay cho button thì truyền prop type là div
    if (comp === 'div') {
        Type = 'div';
    } else if (comp === 'link') {
        Type = Link
    }

    return ( 

        // Nếu muốn css cho button thì cần đặt tên cho wrapper sau đó trỏ tới selector button 
        // Vi du: Import Button,... Khi sử dụng: <Button className={cx('product__btn')}
        // Sau đó vào scss module:     .product__btn button { ... }
        <Type {...prop} className={cx('button', className)}>
            {/* prop srcLeft là image.src nếu là file .png và jpg */}
            {/* ngược lại thì nó là svg truyền vào prop comp  */}

            { <Image src={srcLeft} alt={alt} comp={srcLeft} /> }

            { comp !== 'link' ? <span> {content} </span> : content }

            {/* Trong phần dashboard thì thấy icon right có có dùng file .png và .jpg nên truyền thẳng vào là comp */}
            {/* Nếu muốn dùng file .png hoặc .jpg thì phải sửa lại prop alt của srcLeft và Right */}
            {/* Ví dụ: prop truyền vào là altLeft, altRight thì srcLeft 
                srcLeft là: <Image src={srcLeft} alt={altLeft} comp={srcLeft} /> 
                srcRight là: <Image src={srcRight} alt={altRight} comp={srcRight} /> 
            */}

            { <Image comp={srcRight} /> }
        </Type>
    );
}

export default Button;