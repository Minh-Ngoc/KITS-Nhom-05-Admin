import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { BarIcon, CartIcon, BagIcon, EmojiiIcon } from 'components/ImageList'
import Card from "components/Card";
import ColumnChart from "components/ColumnChart";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.productList);
    const orderStatistics = useSelector(state => state.orders.orderStatistics);

    useEffect(() => {
        dispatch.products.fetchProducts();
        dispatch.orders.statisticOrderByMonth();
    }, [dispatch.products]);

    const cards = products && [
        {
            label: 'Total Visits',
            icon: <BarIcon />,
            color: 'red',
            value: 7.7,
            unit: 'M',
        },
        {
            label: 'Total Sales',
            icon: <CartIcon />,
            color: 'primary',
            value: 777,
            unit: 'k',
        },
        {
            label: 'Total Products',
            icon: <BagIcon />,
            color: 'green',
            value: products.length,
            unit: false,
        },
        {
            label: 'Total Customers',
            icon: <EmojiiIcon />,
            color: 'gray',
            value: 7.7,
            unit: 'k',
        },
    ];

    const cardList = cards.map((card, index) => (
        <Card 
            key={index}
            label={card.label}
            icon={card.icon}
            value={card.value}
            unit={card.unit}
            color={card.color}
        />
    ));

    const data = orderStatistics && orderStatistics.map(order => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return {
            name: month[order.month - 1],
            total: order.totalpricemonth,
            quantity: order.numberorder,
        }   
    }) 

    const totalRevenue = () => {
        let sum = 0;
        orderStatistics && orderStatistics.map(order => {
            sum += order.totalpricemonth;
        })
        return sum;
    }

    return ( 
        <Wrapper className={cx('home')}>
            <div className={cx('cards')}>
                { cardList }
            </div>
            
            <ColumnChart db={data} totalRevenue={totalRevenue()} />
        </Wrapper>
    );
}

export default Home;