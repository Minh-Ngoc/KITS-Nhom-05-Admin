import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function Input({ className, type, label, icon, ...props }) {
    const [isLabelUp, setIsLabelUp] = useState(false);
    const inputRef = useRef(null);
  
    const handleLabelClick = () => {
      setIsLabelUp(true);
      inputRef.current.focus();
    };
  
    const handleInputBlur = (event) => {
      if (event.target.value === '') {
        setIsLabelUp(false);
      }
    };

    const handleInputFocus = () => {
        handleLabelClick();
    };
    
    return (
        <Wrapper className={cx(className, 'input-group', isLabelUp ? 'label-up' : '')}>
            <label onClick={handleLabelClick}> {label} </label>
            <input 
                {...props}
                type="text" 
                onBlur={handleInputBlur} 
                onFocus={handleInputFocus}
                ref={inputRef}
            />
            { icon }
        </Wrapper>
    )
}

export default Input;