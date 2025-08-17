import { useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>Shramasetu - HRMS Dashboard</title>
        <meta name="description" content="Human Resource Management System" />
      </Head>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <h1 className="text-2xl font-bold">Shramasetu</h1>
          ) : (
            <h1 className="text-2xl font-bold">SS</h1>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-lg hover:bg-indigo-700">
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>
        
        <nav className="mt-8">
          <NavItem icon="🏠" label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} sidebarOpen={sidebarOpen} />
          <NavItem icon="👥" label="Employees" active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} sidebarOpen={sidebarOpen} />
          <NavItem icon="⏱️" label="Attendance" active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} sidebarOpen={sidebarOpen} />
          <NavItem icon="📅" label="Leave" active={activeTab === 'leave'} onClick={() => setActiveTab('leave')} sidebarOpen={sidebarOpen} />
          <NavItem icon="💰" label="Payroll" active={activeTab === 'payroll'} onClick={() => setActiveTab('payroll')} sidebarOpen={sidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <span className="text-gray-600">🔔</span>
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                AS
              </div>
              {sidebarOpen && <span className="ml-2 text-sm">Admin</span>}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'employees' && <EmployeesContent />}
          {activeTab === 'attendance' && <AttendanceContent />}
          {activeTab === 'leave' && <LeaveContent />}
          {activeTab === 'payroll' && <PayrollContent />}
        </main>
      </div>
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick, sidebarOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 ${active ? 'bg-indigo-700' : 'hover:bg-indigo-700'} transition-colors duration-200`}
    >
      <span className="text-xl">{icon}</span>
      {sidebarOpen && <span className="ml-3">{label}</span>}
    </button>
  );
};

const DashboardContent = () => {
  const stats = [
    { title: 'Total Employees', value: '142', change: '+5%', icon: '👥' },
    { title: 'Present Today', value: '128', change: '+2%', icon: '✅' },
    { title: 'On Leave', value: '14', change: '-1%', icon: '🏖️' },
    { title: 'New Hires', value: '8', change: '+3%', icon: '🆕' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-6">Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-medium mb-4">Recent Activities</h4>
          <div className="space-y-4">
            {['John Doe joined the company', 'Jane Smith applied for leave', 'Payroll processed for March'].map((activity, i) => (
              <div key={i} className="flex items-start">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p>{activity}</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-medium mb-4">Upcoming Birthdays</h4>
          <div className="space-y-3">
            {['Michael Scott - Apr 15', 'Pam Beesly - Apr 16', 'Jim Halpert - Apr 20'].map((bday, i) => (
              <div key={i} className="flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">🎂</div>
                <p>{bday}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeesContent = () => {
  const employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT', status: 'Active' },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'HR', status: 'Active' },
    { id: 3, name: 'Mike Johnson', position: 'Sales Executive', department: 'Sales', status: 'On Leave' },
    { id: 4, name: 'Sarah Williams', position: 'Accountant', department: 'Finance', status: 'Active' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Employee Management</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AttendanceContent = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-6">Attendance Tracking</h3>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p>Attendance records and analytics will be displayed here.</p>
      </div>
    </div>
  );
};

const LeaveContent = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-6">Leave Management</h3>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p>Leave applications and approvals will be managed here.</p>
      </div>
    </div>
  );
};

const PayrollContent = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-6">Payroll Management</h3>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p>Salary processing and payroll reports will be available here.</p>
      </div>
    </div>
  );
};