import Link from 'next/link';
import { FaTachometerAlt, FaBook, FaUser, FaBell, FaCog, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar bg-blue-950 text-white h-full flex flex-col justify-between rounded-lg p-6">
      <div>
        <div className="flex items-center justify-center mb-6">
          <img src="/book2.png" alt="Books" className="w-9 h-9 mr-2" />
          <h1 className="text-xl text-cyan-500 font-light text-c">Book Rent</h1>
        </div>

        <hr></hr>
            <br>
            </br>
        <nav>
          <ul className="space-y-2">
            <li className="p-2 hover:bg-cyan-700 flex items-center active:bg-cyan-500 rounded-lg">
              <FaTachometerAlt className="mr-2" />
              <Link href="/admin/adminDashboard">Dashboard</Link>
            </li>
            <li className="p-2 hover:bg-cyan-700 flex items-center">
              <FaBook className="mr-2" />
              <Link href="/books">Books</Link>
            </li>
            <li className="p-2 hover:bg-cyan-700 flex items-center">
              <FaUser className="mr-2" />
              <Link href="/owners">Owners</Link>
            </li>
            <li className="p-2 hover:bg-cyan-700 flex items-center">
              <FaUser className="mr-2" />
              <Link href="/other">Other</Link>
            </li>

            <hr></hr>
            <br>
            </br>
            <li className="p-2 hover:bg-cyan-700flex items-center">
              <FaBell className="mr-2" />
              <Link href="/notification">Notification</Link>
            </li>
            <li className="p-2 hover:bg-cyan-700 flex items-center">
              <FaCog className="mr-2" />
              <Link href="/setting">Setting</Link>
            </li>
            <li className="p-2 hover:bg-cyan-700 flex items-center">
              <FaSignInAlt className="mr-2" />
              <Link href="/login">Login as Book Owner</Link>
            </li>
          </ul>
        </nav>

        
      </div>
      <button className="logout p-4 bg-slate-700 hover:bg-red-700 flex items-center rounded-lg">
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;