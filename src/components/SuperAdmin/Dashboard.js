import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  ShoppingCart, 
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';
import { superAdminAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentActivity: []
  });

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const [dashboardResponse, platformStatsResponse] = await Promise.all([
          superAdminAPI.getDashboard(),
          superAdminAPI.getPlatformStats()
        ]);

        const dashboard = dashboardResponse.data;
        const platformStats = platformStatsResponse.data;

        setDashboardData({
          stats: [
            {
              title: 'Total Restaurants',
              value: platformStats.totalRestaurants?.toString() || '0',
              change: platformStats.restaurantGrowth || '+0',
              icon: Building2,
              color: 'bg-blue-500',
              description: 'Registered restaurants'
            },
            {
              title: 'Pending Verifications',
              value: platformStats.pendingRestaurants?.toString() || '0',
              change: platformStats.restaurantGrowth || '-0',
              icon: Clock,
              color: 'bg-yellow-500',
              description: 'Awaiting approval'
            },
            {
              title: 'Active Restaurants',
              value: platformStats.activeRestaurants?.toString() || '0',
              change: platformStats.restaurantGrowth || '+0',
              icon: CheckCircle,
              color: 'bg-green-500',
              description: 'Currently active'
            },
            {
              title: 'Total Orders Today',
              value: dashboard.todayStats?.totalOrders?.toLocaleString() || '0',
              change: dashboard.todayStats?.totalOrders > 0 ? '+12%' : '+0%',
              icon: ShoppingCart,
              color: 'bg-purple-500',
              description: 'Across all restaurants'
            },
            {
              title: 'Total Revenue',
              value: `₹${dashboard.todayStats?.totalRevenue?.toLocaleString() || '0'}`,
              change: dashboard.todayStats?.totalRevenue > 0 ? '+8%' : '+0%',
              icon: DollarSign,
              color: 'bg-green-600',
              description: 'Today\'s earnings'
            },
            {
              title: 'Active Users',
              value: platformStats.activeUsers?.toString() || '0',
              change: platformStats.userGrowth || '+0',
              icon: Users,
              color: 'bg-indigo-500',
              description: 'Staff members online'
            }
          ],
          recentActivity: dashboard.recentActivity || []
        });
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'super_admin') {
      fetchDashboardData();
    }
  }, [user?.role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Error loading dashboard</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData.stats;

  // Mock stats data for development
  const mockStats = [
    {
      title: 'Total Restaurants',
      value: '12',
      change: '+2',
      icon: Building2,
      color: 'bg-blue-500',
      description: 'Registered restaurants'
    },
    {
      title: 'Active Restaurants',
      value: '10',
      change: '+1',
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Currently active'
    },
    {
      title: 'Pending Verifications',
      value: '3',
      change: '-1',
      icon: Clock,
      color: 'bg-yellow-500',
      description: 'Awaiting approval'
    },
    {
      title: 'Total Orders Today',
      value: '1,247',
      change: '+12%',
      icon: ShoppingCart,
      color: 'bg-purple-500',
      description: 'Across all restaurants'
    },
    {
      title: 'Total Revenue',
      value: '₹45,230',
      change: '+8%',
      icon: DollarSign,
      color: 'bg-green-600',
      description: 'Today\'s earnings'
    },
    {
      title: 'Active Users',
      value: '156',
      change: '+5',
      icon: Users,
      color: 'bg-indigo-500',
      description: 'Staff members online'
    }
  ];

  const recentActivity = dashboardData.recentActivity;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening across your restaurant platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-2">from yesterday</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <Activity className={`h-4 w-4 ${
                    activity.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Building2 className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Add Restaurant</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium">Create Admin User</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium">Review Pending</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard; 