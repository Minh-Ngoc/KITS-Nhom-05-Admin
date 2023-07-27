import Wrapper from "components/Wrapper";
import classNames from 'classnames/bind';
import styles from './User.module.scss'
import { useSelector, useDispatch } from "react-redux";
import Table from "components/Table";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const User = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.userList);

    useEffect(() => {
        dispatch.users.fetchUsers();
    }, [dispatch.user])

    // Create head cell
    const headCells = [
        {
            id: 'id',
            numeric: 'center',
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'username',
            numeric: 'center',
            disablePadding: true,
            label: 'Username',
        },
        {
            id: 'firstName',
            numeric: 'center',
            disablePadding: false,
            label: 'First Name',
        },
        {
            id: 'lastName',
            numeric: 'center',
            disablePadding: false,
            label: 'Last Name',
        },
        {
            id: 'email',
            numeric: 'center',
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'phone',
            numeric: 'center',
            disablePadding: false,
            label: 'Phone',
        },
        {
            id: 'role',
            numeric: 'center',
            disablePadding: false,
            label: 'Role',
        },
    ];

    // Create keys data
    function createData(id, username, firstName, lastName, email, phone, role) {
        return {
            id,
            username,
            firstName,
            lastName,
            email,
            phone,
            role
        };
    }
    // Create values data
    const rows = users?.map(user => 
        createData(user.userId, user.username, user.firstName, user.lastName, user.email, user.phone, user.role)
    );


    return (
        <Wrapper className={cx('users')}>
            <h3>User List</h3>
            <div className='orders__table'>
                <Table 
                    key={1}
                    headCells={headCells}
                    rows={rows}
                />
            </div>
        </Wrapper>
    )
}

export default User;