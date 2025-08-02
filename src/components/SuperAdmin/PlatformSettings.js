import React, { useState } from 'react';
import { 
  Settings, 
  CreditCard, 
  Bell, 
  Shield, 
  Database, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const PlatformSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      platformName: 'Restaurant Management Platform',
      platformUrl: 'https://restaurant-platform.com',
      timezone: 'Asia/Kolkata',
      language: 'English',
      maintenanceMode: false,
      debugMode: false
    },
    payment: {
      razorpayKey: 'rzp_test_1234567890',
      razorpaySecret: 'secret_key_here',
      commissionRate: 5.0,
      autoPayout: true,
      payoutSchedule: 'weekly'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      orderAlerts: true,
      systemAlerts: true,
      marketingEmails: false
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: true,
      passwordPolicy: 'strong',
      ipWhitelist: []
    },
    integrations: {
      twilioEnabled: true,
      firebaseEnabled: true,
      analyticsEnabled: true,
      backupEnabled: true
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
    { id: 'general', name: 'General', icon: Settings },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Database }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform Name
          </label>
          <input
            type="text"
            value={settings.general.platformName}
            onChange={(e) => handleSettingChange('general', 'platformName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform URL
          </label>
          <input
            type="url"
            value={settings.general.platformUrl}
            onChange={(e) => handleSettingChange('general', 'platformUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
            <p className="text-sm text-gray-500">Temporarily disable the platform for maintenance</p>
          </div>
          <button
            onClick={() => handleSettingChange('general', 'maintenanceMode', !settings.general.maintenanceMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.general.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.general.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Debug Mode</h4>
            <p className="text-sm text-gray-500">Enable detailed logging for development</p>
          </div>
          <button
            onClick={() => handleSettingChange('general', 'debugMode', !settings.general.debugMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.general.debugMode ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.general.debugMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Razorpay Key ID
          </label>
          <input
            type="text"
            value={settings.payment.razorpayKey}
            onChange={(e) => handleSettingChange('payment', 'razorpayKey', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Razorpay Secret Key
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={settings.payment.razorpaySecret}
              onChange={(e) => handleSettingChange('payment', 'razorpaySecret', e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commission Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={settings.payment.commissionRate}
            onChange={(e) => handleSettingChange('payment', 'commissionRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payout Schedule
          </label>
          <select
            value={settings.payment.payoutSchedule}
            onChange={(e) => handleSettingChange('payment', 'payoutSchedule', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Auto Payout</h4>
          <p className="text-sm text-gray-500">Automatically process payouts to restaurants</p>
        </div>
        <button
          onClick={() => handleSettingChange('payment', 'autoPayout', !settings.payment.autoPayout)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.payment.autoPayout ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.payment.autoPayout ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-500">Send notifications via email</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'emailNotifications', !settings.notifications.emailNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
            <p className="text-sm text-gray-500">Send notifications via SMS</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'smsNotifications', !settings.notifications.smsNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.smsNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
            <p className="text-sm text-gray-500">Send push notifications to mobile apps</p>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', 'pushNotifications', !settings.notifications.pushNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
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
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Policy
          </label>
          <select
            value={settings.security.passwordPolicy}
            onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weak">Weak (6+ characters)</option>
            <option value="medium">Medium (8+ characters, 1 uppercase)</option>
            <option value="strong">Strong (10+ characters, mixed case, numbers, symbols)</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
        </div>
        <button
          onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Twilio Integration</h4>
            <p className="text-sm text-gray-500">SMS notifications via Twilio</p>
          </div>
          <button
            onClick={() => handleSettingChange('integrations', 'twilioEnabled', !settings.integrations.twilioEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.integrations.twilioEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.integrations.twilioEnabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Firebase Integration</h4>
            <p className="text-sm text-gray-500">Push notifications via Firebase</p>
          </div>
          <button
            onClick={() => handleSettingChange('integrations', 'firebaseEnabled', !settings.integrations.firebaseEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.integrations.firebaseEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.integrations.firebaseEnabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Analytics</h4>
            <p className="text-sm text-gray-500">Track platform usage and performance</p>
          </div>
          <button
            onClick={() => handleSettingChange('integrations', 'analyticsEnabled', !settings.integrations.analyticsEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.integrations.analyticsEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.integrations.analyticsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Auto Backup</h4>
            <p className="text-sm text-gray-500">Automatically backup data</p>
          </div>
          <button
            onClick={() => handleSettingChange('integrations', 'backupEnabled', !settings.integrations.backupEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.integrations.backupEnabled ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.integrations.backupEnabled ? 'translate-x-6' : 'translate-x-1'
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
      case 'payment':
        return renderPaymentSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
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

export default PlatformSettings; 