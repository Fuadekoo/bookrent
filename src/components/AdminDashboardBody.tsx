import Statistics from './Statistics';
import LiveBookStatus from './LiveBookStatus';
import EarningSummary from './EarningSummary';
import AvailableBooksChart from './AvailableBooksChart';

const AdminDashboardBody = () => {
  return (
    <div className="admin-dashboard-body">
      <Statistics />
      <AvailableBooksChart />
      <LiveBookStatus />
      <EarningSummary />
    </div>
  );
};

export default AdminDashboardBody;
