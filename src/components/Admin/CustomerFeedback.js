import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Search,
  Eye,
  Reply,
  Send,
  X
} from 'lucide-react';
import { feedbackAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const CustomerFeedback = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Fetch feedback from API
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await feedbackAPI.getAll({
          restaurantId: user?.restaurantId
        });
        setFeedbacks(response.data);
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    if (user?.restaurantId) {
      fetchFeedback();
    }
  }, [user?.restaurantId]);

  const handleSendResponse = async (feedbackId) => {
    try {
      setLoading(true);
      await feedbackAPI.update(feedbackId, {
        response: responseText,
        status: 'responded'
      });
      
      setFeedbacks(prev => prev.map(feedback => 
        feedback.id === feedbackId 
          ? { ...feedback, response: responseText, status: 'responded' }
          : feedback
      ));
      
      setShowResponseModal(false);
      setSelectedFeedback(null);
      setResponseText('');
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (feedbackId, status) => {
    try {
      setLoading(true);
      await feedbackAPI.updateStatus(feedbackId, status);
      
      setFeedbacks(prev => prev.map(feedback => 
        feedback.id === feedbackId ? { ...feedback, status } : feedback
      ));
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase());
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

  const stats = [
    {
      title: 'Total Reviews',
      value: feedbacks.length,
      color: 'bg-blue-500',
      icon: MessageSquare
    },
    {
      title: 'Avg Rating',
      value: feedbacks.length > 0 
        ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
        : '0.0',
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Error loading feedback</div>
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
        {feedbacks.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
            <p className="text-gray-600">Customer feedback will appear here once customers start leaving reviews.</p>
          </div>
        ) : (
          filteredFeedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{feedback.customerName || 'Anonymous'}</h3>
                  <span className="text-sm text-gray-500">Order #{feedback.orderId}</span>
                  <span className="text-sm text-gray-500">
                    {feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
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
                <button 
                  onClick={() => setSelectedFeedback(feedback)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {feedback.status === 'pending' && (
                  <button 
                    onClick={() => {
                      setSelectedFeedback(feedback);
                      setShowResponseModal(true);
                    }}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Reply className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Response Rate Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Rate</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {feedbacks.length > 0 
                ? Math.round((feedbacks.filter(f => f.status === 'responded').length / feedbacks.length) * 100)
                : 0}%
            </div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {feedbacks.length > 0 
                ? Math.round(feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length * 20)
                : 0}%
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

      {/* Response Modal */}
      {showResponseModal && selectedFeedback && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Respond to Feedback</h3>
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Customer:</strong> {selectedFeedback.customerName || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Rating:</strong> {selectedFeedback.rating}/5
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Comment:</strong> {selectedFeedback.comment}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your response to the customer..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleSendResponse(selectedFeedback.id)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Response</span>
              </button>
              <button
                onClick={() => setShowResponseModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback; 