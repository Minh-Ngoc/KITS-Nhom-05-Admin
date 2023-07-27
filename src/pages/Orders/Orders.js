import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './Orders.module.scss'
import Card from "components/Card";
import PieeChart from "components/PieeChart";
import Table from "components/Table";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Eye, Money } from 'components/ImageList';
import { useState } from 'react';
import Modal from "components/Modal";

const cx = classNames.bind(styles);

function Orders() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const [selectedProduct, setSelectedOrder] = useState({ modal: false, order: '' });

    useEffect(() => {
        dispatch.orders.statisticOrderByMonth();
        dispatch.orders.fetchOrders();
    }, [dispatch.orders])

    const totalRevenue = () => {
        let sum = 0;
        orders && orders.orderStatistics?.map(order => {
            sum += order.totalpricemonth;
        })
        return sum;
    }

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const card = {
        label: 'Total Products',
        icon: <Money />,
        color: 'red',
        value: USDollar.format(totalRevenue()),
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
    const handleOpenModal = (order) => {
        setSelectedOrder({ modal: !selectedProduct.modal, order });
        dispatch.orders.getOrderById(order.orderid)
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
            id: 'date',
            numeric: 'center',
            disablePadding: true,
            label: 'Date',
        },
        {
            id: 'status',
            numeric: 'center',
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'total',
            numeric: 'center',
            disablePadding: false,
            label: 'Total',
        },
        {
            id: 'detail',
            numeric: 'center',
            disablePadding: false,
            label: 'Detail',
        },
    ];

    // Create keys data
    function createData(id, date, status, total, detail) {
        return {
            id,
            date,
            status,
            total,
            detail
        };
    }
    // Create values data
    const rows = orders.orderList?.map(order => 
        createData(order.orderid, order.DateOrder, order.status, order.totalprice, <Eye onClick={() => handleOpenModal(order)}/>)
    );

    //* *************************  ORDER DETAIL ****************************************** *//

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
    ];
    // Create keys data
    function createDataDetail(id, productName, color, size, quantity, price) {
        return {
            id,
            productName, 
            color, 
            size, 
            quantity, 
            price,
        };
    }
    // Create values data
    const rowsPdDetail = orders.order?.map(order => {
        return createDataDetail(order.orderDetailId, order.productName, order.colorName, order.sizeName, order.quantityOrder, order.unitPrice)
    });

    // Title modal add order detail
    const TitleOrderModal = (
        <h3 style={{ fontFamily: "'Oswald', sans-serif" }}>Order Detail</h3>
    );

    const TableOrderDetail = (
        <Table 
            key={2}
            headCells={headCellsPdDetail}
            rows={rowsPdDetail}
        />
    )

    if(!orders) {
        return <div>Loading...</div>
    }

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
                <h3>Orders</h3>
                <div className='orders__table'>
                    <Table 
                        key={1}
                        headCells={headCells}
                        rows={rows}
                    />
                </div>
            </div>
            <Modal title={TitleOrderModal} content={TableOrderDetail} selectedProduct={selectedProduct} />
        </Wrapper>
    )
}

export default Orders;