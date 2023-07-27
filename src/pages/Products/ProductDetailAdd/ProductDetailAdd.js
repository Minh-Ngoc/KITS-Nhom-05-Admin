import React, { useEffect, useState } from "react";
import classNames from 'classnames/bind';
import Wrapper from "components/Wrapper";
import FormInput from 'components/FormInput'
import styles from './ProductDetailAdd.module.scss';
import Button from "components/Button";
import { useSelector, useDispatch } from 'react-redux';

// Library UI
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ProductDetailAdd(props) {
    const { formAddProdDetail, productId } = props;
    const dispatch = useDispatch();

    // Price and quantity
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    // Size
    const sizeList = useSelector((state) => state.sizes.sizeList);
    const [size, setSize] = useState('');
    const [newSize, setNewSize] = useState('');

    // Color
    const colorList = useSelector((state) => state.colors.colorList);
    const [color, setColor] = useState('');
    const [newColor, setNewColor] = useState('');

    // Set state btn add
    const [btnAdd, setBtnAdd] = useState({
        size: false,
        color: false,
    });

    useEffect(() => {
        dispatch.sizes.fetchSizes();
        dispatch.colors.fetchColors();
    }, [dispatch.sizes, dispatch.colors]);

    //  Get size
    const getSize = (event) => {
        setSize(event.target.value);
    };


    // Get color
    const getColor = (event) => {
        setColor(event.target.value);
    };

    // Handle add new Size
    const btnAddNewSize = (e) => {
        e.preventDefault();
        dispatch.sizes.addSize({ sizeName: newSize})
            .then(res => {
                dispatch.sizes.setSizes(res.data.size)
                setBtnAdd({ ...btnAdd, size: !btnAdd.size });
            })
            .catch(err => {})
    }

    // Handle add new Color
    const btnAddNewColor = (e) => {
        e.preventDefault();
        dispatch.sizes.addSize({ colorName: newColor })
            .then(res => {
                setBtnAdd({ ...btnAdd, color: !btnAdd.color });
            })
            .catch(err => {})
    }

    // Handle submit form to add product
    const handleSubmit = e => { 
        e.preventDefault();
        const data = {
            quantityStock: quantity,
            priceStock: price,
            product: {
                productId: productId,
            },
            color: {
                colorName: color
            },
            size: {
                sizeName: size
            }
        };

        if(!quantity || !price || !size || !color ) {
            return toast.warning("PLEASE COMPLETE INFORMATION !", {
                position: toast.POSITION.TOP_CENTER
            })
        }

        Promise.all([dispatch.stock.addStock(data)])
            .then(res => {
                setPrice("");
                setQuantity("");
                setSize("");
                setColor("");
                toast.success("ADD NEW PRODUCT SUCCESSFULY !", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(err => toast.error("ADD NEW PRODUCT FAIL !", {
                position: toast.POSITION.TOP_CENTER
            }))
    }

    const goBack = () => {
        formAddProdDetail(false)
    }

    return (
        <Wrapper className={cx('product-add')}>
            <h2>Add Product Detail</h2>
            <form
                onSubmit={e => handleSubmit(e)}
            >
        
        {/* *********************** Quantity ****************************** */}
                <FormInput
                    className={cx('form-control', 'quantity')}
                    classNameIp={cx('form-control-ip')}
                    type="number"
                    label="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                />

        {/* *********************** Quantity ****************************** */}
                <FormInput
                    className={cx('form-control', 'price')}
                    classNameIp={cx('form-control-ip')}
                    label="Price"
                    onChange={(e) => setPrice(e.target.value)}
                />

        {/* *********************** SIZE ****************************** */}
                <div className={cx('form-control', 'category')}>
                    <p>Size <span>*</span> </p>
                    <div className={cx('category__container')}>
                        <Select
                            displayEmpty
                            value={size}
                            onChange={getSize}
                            inputProps={{ 'aria-label': 'Without label' }}
                            size="small"
                            style={{ width: 200 }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {sizeList?.map(size => 
                                <MenuItem 
                                    key={size.sizeName} 
                                    value={size.sizeName}
                                >
                                    {size.sizeName}
                                </MenuItem>) }
                        </Select>
                        <div className={cx('btn-other', btnAdd.size && 'other')}>
                            <Button 
                                content="Add new"
                                onClick={() => setBtnAdd({ ...btnAdd, size: !btnAdd.size})}
                            />
                        </div>
                        <div className={cx('btn-other', 'hidden', btnAdd.size && 'input')}>
                            <FormInput
                                className={cx('form-control')}
                                classNameIp={cx('form-control-ip')}
                                label="Size name"
                                onChange={(e) => setNewSize(e.target.value)}
                            />
                            <Button 
                                content="Add"
                                onClick={(e) => {
                                    setBtnAdd({ ...btnAdd, size: !btnAdd.size})
                                    btnAddNewSize(e)
                                }}
                            />
                        </div>

                    </div>
                </div>

        {/* *********************** COLOR ****************************** */}
                <div className={cx('form-control', 'category')}>
                    <p>Color <span>*</span> </p>
                    <div className={cx('category__container')}>
                        <Select
                            displayEmpty
                            value={color}
                            onChange={getColor}
                            inputProps={{ 'aria-label': 'Without label' }}
                            size="small"
                            style={{ width: 200 }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {colorList?.map(color => 
                                <MenuItem 
                                    key={color.colorName} 
                                    value={color.colorName}
                                >
                                    {color.colorName}
                                </MenuItem>) }
                        </Select>
                        <div className={cx('btn-other', btnAdd.color && 'other')}>
                            <Button 
                                content="Add new"
                                onClick={() => setBtnAdd({ ...btnAdd, color: !btnAdd.color})}
                            />
                        </div>
                        <div className={cx('btn-other', 'hidden', btnAdd.color && 'input')}>
                            <FormInput
                                className={cx('form-control')}
                                classNameIp={cx('form-control-ip')}
                                label="Color name"
                                onChange={(e) => setNewColor(e.target.value)}
                            />
                            <Button 
                                content="Add"
                                onClick={(e) => {
                                    setBtnAdd({ ...btnAdd, color: !btnAdd.color})
                                    btnAddNewColor(e)
                                }}
                            />
                        </div>

                    </div>
                </div>

        {/* *********************** SUBMIT ****************************** */}
                <div className={cx('btn-action')}>
                    <Button 
                        onClick={e => handleSubmit(e)}
                        content="SUBMIT"
                    />
                    <Button 
                        onClick={goBack}
                        className={cx('cancel')}
                        content="CANCEL"
                    />
                </div>
            </form>
        </Wrapper>
    )
}

export default ProductDetailAdd;