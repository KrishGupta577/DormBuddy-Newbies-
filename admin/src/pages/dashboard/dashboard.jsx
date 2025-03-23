import React, { useContext, useEffect, useState } from 'react';
// import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
// import {
//     Home,
//     ArrowRightLeft,
//     FileText,
//     Settings,
//     LogOut,
//     BellIcon,
//     User,
//     ChevronRight,
//     ChevronLeft
// } from 'lucide-react';
import './Dashboard.css';
// import UsersList from '../../Components/UsersList/UsersList';
// import LogoutPage from '../../Components/LogoutPage/Logout';
// import SettingPage from '../../Components/SettingPage/SettingPage';
// import { StoreContext } from '../../Context/StoreContext';
// import OverviewPage from '../../Components/OverviewPage/OverviewPage';
// import TransactionsPage from '../../Components/TransactionsPage/RoomsPage';

const Dashboard = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const { usersList, transactionsList, adminInfo, token } = useContext(StoreContext);

    useEffect(() => {
        // Add dependency array to avoid unnecessary calls
        usersList(token);
        transactionsList(token);
    }, [usersList, transactionsList, token]);

    const sidebarMenus = [
        { name: 'Overview', path: '/admin/dashboard', icon: <Home className="menu-icon" /> },
        { name: 'Rooms', path: '/admin/dashboard/Rooms', icon: <ArrowRightLeft className="menu-icon" /> },
        { name: 'Users', path: '/admin/dashboard/users', icon: <User className="menu-icon" /> },
        { name: 'Settings', path: '/admin/dashboard/settings', icon: <Settings className="menu-icon" /> },
        { name: 'Logout', path: '/admin/dashboard/logout', icon: <LogOut className="menu-icon" /> }
    ];

    // Improved pathname handling for empty strings
    const pathname = location.pathname.split('/').pop() || 'dashboard';
    const currentPage = pathname === 'dashboard' ? 'Overview' : pathname.charAt(0).toUpperCase() + pathname.slice(1);

    useEffect(() => {
        document.title = `DormBuddy - ${currentPage}`;
    }, [currentPage]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="app-container">
            {/* Sidebar with toggle functionality */}
            <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <h1>DormBuddy</h1>
                    {/* <button className="toggle-sidebar" onClick={toggleSidebar}>
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button> */}
                </div>
                <nav className="sidebar-nav">
                    {sidebarMenus.map((menu) => (
                        <NavLink
                            key={menu.name}
                            to={menu.path}
                            className={({ isActive }) =>
                                `menu-item ${isActive ? 'active' : ''}`
                            }
                            end={menu.path === '/admin/dashboard'}
                            title={menu.name}
                        >
                            {menu.icon}
                            <span>{menu.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <h2 className="header-title">{currentPage}</h2>
                    </div>
                    <div className="header-right">
                        <button className="notification-btn" aria-label="Notifications">
                            <BellIcon size={20} />
                            <span className="notification-indicator"></span>
                        </button>
                        <div className="profile-info">
                            <img
                                src='/profile_photo.png'
                                alt="Profile"
                                className="profile-image"
                                referrerPolicy="no-referrer"
                            />
                            <div>
                                <h3 className="profile-name">{adminInfo?.name || 'Admin User'}</h3>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Routes */}
                <div className="content">
                    <Routes>
                        <Route index element={<OverviewPage />} />
                        <Route path="transactions" element={<TransactionsPage />} />
                        <Route path="logout" element={<LogoutPage />} />
                        <Route path="settings" element={<SettingPage />} />
                        <Route path="users" element={<UsersList />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;