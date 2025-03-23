import React, { useContext, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
    Home,
    ArrowRightLeft,
    LineChart as ChartIcon,
    Wallet,
    FileText,
    Smartphone,
    Settings,
    LogOut,
    Bell as BellIcon,
} from 'lucide-react';
import './Dashboard.css';
import { StoreContext } from '../../context/StoreContext';
import Tasks from '../../components/AfterLogin/Tasks/Tasks';
import Expense from '../../components/AfterLogin/Expense/Expense';
import Maintanence from '../../components/AfterLogin/Maintanence/Maintanence';
import Setting from '../../components/AfterLogin/Setting/Setting';
import Overview from '../../components/AfterLogin/Overview/Overview';

const Dashboard = () => {
    const { userInfo } = useContext(StoreContext);
    const location = useLocation();

    const sidebarMenus = [
        { name: 'Overview', path: '/dashboard', icon: <Home className="dashboard-menu-icon" /> },
        { name: 'Tasks', path: '/dashboard/tasks', icon: <ArrowRightLeft className="dashboard-menu-icon" /> },
        { name: 'Expenses', path: '/dashboard/expense', icon: <ChartIcon className="dashboard-menu-icon" /> },
        { name: 'Maintenance', path: '/dashboard/maintanence', icon: <FileText className="dashboard-menu-icon" /> },
        { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="dashboard-menu-icon" /> },
    ];

    const pathname = location.pathname.split('/').pop();
    const currentPage = pathname === 'dashboard' ? 'Overview' : pathname.charAt(0).toUpperCase() + pathname.slice(1);

    useEffect(() => {
        document.title = `DormBuddy - ${currentPage}`;
    }, [pathname]);

    return (
        <div className="dashboard-app-container">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
                <div className="dashboard-sidebar-header">
                    <img src='/logo.svg' alt='logo' />
                    <h1>DormBuddy</h1>
                </div>
                <nav className="dashboard-sidebar-nav">
                    {sidebarMenus.map((menu) => (
                        <NavLink
                            key={menu.name}
                            to={menu.path}
                            className={({ isActive }) =>
                                `dashboard-menu-item ${isActive ? 'active' : ''}`
                            }
                            end={menu.path === '/dashboard'} // Add end prop for exact matching on overview
                        >
                            {menu.icon}
                            <span>{menu.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="dashboard-main-content">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="dashboard-header-left">
                        <h2 className="dashboard-header-title">{currentPage}</h2>
                    </div>
                    <div className="dashboard-header-right">
                        <button className="dashboard-notification-btn">
                            <BellIcon />
                            <span className="dashboard-notification-indicator"></span>
                        </button>
                        <div className="dashboard-profile-info">
                            <img
                                src='/profile_photo.png'
                                alt="Profile"
                                className="dashboard-profile-image"
                                referrerPolicy="no-referrer"
                            />
                            <div>
                                <h3 className="dashboard-profile-name">{userInfo?.name || ''}</h3>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content area for routes */}
                <div className="dashboard-content">
                    <Routes>
                        <Route index element={<Overview />} />
                        <Route path="tasks" element={<Tasks />} />
                        <Route path="expense" element={<Expense />} />
                        <Route path="maintanence" element={<Maintanence />} />
                        <Route path="settings" element={<Setting />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;