import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
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
  Download,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  RefreshCw
} from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');

  // Mock data
  const revenueData = [
    { month: 'Jan', revenue: 45000, orders: 1200, restaurants: 45 },
    { month: 'Feb', revenue: 52000, orders: 1350, restaurants: 48 },
    { month: 'Mar', revenue: 48000, orders: 1280, restaurants: 50 },
    { month: 'Apr', revenue: 61000, orders: 1600, restaurants: 52 },
    { month: 'May', revenue: 55000, orders: 1450, restaurants: 55 },
    { month: 'Jun', revenue: 68000, orders: 1800, restaurants: 58 },
  ];

  const restaurantPerformance = [
    { name: 'Spice Garden', revenue: 12500, orders: 320, rating: 4.5 },
    { name: 'Taste Buds', revenue: 9800, orders: 280, rating: 4.3 },
    { name: 'Food Court', revenue: 11200, orders: 310, rating: 4.4 },
    { name: 'Dine In', revenue: 8900, orders: 240, rating: 4.2 },
    { name: 'Pizza Palace', revenue: 15600, orders: 420, rating: 4.6 },
  ];

  const categoryData = [
    { name: 'Indian', value: 35, color: '#10B981' },
    { name: 'Chinese', value: 25, color: '#3B82F6' },
    { name: 'Italian', value: 20, color: '#F59E0B' },
    { name: 'Mexican', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' },
  ];

  const orderTrends = [
    { day: 'Mon', orders: 45, revenue: 1800 },
    { day: 'Tue', orders: 52, revenue: 2100 },
    { day: 'Wed', orders: 38, revenue: 1500 },
    { day: 'Thu', orders: 67, revenue: 2800 },
    { day: 'Fri', orders: 89, revenue: 3600 },
    { day: 'Sat', orders: 120, revenue: 4800 },
    { day: 'Sun', orders: 95, revenue: 3800 },
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
      value: '8,750',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Restaurants',
      value: '58',
      change: '+3',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Avg Order Value',
      value: '₹394',
      change: '+5.1%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Reports</h1>
          <p className="text-gray-600">Analytics and insights for platform performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>
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
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Restaurant Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurant Categories</h3>
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

      {/* Order Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Order Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="orders" fill="#3B82F6" name="Orders" />
            <Bar yAxisId="right" dataKey="revenue" fill="#10B981" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Restaurant Performance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Restaurants</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restaurantPerformance.map((restaurant, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{restaurant.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{restaurant.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{restaurant.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(restaurant.revenue / 15600) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        {Math.round((restaurant.revenue / 15600) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Platform Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Users</span>
              <span className="text-sm font-medium text-gray-900">12,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Sessions</span>
              <span className="text-sm font-medium text-gray-900">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Response Time</span>
              <span className="text-sm font-medium text-gray-900">245ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-medium text-green-600">99.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Analytics</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Successful Payments</span>
              <span className="text-sm font-medium text-gray-900">98.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Failed Transactions</span>
              <span className="text-sm font-medium text-gray-900">1.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Transaction Value</span>
              <span className="text-sm font-medium text-gray-900">₹394</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Commission Earned</span>
              <span className="text-sm font-medium text-green-600">₹17,250</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">New Customers</span>
              <span className="text-sm font-medium text-gray-900">2,340</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Repeat Customers</span>
              <span className="text-sm font-medium text-gray-900">8,760</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer Satisfaction</span>
              <span className="text-sm font-medium text-green-600">4.6/5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Support Tickets</span>
              <span className="text-sm font-medium text-gray-900">156</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 