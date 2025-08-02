import React from 'react';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart
} from 'lucide-react';

const Reports = () => {
  // Mock data
  const salesData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 135 },
    { month: 'Mar', sales: 48000, orders: 128 },
    { month: 'Apr', sales: 61000, orders: 160 },
    { month: 'May', sales: 55000, orders: 145 },
    { month: 'Jun', sales: 68000, orders: 180 },
  ];

  const categoryData = [
    { name: 'Main Course', value: 45, color: '#10B981' },
    { name: 'Starters', value: 25, color: '#3B82F6' },
    { name: 'Breads', value: 15, color: '#F59E0B' },
    { name: 'Desserts', value: 10, color: '#EF4444' },
    { name: 'Beverages', value: 5, color: '#8B5CF6' },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹3,45,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Total Orders',
      value: '868',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Avg Order Value',
      value: '₹398',
      change: '+5.1%',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Customer Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      icon: Users,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Restaurant Reports</h1>
        <p className="text-gray-600">Analytics and insights for restaurant performance</p>
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
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']} />
              <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap justify-center space-x-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Items</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Butter Chicken</span>
              <span className="text-sm font-medium text-gray-900">156 orders</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Biryani</span>
              <span className="text-sm font-medium text-gray-900">142 orders</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Paneer Tikka</span>
              <span className="text-sm font-medium text-gray-900">98 orders</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Naan</span>
              <span className="text-sm font-medium text-gray-900">87 orders</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">7:00 PM - 9:00 PM</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">12:00 PM - 2:00 PM</span>
              <span className="text-sm font-medium text-gray-900">35%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">9:00 PM - 11:00 PM</span>
              <span className="text-sm font-medium text-gray-900">20%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Repeat Customers</span>
              <span className="text-sm font-medium text-gray-900">68%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Table Time</span>
              <span className="text-sm font-medium text-gray-900">45 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Online Orders</span>
              <span className="text-sm font-medium text-gray-900">42%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Dine-in Orders</span>
              <span className="text-sm font-medium text-gray-900">58%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 