import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import EarningSummary from '../../../components/EarningSummary';
import LiveBookStatus from '../../../components/LiveBookStatus';
import AvailableBooksChart from '../../../components/AvailableBooksChart';
import Statistics from '../../../components/Statistics';
import DefaultLayout from '../../../components/DefaultLayout';

const AdminDashboard = () => {
  return (
    <DefaultLayout>
 <div className="flex h-screen p-4">
      {/* Left Side */}
      <div className="w-1/3 flex flex-col space-y-4 m-2">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <Statistics />
        </div>
        <div className="bg-white p-4 rounded shadow flex-1">
          <h2 className="text-xl font-bold mb-4">Available Books Chart</h2>
          <AvailableBooksChart />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-2/3 flex flex-col space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Live Book Status</h2>
          <LiveBookStatus />
        </div>
        <div className="bg-white p-4 rounded shadow flex-1">
          <h2 className="text-xl font-bold mb-4">Earning Summary</h2>
          <EarningSummary />
        </div>
      </div>
    </div>
      </DefaultLayout>
  );
};

export default AdminDashboard;
