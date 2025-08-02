import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Star,
  CheckCircle
} from 'lucide-react';

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Mock data
  const staff = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'chef',
      email: 'rajesh.k@spicegarden.com',
      phone: '+91 98765 43210',
      status: 'active',
      joinDate: '2023-01-15',
      salary: 35000,
      rating: 4.5,
      shifts: ['Morning', 'Evening'],
      performance: 92
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'waiter',
      email: 'priya.s@spicegarden.com',
      phone: '+91 98765 43211',
      status: 'active',
      joinDate: '2023-03-20',
      salary: 25000,
      rating: 4.2,
      shifts: ['Evening', 'Night'],
      performance: 88
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'chef',
      email: 'amit.p@spicegarden.com',
      phone: '+91 98765 43212',
      status: 'active',
      joinDate: '2023-02-10',
      salary: 32000,
      rating: 4.7,
      shifts: ['Morning', 'Afternoon'],
      performance: 95
    },
    {
      id: 4,
      name: 'Neha Singh',
      role: 'waiter',
      email: 'neha.s@spicegarden.com',
      phone: '+91 98765 43213',
      status: 'inactive',
      joinDate: '2023-04-05',
      salary: 22000,
      rating: 3.8,
      shifts: ['Morning'],
      performance: 75
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      role: 'manager',
      email: 'vikram.m@spicegarden.com',
      phone: '+91 98765 43214',
      status: 'active',
      joinDate: '2022-11-15',
      salary: 45000,
      rating: 4.8,
      shifts: ['All Day'],
      performance: 98
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'chef': return 'bg-orange-100 text-orange-800';
      case 'waiter': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = staff.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    {
      title: 'Total Staff',
      value: staff.length,
      color: 'bg-blue-500',
      icon: Users
    },
    {
      title: 'Active',
      value: staff.filter(s => s.status === 'active').length,
      color: 'bg-green-500',
      icon: CheckCircle
    },
    {
      title: 'Chefs',
      value: staff.filter(s => s.role === 'chef').length,
      color: 'bg-orange-500',
      icon: Users
    },
    {
      title: 'Waiters',
      value: staff.filter(s => s.role === 'waiter').length,
      color: 'bg-blue-500',
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage restaurant staff and schedules</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Add Staff</span>
        </button>
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="chef">Chef</option>
              <option value="waiter">Waiter</option>
              <option value="manager">Manager</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((employee) => (
          <div 
            key={employee.id} 
            className="bg-white rounded-lg shadow-lg border-2 hover:shadow-xl transition-shadow"
          >
            {/* Staff Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedStaff(employee)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(employee.role)}`}>
                  {employee.role}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
            </div>

            {/* Staff Content */}
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm text-gray-900">{employee.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Join Date:</span>
                  <span className="text-sm text-gray-900">{employee.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Salary:</span>
                  <span className="text-sm font-medium text-gray-900">₹{employee.salary.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{employee.rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 ml-1" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance:</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${employee.performance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">{employee.performance}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Shifts:</span>
                  <span className="text-sm text-gray-900">{employee.shifts.join(', ')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                  View Schedule
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm">
                  Performance
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal (Placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Add New Staff</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  This modal would contain a form to add new staff members with details like name, role, contact info, etc.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Details Modal (Placeholder) */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900">Staff Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  <strong>Name:</strong> {selectedStaff.name}<br/>
                  <strong>Role:</strong> {selectedStaff.role}<br/>
                  <strong>Email:</strong> {selectedStaff.email}<br/>
                  <strong>Phone:</strong> {selectedStaff.phone}<br/>
                  <strong>Status:</strong> {selectedStaff.status}<br/>
                  <strong>Join Date:</strong> {selectedStaff.joinDate}<br/>
                  <strong>Salary:</strong> ₹{selectedStaff.salary.toLocaleString()}<br/>
                  <strong>Rating:</strong> {selectedStaff.rating}/5<br/>
                  <strong>Performance:</strong> {selectedStaff.performance}%
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setSelectedStaff(null)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement; 