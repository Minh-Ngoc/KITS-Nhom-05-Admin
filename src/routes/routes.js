import DefaultLayout from 'layouts/DefaultLayout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductAdd from '../pages/Products/ProductAdd';
import Login from '../pages/Login';
import Orders from '../pages/Orders';
import User from '../pages/User';

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/products', component: Products, layout: DefaultLayout },
    { path: '/products/add', component: ProductAdd, layout: DefaultLayout },
    { path: '/login', component: Login, layout: null },
    { path: '/main', component: Home, layout: DefaultLayout },
    { path: '/user', component: User, layout: DefaultLayout },
    { path: '/orders', component: Orders, layout: DefaultLayout },

];

export { publicRoutes };