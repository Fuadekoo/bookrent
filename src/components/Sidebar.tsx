"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaTachometerAlt, FaBook, FaUser, FaBell, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const adminMenu = [
    { name: 'Dashboard', path: '/admin/adminDashboard', icon: <FaTachometerAlt /> },
    { name: 'Books', path: '/admin/books', icon: <FaBook /> },
    { name: 'Owners', path: '/admin/owners', icon: <FaUser /> },
    { name: 'Notification', path: '/notification', icon: <FaBell /> },
    { name: 'Setting', path: '/setting', icon: <FaCog /> },
  ];

  const ownerMenu = [
    { name: 'Dashboard', path: '/owner/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Books Upload', path: '/owner/bookUpload', icon: <FaBook /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
    { name: 'Notification', path: '/notification', icon: <FaBell /> },
    { name: 'Setting', path: '/setting', icon: <FaCog /> },
  ];

  const menuToBeRendered = userRole === 'admin' ? adminMenu : ownerMenu;

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`sidebar bg-blue-950 text-white h-full flex flex-col justify-between rounded-lg p-6 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
          <button onClick={toggleCollapse} className="text-white p-2">
            <FaBars />
          </button>
            <img src="/book2.png" alt="Books" className="w-9 h-9 mr-2" />
            {!isCollapsed && <h1 className="text-xl text-cyan-500 font-light text-c">Book Rent</h1>}
          </div>
         
        </div>

        <hr />
        <br />

        <nav>
          <ul className="space-y-2">
            {menuToBeRendered.map((item, index) => (
              <li key={index} className={`p-2 hover:bg-cyan-700 flex items-center ${router.pathname === item.path ? 'bg-cyan-500' : ''} rounded-lg`}>
                {item.icon}
                {!isCollapsed && (
                  <Link href={item.path} className="ml-2">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button onClick={handleLogout} className="logout p-4 bg-slate-700 hover:bg-red-700 flex items-center rounded-lg">
        <FaSignOutAlt className="mr-2" />
        {!isCollapsed && 'Logout'}
      </button>
    </div>
  );
};

export default Sidebar;