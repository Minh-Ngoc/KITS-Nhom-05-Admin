import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './PieeChart.module.scss';
import { useEffect, useState } from "react";

import { PieChart, Pie, Cell } from 'recharts';

const cx = classNames.bind(styles);
function PieeChart({ className, db }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(db);
    }, [db]);

    const COLORS = ['#EF4444', '#22C55E', '#0EA5E9', '#7DD3FC', '#FCA5A5'];
    
    return (
        <Wrapper className={cx('pie-chart', className)}>
            <PieChart width={150} height={100}>
                <Pie
                    data={data}
                    cx="70%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    fill="#8884d8"
                    dataKey="percent"
                    >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </Wrapper>
    )
}

export default PieeChart;