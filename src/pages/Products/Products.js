import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { BagIcon, SearchIcon, Eye } from 'components/ImageList'
import Card from "components/Card";
import PieeChart from "components/PieeChart";
import Input from "components/Input";
import Button from "components/Button";
import Table from 'components/Table';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import Modal from "components/Modal";
import ProductDetailAdd from "./ProductDetailAdd";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const cx = classNames.bind(styles);

function Products() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.productList);
    const stock = useSelector(state => state.stock.stockList);

    const [formAddProdDetail, setFormAddProdDetail] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState({ modal: false, product: '' });

    useEffect(() => {
        dispatch.products.fetchProducts();
    }, [dispatch.products])

    // Handle search
    const handleSearchProduct = useCallback((e) => {
        const { value } = e.target;
        dispatch.products.filterProductByName(value);
    }, [dispatch.products]);

    // Value card
    const card = {
        label: 'Total Products',
        icon: <BagIcon />,
        color: 'red',
        value: products?.length,
        unit: false,
    };

    // data pieChart
    const dataPieChart = [
        { label: 'Digital', percent: 42, color: '#EF4444' },
        { label: 'Dress', percent: 21, color: '#22C55E' },
        { label: 'Hoodie', percent: 15, color: '#0EA5E9' },
        { label: 'Hat', percent: 12, color:'#7DD3FC' },
        { label: 'Accesories', percent: 10, color:'#FCA5A5'},
    ];
    
    // content chart
    const chart = (
        <>
            <div className={cx('tooltip')}>
                { dataPieChart.map((category, index) => (
                    <div className={cx('tooltip__item')} key={index}>
                        <div style={{backgroundColor: category.color}} className={cx('tooltip__item-color')}></div>
                        <span className={cx('tooltip__item-label')}> {category.label} ({category.percent}%)</span>
                    </div> 
                )) }   
            </div>
            <PieeChart className={cx('pie-chart')} db={dataPieChart} />
        </>
    )

    //Handle open/close modal
    const handleOpenModal = (product) => {
        setSelectedProduct({ modal: !selectedProduct.modal, product });
        dispatch.stock.fetchStockByIdProduct(product.productId);
    }

    // Create head cell
    const headCells = [
        {
            id: 'id',
            numeric: 'center',
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'name',
            numeric: 'center',
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'image',
            numeric: 'center',
            disablePadding: true,
            label: 'Image',
        },
        {
            id: 'brand',
            numeric: 'center',
            disablePadding: false,
            label: 'Brand',
        },
        {
            id: 'category',
            numeric: 'center',
            disablePadding: false,
            label: 'Category',
        },
        {
            id: 'detail',
            numeric: 'center',
            disablePadding: false,
        },
        {
            id: 'action',
            numeric: 'center',
            disablePadding: false,
            label: 'Action',
        },
    ];

    // Create keys data
    function createData(id, name, image, brand, category, detail) {
        return {
            id,
            name,
            image,
            brand,
            category,
            detail
        };
    }

    const ImageProduct = (src) => (
        <Stack direction="row" spacing={2} justifyContent="center">
            <Avatar alt="" src={src} />
        </Stack>
    )
    // Create values data
    const rows = products?.map(pd => 
        createData(pd.productId, pd.productName, ImageProduct(pd.image) , pd.brand, pd.category, <Eye onClick={() => handleOpenModal(pd)}/>)
    );

    // Handle edit product
    const handleEdit = (id) => {
        console.log(id)
    }

    // Handle delete product
    const handleDelete = useCallback((id) => {
        dispatch.products.deleteProduct(id);
    }, [dispatch.products])

    // Handle selectedAll product
    const handleSelectedAll = (arr) => {
        console.log(arr)
    }
    //* *************************  PRODUCT DETAIL ****************************************** *//
    // Title modal content product detail
    const headCellsPdDetail = [
        {
            id: 'id',
            numeric: 'center',
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'name',
            numeric: 'center',
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'quantity',
            numeric: 'center',
            disablePadding: false,
            label: 'Quantity',
        },
        {
            id: 'price',
            numeric: 'center',
            disablePadding: false,
            label: 'Price',
        },
        {
            id: 'size',
            numeric: 'center',
            disablePadding: false,
            label: 'Size',
        },
        {
            id: 'color',
            numeric: 'center',
            disablePadding: false,
            label: 'Color',
        },
        {
            id: 'action',
            numeric: 'center',
            disablePadding: false,
            label: 'Action',
        },
    ];

    // Create keys data
    function createDataDetail(id, name, quantity, price, size, color) {
        return {
            id,
            name, 
            quantity, 
            price,
            size, 
            color, 
        };
    }
    // Create values data
    const rowsPdDetail = stock?.map(stock => {
        return createDataDetail(stock.stockId, stock.productName, stock.quantityStock, stock.priceStock, stock.sizeId, stock.colorId)
    });

    // Title modal add product detail
    const TitleProductModal = (
        <div className="modal-title-detail">
            <h3>Product Detail</h3>
            <Button 
                className='modal-btn-add'
                content="Add Product Detail" 
                onClick={() => setFormAddProdDetail(true)}
            />
        </div>
    );

    const handleFormAddProdDetail = (e) => setFormAddProdDetail(e);
     // Handle edit product
     const handleEditDetail = (id) => {
        console.log(id)
    }

    // Handle delete product
    const handleDeleteDetail = useCallback((id) => {
        dispatch.stock.deleteStock(id)
    }, [dispatch.stock]);

    // Handle selectedAll product
    const handleSelectedAllDetail = (arr) => {
        console.log(arr)
    }
    const TablePdDetail = formAddProdDetail ? (
        <ProductDetailAdd formAddProdDetail={handleFormAddProdDetail} productId={stock[0].productId}/> ) : (
        <Table 
            key={2}
            headCells={headCellsPdDetail}
            rows={rowsPdDetail}
            deleteById={handleDeleteDetail} 
            EditById={handleEditDetail} 
            selectedAll={handleSelectedAllDetail}
            action
        />
    )

    return (
        <Wrapper className={cx('products')}>
            <div className={cx('statistics')}>
                <Card 
                    className={cx('card')}
                    label={card.label}
                    icon={card.icon}
                    color={card.color}
                    value={card.value}
                    unit={card.unit}
                />
                <Card 
                    label="Product Category Ratio"
                    selector={<p>(235 total)</p>}
                    contentCenter={chart}
                />
            </div>
            <div className={cx('content')}>
                <h3>Products</h3>
                <div className={cx('content__btn')}>
                    <Input 
                        className={cx('content__btn-search')} 
                        label="Press / to search" 
                        icon={<SearchIcon />} 
                        onChange={e => handleSearchProduct(e)}
                    />
                    <Button 
                        className={cx('content__btn-add')} 
                        content="Create Product" 
                        comp="link"
                        to="/products/add"
                    />
                </div>
                <div className={cx('content__table')}>
                    <Table 
                        key={1}
                        headCells={headCells}
                        rows={rows}
                        deleteById={handleDelete} 
                        EditById={handleEdit} 
                        selectedAll={handleSelectedAll}
                        action
                    />
                </div>
            </div>
            <Modal title={TitleProductModal} content={TablePdDetail} selectedProduct={selectedProduct} />
        </Wrapper>
    )
}

export default Products;