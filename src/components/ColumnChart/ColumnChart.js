import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './ColumnChart.module.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import Button from "components/Button";
import { ArrowBottomIcon } from "components/ImageList";

const cx = classNames.bind(styles);

function ColumnChart({ db, totalRevenue }) {
    const [data, setData] = useState([]); 

    useEffect(() => {
        setData(db);
    }, [db]);

    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Wrapper className={cx('column-chart')}>
            <div className={cx('total-revenue')}>
                <div className={cx('total-revenue__content')}>
                    <h3>Total Revenue</h3>
                    <h2> {USDollar.format(totalRevenue)} </h2>
                </div>
                <div className={cx('total-revenue__filter')}>
                    <Button 
                        content="This year"
                        srcRight={<ArrowBottomIcon />}
                    />
                </div>
            </div>
            <ResponsiveContainer width="99%" aspect={3}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barGap={0}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="name" 
                        fontSize={20}
                        fontWeight={500}
                        color='#A7A7A7'
                        height={50}
                    />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar barSize={30} dataKey="total" radius={[20, 20, 0, 0]} fill="#94A3B8" background={{ fill: '#eee' }} />
                    <Bar barSize={30} dataKey="quantity" radius={[20, 20, 0, 0]} fill="#EB5757" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </Wrapper>
    )
}

export default ColumnChart;