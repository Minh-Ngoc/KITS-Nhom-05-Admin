import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from 'classnames/bind';
import Wrapper from "components/Wrapper";
import Editor from "components/Editor";
import FormInput from 'components/FormInput'
import ImageUploader from "components/ImageUploader";
import styles from './ProductAdd.module.scss';
import Button from "components/Button";

// Library UI
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { toast } from 'react-toastify';

// Axios
import axios from "axios";

const cx = classNames.bind(styles);

function ProductAdd() {
    const navigate = useNavigate();

    // Name, price and quantity
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    // Category
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');

    // Size
    const [sizeList, setSizeList] = useState([]);
    const [size, setSize] = useState('');
    const [newSize, setNewSize] = useState('');

    // Color
    const [colorList, setColorList] = useState([]);
    const [color, setColor] = useState('');
    const [newColor, setNewColor] = useState('');

    // Brand, description and images
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState();
    const [images, setImages] = useState([]);

    // Set state btn add
    const [btnAdd, setBtnAdd] = useState({
        category: false,
        size: false,
        color: false,
    });

    //  Get data from API
    useEffect(() => {
        async function callAPI(){
            const categoryList = "http://localhost:8080/category/getallcategory";
            const SizeList = "http://localhost:8080/sizes/getallsize";
            const ColorList = "http://localhost:8080/colors/getallcolor";
            
            // make the API call
            await Promise.all([axios.get(categoryList), axios.get(SizeList), axios.get(ColorList)])
                .then(([categories, sizes, colors]) => {
                    setCategoryList(categories.data.category);
                    setSizeList(sizes.data.size);
                    setColorList(colors.data.color);
                })
                .catch((error) => console.log(error));
        } 
        callAPI();
    }, []);


// Get category
    const getCategory = (event) => {
        setCategory(event.target.value);
    };

// Get description
    const getDescription = (desc) => {
        setDescription(desc);
    };

//  Get images
    const getImages = (images) => {
        let imageData = [];

        images.map(img => imageData.push( {
            urlImage : img,
            product: {}
        }))

        setImages(imageData);
    };


//  Get size
    const getSize = (event) => {
        setSize(event.target.value);
    };


// Get color
    const getColor = (event) => {
        setColor(event.target.value);
    };
    
    // Handle add new Category
    const btnAddNewCategory = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/category/add", { 
                categoryName: newCategory
            })
            .then(res => {
                setCategoryList(res.data.category);
                setBtnAdd({ ...btnAdd, category: !btnAdd.category });
                toast.success("ADD NEW CATEGORY SUCCESSFULY !", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(err => {})
    }

    // Handle add new Size
    const btnAddNewSize = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/sizes/add", { 
                sizeName: newSize
            })
            .then(res => {
                setSizeList(res.data.size);
                setBtnAdd({ ...btnAdd, size: !btnAdd.size });
                toast.success("ADD NEW SIZE SUCCESSFULY !", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(err => {})
    }

    // Handle add new Color
    const btnAddNewColor = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:8080/colors/add", { 
                colorName: newColor
            })
            .then(res => {
                setColorList(res.data.color);
                setBtnAdd({ ...btnAdd, color: !btnAdd.color });
                toast.success("ADD NEW COLOR SUCCESSFULY !", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(err => {})
    }

    // Handle submit form to add product
    const handleSubmit = e => { 
        e.preventDefault();

        if(!name || !quantity || !brand || !category || !images || !price || !size || !color ) {
            return toast.warning("PLEASE COMPLETE INFORMATION !", {
                position: toast.POSITION.TOP_CENTER
            })
        }

        axios.post("http://localhost:8080/stocks/add_stock_new_product", {
            quantityStock: quantity,
            priceStock: price,
            product:{ 
                productName: name,
                brand: brand,
                description,
                category: {
                    categoryName: category
                },
                productImages: images
            },
            color:{
                colorName: color
            },
            size:{
                sizeName: size
            }
        })
            .then(res => {
                setName("");
                setPrice("");
                setQuantity("");
                setCategory("");
                setSize("");
                setColor("");
                setBrand("");
                setDescription("");
                setImages("");
                toast.success("ADD NEW PRODUCT SUCCESSFULY !", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
            .catch(err => toast.error("ADD NEW PRODUCT FAIL !", {
                position: toast.POSITION.TOP_CENTER
            }))
    }

    const goBack = () => {
		navigate(-1);
	}

    return (
        <Wrapper className={cx('product-add')}>
            <h2>Create Product</h2>
            <form
                onSubmit={e => handleSubmit(e)}
            >

        {/* *********************** PRODUCT NAME ****************************** */}
                <FormInput
                    className={cx('form-control')}
                    classNameIp={cx('form-control-ip')}
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                />
        
        {/* *********************** Quantity ****************************** */}
                <FormInput
                    className={cx('form-control', 'quantity')}
                    classNameIp={cx('form-control-ip')}
                    type="number"
                    label="Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                />
        {/* *********************** Brand ****************************** */}
                <FormInput
                    className={cx('form-control', 'quantity')}
                    classNameIp={cx('form-control-ip')}
                    label="Brand"
                    onChange={(e) => setBrand(e.target.value)}
                />
        {/* *********************** CATEGORY ****************************** */}
                <div className={cx('form-control', 'category')}>
                    <p>Category <span>*</span> </p>
                    <div className={cx('category__container')}>
                        <Select
                            value={category}
                            onChange={getCategory}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            size="small"
                            style={{ width: 200 }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categoryList?.map(category => 
                                <MenuItem 
                                    key={category.categoryName} 
                                    value={category.categoryName}
                                >
                                    {category.categoryName}
                                </MenuItem>) }
                        </Select>

                        <div className={cx('btn-other', btnAdd.category && 'other')}>
                            <Button 
                                content="Add new"
                                onClick={() => setBtnAdd({ ...btnAdd, category: !btnAdd.category})}
                            />
                        </div>
                        <div className={cx('btn-other', 'hidden', btnAdd.category && 'input')}>
                            <FormInput
                                className={cx('form-control')}
                                classNameIp={cx('form-control-ip')}
                                label="Category name"
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <Button 
                                content="Add"
                                onClick={(e) => {
                                    setBtnAdd({ ...btnAdd, category: !btnAdd.category})
                                    btnAddNewCategory(e)
                                }}
                            />
                        </div>
                    </div>
                </div>
    
        {/* *********************** IMAGE ****************************** */}
                <div className={cx('form-control', 'image')}>
                    <p>Image <span>*</span> </p>
                    <ImageUploader images={getImages} />
                </div>

                {/* PRICE */}
                <FormInput
                    className={cx('form-control')}
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

        {/* *********************** DESCRIPTION ****************************** */}
                <div className={cx('form-control', 'editor')}>
                    <p>Description <span>*</span> </p>
                    <Editor content={getDescription} />
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
    );
}

export default ProductAdd;
