import React, { useState } from 'react';
import { 
  Save,
  Building,
  Clock,
  CreditCard,
  Bell
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      restaurantName: 'Spice Garden',
      restaurantAddress: '123 Main Street, Mumbai, Maharashtra',
      phone: '+91 98765 43210',
      email: 'info@spicegarden.com',
      website: 'https://spicegarden.com',
      cuisine: 'Indian',
      description: 'Authentic Indian cuisine with modern twists'
    },
    hours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '11:00', close: '23:00', closed: false },
      sunday: { open: '12:00', close: '21:00', closed: false }
    },
    payment: {
      cash: true,
      card: true,
      upi: true,
      online: true,
      taxRate: 5.0,
      serviceCharge: 10.0
    },
    notifications: {
      orderAlerts: true,
      customerFeedback: true,
      inventoryAlerts: true,
      staffNotifications: true,
      emailNotifications: true,
      smsNotifications: false
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'hours', name: 'Hours', icon: Clock },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            value={settings.general.restaurantName}
            onChange={(e) => handleSettingChange('general', 'restaurantName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cuisine Type
          </label>
          <input
            type="text"
            value={settings.general.cuisine}
            onChange={(e) => handleSettingChange('general', 'cuisine', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={settings.general.phone}
            onChange={(e) => handleSettingChange('general', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={settings.general.email}
            onChange={(e) => handleSettingChange('general', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={settings.general.website}
            onChange={(e) => handleSettingChange('general', 'website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Restaurant Address
        </label>
        <textarea
          value={settings.general.restaurantAddress}
          onChange={(e) => handleSettingChange('general', 'restaurantAddress', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={settings.general.description}
          onChange={(e) => handleSettingChange('general', 'description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderHoursSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.hours).map(([day, hours]) => (
        <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={!hours.closed}
              onChange={(e) => handleSettingChange('hours', day, { ...hours, closed: !e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-900 capitalize">{day}</span>
          </div>
          {!hours.closed ? (
            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={hours.open}
                onChange={(e) => handleSettingChange('hours', day, { ...hours, open: e.target.value })}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={hours.close}
                onChange={(e) => handleSettingChange('hours', day, { ...hours, close: e.target.value })}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ) : (
            <span className="text-sm text-gray-500">Closed</span>
          )}
        </div>
      ))}
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Cash Payments</h4>
            <p className="text-sm text-gray-500">Accept cash payments</p>
          </div>
          <button
            onClick={() => handleSettingChange('payment', 'cash', !settings.payment.cash)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.payment.cash ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.payment.cash ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Card Payments</h4>
            <p className="text-sm text-gray-500">Accept card payments</p>
          </div>
          <button
            onClick={() => handleSettingChange('payment', 'card', !settings.payment.card)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.payment.card ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.payment.card ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">UPI Payments</h4>
            <p className="text-sm text-gray-500">Accept UPI payments</p>
          </div>
          <button
            onClick={() => handleSettingChange('payment', 'upi', !settings.payment.upi)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.payment.upi ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.payment.upi ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Online Orders</h4>
            <p className="text-sm text-gray-500">Accept online payments</p>
          </div>
          <button
            onClick={() => handleSettingChange('payment', 'online', !settings.payment.online)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.payment.online ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.payment.online ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={settings.payment.taxRate}
            onChange={(e) => handleSettingChange('payment', 'taxRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Charge (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={settings.payment.serviceCharge}
            onChange={(e) => handleSettingChange('payment', 'serviceCharge', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Order Alerts</h4>
            <p className="text-sm text-gray-500">Notify about new orders</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'orderAlerts', !settings.notifications.orderAlerts)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications.orderAlerts ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.orderAlerts ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Customer Feedback</h4>
            <p className="text-sm text-gray-500">Notify about new reviews</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'customerFeedback', !settings.notifications.customerFeedback)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications.customerFeedback ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.customerFeedback ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Inventory Alerts</h4>
            <p className="text-sm text-gray-500">Notify about low stock</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'inventoryAlerts', !settings.notifications.inventoryAlerts)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications.inventoryAlerts ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.inventoryAlerts ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Staff Notifications</h4>
            <p className="text-sm text-gray-500">Notify staff members</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'staffNotifications', !settings.notifications.staffNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications.staffNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.staffNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'hours':
        return renderHoursSettings();
      case 'payment':
        return renderPaymentSettings();
      case 'notifications':
        return renderNotificationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Settings</h1>
          <p className="text-gray-600">Configure restaurant preferences and options</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings; 