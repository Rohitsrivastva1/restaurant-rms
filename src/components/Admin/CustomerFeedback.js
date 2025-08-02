import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Search,
  Eye,
  Reply
} from 'lucide-react';

const CustomerFeedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  // Mock data
  const feedbacks = [
    {
      id: 1,
      customerName: 'John Smith',
      orderId: 'ORD-001',
      rating: 5,
      comment: 'Excellent food quality and taste! The butter chicken was amazing. Will definitely come back.',
      date: '2024-01-15',
      status: 'responded',
      response: 'Thank you for your wonderful feedback! We\'re glad you enjoyed your meal.'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      orderId: 'ORD-002',
      rating: 4,
      comment: 'Good biryani, could be spicier. Service was prompt.',
      date: '2024-01-14',
      status: 'pending',
      response: null
    },
    {
      id: 3,
      customerName: 'Mike Wilson',
      orderId: 'ORD-003',
      rating: 5,
      comment: 'Perfect! Will definitely come back. The staff was very friendly.',
      date: '2024-01-13',
      status: 'responded',
      response: 'Thank you for your kind words! We look forward to serving you again.'
    },
    {
      id: 4,
      customerName: 'Lisa Brown',
      orderId: 'ORD-004',
      rating: 3,
      comment: 'Food was okay, but the wait time was too long. Need to improve service speed.',
      date: '2024-01-12',
      status: 'pending',
      response: null
    },
    {
      id: 5,
      customerName: 'David Lee',
      orderId: 'ORD-005',
      rating: 5,
      comment: 'Amazing pasta! Best I\'ve had. The chef really knows how to cook Italian food.',
      date: '2024-01-11',
      status: 'responded',
      response: 'We\'re thrilled you enjoyed our Italian dishes! Thank you for the feedback.'
    }
  ];

  const stats = [
    {
      title: 'Total Reviews',
      value: feedbacks.length,
      color: 'bg-blue-500',
      icon: MessageSquare
    },
    {
      title: 'Avg Rating',
      value: (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1),
      color: 'bg-yellow-500',
      icon: Star
    },
    {
      title: 'Positive Reviews',
      value: feedbacks.filter(f => f.rating >= 4).length,
      color: 'bg-green-500',
      icon: ThumbsUp
    },
    {
      title: 'Pending Response',
      value: feedbacks.filter(f => f.status === 'pending').length,
      color: 'bg-orange-500',
      icon: Reply
    }
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 'all' || feedback.rating === parseInt(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Feedback</h1>
        <p className="text-gray-600">Manage customer reviews and ratings</p>
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
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{feedback.customerName}</h3>
                  <span className="text-sm text-gray-500">Order #{feedback.orderId}</span>
                  <span className="text-sm text-gray-500">{feedback.date}</span>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  {renderStars(feedback.rating)}
                  <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                </div>
                <p className="text-gray-700 mb-3">{feedback.comment}</p>
                
                {feedback.response && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Response:</strong> {feedback.response}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  feedback.status === 'responded' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {feedback.status}
                </span>
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye className="w-4 h-4" />
                </button>
                {feedback.status === 'pending' && (
                  <button className="text-green-600 hover:text-green-900">
                    <Reply className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Response Rate Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Rate</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((feedbacks.filter(f => f.status === 'responded').length / feedbacks.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length * 20)}%
            </div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {feedbacks.filter(f => f.rating === 5).length}
            </div>
            <div className="text-sm text-gray-600">5-Star Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback; 