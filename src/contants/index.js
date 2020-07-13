import AdminHomePage from "../pages/AdminHomePage";
import TaskBoard from '../pages/TaskBoard';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
export const STATUSES = [
    {
        value: 0,
        label: "READY",
    },
    {
        value: 1,
        label: "IN PROGRESS",
    },
    {
        value: 2,
        label: "FINISH",
    },
];

export const FIELDS_OF_TASK = [
    { label: 'Title', type: 'input', name: 'title', value: '' },
    { label: 'Desciption', type: 'input', name: 'description', value: '' },
    { label: 'Status', type: 'select', name: 'status', value: STATUSES[0].value, options: STATUSES },
]

export const FIELDS_OF_LOGIN = [
    { label: 'Email', type: 'input', name: 'email', value: '' },
    { label: 'Password', type: 'password', name: 'password', value: '' },
]

export const FIELDS_OF_REGISTER = [
    { label: 'Name', type: 'input', name: 'name', value: '' },
    { label: 'Email', type: 'input', name: 'email', value: '' },
    { label: 'Password', type: 'password', name: 'password', value: '' },
]

export const ADMIN_ROUTES = [
    {
        path: '/',
        name: 'Trang quản trị',
        exact: true,
        component: AdminHomePage,
    },
    {
        path: '/task-board',
        name: 'Quản lý công việc',
        component: TaskBoard,
    },
]

export const ROUTES = [
    {
        path: '/login',
        name: 'Đăng nhập',
        exact: true,
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'Đăng nhập',
        exact: true,
        component: RegisterPage,
    },
]