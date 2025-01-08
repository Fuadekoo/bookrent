import Link from 'next/link';

const LiveBookStatus = () => {
  return (
    <div className="live-book-status p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Live Book Status</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Book no.</th>
            <th className="py-2 px-4 border-b">Owner</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">01</td>
            <td className="py-2 px-4 border-b">6465</td>
            <td className="py-2 px-4 border-b flex items-center">
              <img src="/path/to/avatar1.jpg" alt="Nardos T" className="w-6 h-6 rounded-full mr-2" />
              Nardos T
            </td>
            <td className="py-2 px-4 border-b flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Rented
            </td>
            <td className="py-2 px-4 border-b">40 Birr</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">02</td>
            <td className="py-2 px-4 border-b">5665</td>
            <td className="py-2 px-4 border-b flex items-center">
              <img src="/path/to/avatar2.jpg" alt="Harry M" className="w-6 h-6 rounded-full mr-2" />
              Harry M
            </td>
            <td className="py-2 px-4 border-b flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Free
            </td>
            <td className="py-2 px-4 border-b">0.0 Birr</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">03</td>
            <td className="py-2 px-4 border-b">1755</td>
            <td className="py-2 px-4 border-b flex items-center">
              <img src="/path/to/avatar3.jpg" alt="Tesfu N" className="w-6 h-6 rounded-full mr-2" />
              Tesfu N
            </td>
            <td className="py-2 px-4 border-b flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Free
            </td>
            <td className="py-2 px-4 border-b">0.0 Birr</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LiveBookStatus;
