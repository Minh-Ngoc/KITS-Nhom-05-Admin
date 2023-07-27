export const DOMAIN = "http://localhost:8080";

export const LOGIN_USER = `${DOMAIN}/api/login`;

export const GET_PRODUCT = `${DOMAIN}/products/getAllProductInfo`;
export const ADD_PRODUCT = `${DOMAIN}/stocks/add_stock_new_product`;
export const DELETE_PRODUCT = `${DOMAIN}/products/delete`;
export const FILTER_PRODUCT_BY_NAME = `${DOMAIN}/products/findproductbyname`;

export const ADD_STOCK = `${DOMAIN}/stocks/add`;
export const GET_STOCK_BY_ID_PRODUCT = `${DOMAIN}/stocks/getstock`;
export const DELETE_STOCK = `${DOMAIN}/stocks/delete`;

export const GET_USER_ALL = `${DOMAIN}/api/user/users/list`;
export const GET_ORDERS = `${DOMAIN}/api/user/orders/getorderswithusername`;
export const GET_ORDER_BY_ID = `${DOMAIN}/api/user/orders/getorderdetailfromorder`;
export const STATISTIC_ORDER_BY_MONTH = `${DOMAIN}/api/user/orders/statisticorderbymonth`;

export const ADD_CATEGORY = `${DOMAIN}/category/add`;
export const GET_CATEGORY = `${DOMAIN}/category/getallcategory`;

export const ADD_SIZE = `${DOMAIN}/sizes/add`;
export const GET_SIZE = `${DOMAIN}/sizes/getallsize`;

export const ADD_COLOR = `${DOMAIN}/colors/add`;
export const GET_COLOR = `${DOMAIN}/colors/getallcolor`;
