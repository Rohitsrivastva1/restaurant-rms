import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock,
  Edit,
  Save,
  Award
} from 'lucide-react';

const ChefProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.k@spicegarden.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra',
    joinDate: '2023-01-15',
    role: 'Head Chef',
    specialization: 'Indian Cuisine',
    experience: '8 years',
    rating: 4.5,
    totalOrders: 1250,
    avgPrepTime: 28,
    performance: 92
  });

  const stats = [
    {
      title: 'Total Orders',
      value: profile.totalOrders,
      color: 'bg-blue-500',
      icon: TrendingUp
    },
    {
      title: 'Avg Rating',
      value: profile.rating,
      color: 'bg-yellow-500',
      icon: Star
    },
    {
      title: 'Avg Prep Time',
      value: profile.avgPrepTime + ' min',
      color: 'bg-green-500',
      icon: Clock
    },
    {
      title: 'Performance',
      value: profile.performance + '%',
      color: 'bg-purple-500',
      icon: Award
    }
  ];

  const recentAchievements = [
    {
      title: 'Best Chef Award',
      description: 'Recognized for outstanding culinary skills',
      date: '2024-01-15',
      type: 'award'
    },
    {
      title: '1000 Orders Milestone',
      description: 'Successfully completed 1000 orders',
      date: '2024-01-10',
      type: 'milestone'
    },
    {
      title: 'Perfect Rating Week',
      description: 'Maintained 5-star rating for entire week',
      date: '2024-01-05',
      type: 'performance'
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chef Profile</h1>
          <p className="text-gray-600">Manage your profile and view performance metrics</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-lg text-gray-600">{profile.role}</p>
            <p className="text-sm text-gray-500">{profile.specialization}</p>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">{profile.rating}/5</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Experience</div>
            <div className="text-lg font-bold text-gray-900">{profile.experience}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            </div>
          );
        })}
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Address</label>
                {isEditing ? (
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    rows={2}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{profile.address}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">Join Date</label>
                <p className="text-gray-900">{profile.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Overall Performance</span>
                <span className="text-gray-900">{profile.performance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${profile.performance}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Customer Rating</span>
                <span className="text-gray-900">{profile.rating}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(profile.rating / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Efficiency</span>
                <span className="text-gray-900">{profile.avgPrepTime} min avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${100 - (profile.avgPrepTime / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="space-y-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500">{achievement.date}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                achievement.type === 'award' ? 'bg-yellow-100 text-yellow-800' :
                achievement.type === 'milestone' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {achievement.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills and Specializations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Specializations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Cuisine Specialties</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Indian</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Tandoori</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Curry</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Biryani</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Cooking Techniques</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Grilling</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Frying</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">Steaming</span>
              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">Baking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Notifications</h4>
              <p className="text-sm text-gray-600">Order alerts and updates</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Privacy</h4>
              <p className="text-sm text-gray-600">Manage your privacy settings</p>
            </div>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm">
              Manage
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Password</h4>
              <p className="text-sm text-gray-600">Change your password</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Save Button for Edit Mode */}
      {isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChefProfile; 