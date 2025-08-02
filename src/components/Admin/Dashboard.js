import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  ChefHat
} from 'lucide-react';

const AdminDashboard = () => {
  // Mock data
  const orderData = [
    { time: '9AM', orders: 12 },
    { time: '10AM', orders: 18 },
    { time: '11AM', orders: 25 },
    { time: '12PM', orders: 45 },
    { time: '1PM', orders: 38 },
    { time: '2PM', orders: 22 },
    { time: '3PM', orders: 15 },
    { time: '4PM', orders: 28 },
  ];

  const topItems = [
    { name: 'Butter Chicken', sales: 45, revenue: 2250 },
    { name: 'Biryani', sales: 38, revenue: 1900 },
    { name: 'Paneer Tikka', sales: 32, revenue: 1280 },
    { name: 'Naan', sales: 28, revenue: 280 },
  ];

  const tableStatus = [
    { table: 'Table 1', status: 'occupied', orders: 2 },
    { table: 'Table 2', status: 'free', orders: 0 },
    { table: 'Table 3', status: 'occupied', orders: 1 },
    { table: 'Table 4', status: 'free', orders: 0 },
    { table: 'Table 5', status: 'occupied', orders: 3 },
  ];

  const stats = [
    {
      title: 'Today\'s Orders',
      value: '156',
      change: '+12%',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Revenue Today',
      value: '₹12,450',
      change: '+8%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Active Tables',
      value: '3/5',
      change: '60%',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Kitchen Orders',
      value: '8',
      change: 'In Progress',
      icon: ChefHat,
      color: 'bg-orange-500',
    },
  ];

  const orderStatus = [
    { status: 'Received', count: 5, color: '#3B82F6' },
    { status: 'In Progress', count: 3, color: '#F59E0B' },
    { status: 'Ready', count: 2, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <ChefHat className="w-4 h-4" />
          <span>View Kitchen Status</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from yesterday</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders Today</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {orderStatus.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: status.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{status.status}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Items and Table Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Selling Items</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.sales} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{item.revenue}</p>
                    <p className="text-xs text-green-600">+{Math.floor(Math.random() * 20) + 5}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table Status */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Table Status</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {tableStatus.map((table, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    table.status === 'occupied' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{table.table}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      table.status === 'occupied' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {table.status === 'occupied' ? 'Occupied' : 'Free'}
                    </span>
                  </div>
                  {table.orders > 0 && (
                    <p className="text-xs text-gray-500 mt-1">{table.orders} active orders</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 