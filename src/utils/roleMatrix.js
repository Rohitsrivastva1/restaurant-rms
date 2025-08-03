// Role Matrix for Restaurant Management System
// Defines access permissions for all roles and modules

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  CHEF: 'chef',
  WAITER: 'waiter',
  CUSTOMER: 'customer'
};

// Module definitions
export const MODULES = {
  // SuperAdmin Modules
  SUPER_ADMIN_DASHBOARD: 'super_admin_dashboard',
  RESTAURANT_MANAGEMENT: 'restaurant_management',
  ADMIN_USER_MANAGEMENT: 'admin_user_management',
  PLATFORM_SETTINGS: 'platform_settings',
  SUPER_ADMIN_REPORTS: 'super_admin_reports',
  
  // Admin/Manager Modules
  ADMIN_DASHBOARD: 'admin_dashboard',
  STAFF_MANAGEMENT: 'staff_management',
  MENU_MANAGEMENT: 'menu_management',
  ORDER_MANAGEMENT: 'order_management',
  TABLE_MANAGEMENT: 'table_management',
  CUSTOMER_FEEDBACK: 'customer_feedback',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  QR_CODE_GENERATOR: 'qr_code_generator',
  
  // Chef Modules
  CHEF_DASHBOARD: 'chef_dashboard',
  LIVE_ORDERS: 'live_orders',
  ORDER_HISTORY: 'order_history',
  CHEF_PROFILE: 'chef_profile',
  
  // Customer Modules
  CUSTOMER_MENU: 'customer_menu',
  CUSTOMER_ORDER: 'customer_order',
  
  // Common Modules
  PROFILE: 'profile',
  NOTIFICATIONS: 'notifications'
};

// Permission levels
export const PERMISSIONS = {
  NONE: 'none',
  VIEW: 'view',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage' // Full CRUD + special actions
};

// Role Matrix - Defines what each role can access
export const ROLE_MATRIX = {
  [ROLES.SUPER_ADMIN]: {
    // SuperAdmin has access to everything
    [MODULES.SUPER_ADMIN_DASHBOARD]: PERMISSIONS.MANAGE,
    [MODULES.RESTAURANT_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.ADMIN_USER_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.PLATFORM_SETTINGS]: PERMISSIONS.MANAGE,
    [MODULES.SUPER_ADMIN_REPORTS]: PERMISSIONS.MANAGE,
    
    // Can also access admin features for any restaurant
    [MODULES.ADMIN_DASHBOARD]: PERMISSIONS.VIEW,
    [MODULES.STAFF_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.MENU_MANAGEMENT]: PERMISSIONS.VIEW,
    [MODULES.ORDER_MANAGEMENT]: PERMISSIONS.VIEW,
    [MODULES.TABLE_MANAGEMENT]: PERMISSIONS.VIEW,
    [MODULES.CUSTOMER_FEEDBACK]: PERMISSIONS.VIEW,
    [MODULES.REPORTS]: PERMISSIONS.VIEW,
    [MODULES.SETTINGS]: PERMISSIONS.VIEW,
    [MODULES.QR_CODE_GENERATOR]: PERMISSIONS.VIEW,
    
    // Common modules
    [MODULES.PROFILE]: PERMISSIONS.UPDATE,
    [MODULES.NOTIFICATIONS]: PERMISSIONS.VIEW
  },
  
  [ROLES.ADMIN]: {
    // Restaurant Owner/Admin has full access to restaurant management
    [MODULES.ADMIN_DASHBOARD]: PERMISSIONS.MANAGE,
    [MODULES.STAFF_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.MENU_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.ORDER_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.TABLE_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.CUSTOMER_FEEDBACK]: PERMISSIONS.MANAGE,
    [MODULES.REPORTS]: PERMISSIONS.MANAGE,
    [MODULES.SETTINGS]: PERMISSIONS.MANAGE,
    [MODULES.QR_CODE_GENERATOR]: PERMISSIONS.MANAGE,
    
    // Common modules
    [MODULES.PROFILE]: PERMISSIONS.UPDATE,
    [MODULES.NOTIFICATIONS]: PERMISSIONS.VIEW
  },
  
  [ROLES.MANAGER]: {
    // Restaurant Manager has most admin permissions
    [MODULES.ADMIN_DASHBOARD]: PERMISSIONS.VIEW,
    [MODULES.STAFF_MANAGEMENT]: PERMISSIONS.MANAGE, // Can manage staff
    [MODULES.MENU_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.ORDER_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.TABLE_MANAGEMENT]: PERMISSIONS.MANAGE,
    [MODULES.CUSTOMER_FEEDBACK]: PERMISSIONS.MANAGE,
    [MODULES.REPORTS]: PERMISSIONS.VIEW,
    [MODULES.SETTINGS]: PERMISSIONS.VIEW,
    [MODULES.QR_CODE_GENERATOR]: PERMISSIONS.VIEW,
    
    // Common modules
    [MODULES.PROFILE]: PERMISSIONS.UPDATE,
    [MODULES.NOTIFICATIONS]: PERMISSIONS.VIEW
  },
  
  [ROLES.CHEF]: {
    // Chef has access to kitchen-related modules
    [MODULES.CHEF_DASHBOARD]: PERMISSIONS.MANAGE,
    [MODULES.LIVE_ORDERS]: PERMISSIONS.MANAGE,
    [MODULES.ORDER_HISTORY]: PERMISSIONS.VIEW,
    [MODULES.CHEF_PROFILE]: PERMISSIONS.UPDATE,
    
    // Limited access to other modules
    [MODULES.MENU_MANAGEMENT]: PERMISSIONS.VIEW,
    [MODULES.ORDER_MANAGEMENT]: PERMISSIONS.VIEW,
    
    // Common modules
    [MODULES.PROFILE]: PERMISSIONS.UPDATE,
    [MODULES.NOTIFICATIONS]: PERMISSIONS.VIEW
  },
  
  [ROLES.WAITER]: {
    // Waiter has limited access
    [MODULES.ORDER_MANAGEMENT]: PERMISSIONS.VIEW,
    [MODULES.TABLE_MANAGEMENT]: PERMISSIONS.VIEW,
    [MODULES.CUSTOMER_FEEDBACK]: PERMISSIONS.VIEW,
    
    // Common modules
    [MODULES.PROFILE]: PERMISSIONS.UPDATE,
    [MODULES.NOTIFICATIONS]: PERMISSIONS.VIEW
  },
  
  [ROLES.CUSTOMER]: {
    // Customer has access to customer-facing modules
    [MODULES.CUSTOMER_MENU]: PERMISSIONS.VIEW,
    [MODULES.CUSTOMER_ORDER]: PERMISSIONS.MANAGE,
    
    // Common modules
    [MODULES.PROFILE]: PERMISSIONS.UPDATE,
    [MODULES.NOTIFICATIONS]: PERMISSIONS.VIEW
  }
};

// Navigation menu structure based on roles
export const NAVIGATION_MENU = {
  [ROLES.SUPER_ADMIN]: [
    {
      title: 'Dashboard',
      path: '/superadmin',
      icon: 'Dashboard',
      module: MODULES.SUPER_ADMIN_DASHBOARD
    },
    {
      title: 'Restaurant Management',
      path: '/superadmin/restaurants',
      icon: 'Building2',
      module: MODULES.RESTAURANT_MANAGEMENT
    },
    {
      title: 'Admin Users',
      path: '/superadmin/admin-users',
      icon: 'Users',
      module: MODULES.ADMIN_USER_MANAGEMENT
    },
    {
      title: 'Platform Settings',
      path: '/superadmin/settings',
      icon: 'Settings',
      module: MODULES.PLATFORM_SETTINGS
    },
    {
      title: 'Reports',
      path: '/superadmin/reports',
      icon: 'BarChart3',
      module: MODULES.SUPER_ADMIN_REPORTS
    }
  ],
  
  [ROLES.ADMIN]: [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: 'Dashboard',
      module: MODULES.ADMIN_DASHBOARD
    },
    {
      title: 'Staff Management',
      path: '/admin/staff',
      icon: 'Users',
      module: MODULES.STAFF_MANAGEMENT
    },
    {
      title: 'Menu Management',
      path: '/admin/menu',
      icon: 'Utensils',
      module: MODULES.MENU_MANAGEMENT
    },
    {
      title: 'Order Management',
      path: '/admin/orders',
      icon: 'ClipboardList',
      module: MODULES.ORDER_MANAGEMENT
    },
    {
      title: 'Table Management',
      path: '/admin/tables',
      icon: 'MapPin',
      module: MODULES.TABLE_MANAGEMENT
    },
    {
      title: 'Customer Feedback',
      path: '/admin/feedback',
      icon: 'MessageSquare',
      module: MODULES.CUSTOMER_FEEDBACK
    },
    {
      title: 'Reports',
      path: '/admin/reports',
      icon: 'BarChart3',
      module: MODULES.REPORTS
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: 'Settings',
      module: MODULES.SETTINGS
    }
  ],
  
  [ROLES.MANAGER]: [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: 'Dashboard',
      module: MODULES.ADMIN_DASHBOARD
    },
    {
      title: 'Staff Management',
      path: '/admin/staff',
      icon: 'Users',
      module: MODULES.STAFF_MANAGEMENT
    },
    {
      title: 'Menu Management',
      path: '/admin/menu',
      icon: 'Utensils',
      module: MODULES.MENU_MANAGEMENT
    },
    {
      title: 'Order Management',
      path: '/admin/orders',
      icon: 'ClipboardList',
      module: MODULES.ORDER_MANAGEMENT
    },
    {
      title: 'Table Management',
      path: '/admin/tables',
      icon: 'MapPin',
      module: MODULES.TABLE_MANAGEMENT
    },
    {
      title: 'Customer Feedback',
      path: '/admin/feedback',
      icon: 'MessageSquare',
      module: MODULES.CUSTOMER_FEEDBACK
    },
    {
      title: 'Reports',
      path: '/admin/reports',
      icon: 'BarChart3',
      module: MODULES.REPORTS
    }
  ],
  
  [ROLES.CHEF]: [
    {
      title: 'Dashboard',
      path: '/chef',
      icon: 'Dashboard',
      module: MODULES.CHEF_DASHBOARD
    },
    {
      title: 'Live Orders',
      path: '/chef/live-orders',
      icon: 'Clock',
      module: MODULES.LIVE_ORDERS
    },
    {
      title: 'Order History',
      path: '/chef/order-history',
      icon: 'History',
      module: MODULES.ORDER_HISTORY
    },
    {
      title: 'Profile',
      path: '/chef/profile',
      icon: 'User',
      module: MODULES.CHEF_PROFILE
    }
  ],
  
  [ROLES.WAITER]: [
    {
      title: 'Orders',
      path: '/waiter/orders',
      icon: 'ClipboardList',
      module: MODULES.ORDER_MANAGEMENT
    },
    {
      title: 'Tables',
      path: '/waiter/tables',
      icon: 'MapPin',
      module: MODULES.TABLE_MANAGEMENT
    },
    {
      title: 'Feedback',
      path: '/waiter/feedback',
      icon: 'MessageSquare',
      module: MODULES.CUSTOMER_FEEDBACK
    }
  ]
};

// Helper functions
export const hasPermission = (userRole, module, permission = PERMISSIONS.VIEW) => {
  if (!userRole || !module) return false;
  
  const rolePermissions = ROLE_MATRIX[userRole];
  if (!rolePermissions) return false;
  
  const modulePermission = rolePermissions[module];
  if (!modulePermission) return false;
  
  // Check permission hierarchy
  const permissionHierarchy = {
    [PERMISSIONS.NONE]: 0,
    [PERMISSIONS.VIEW]: 1,
    [PERMISSIONS.CREATE]: 2,
    [PERMISSIONS.UPDATE]: 3,
    [PERMISSIONS.DELETE]: 4,
    [PERMISSIONS.MANAGE]: 5
  };
  
  return permissionHierarchy[modulePermission] >= permissionHierarchy[permission];
};

export const canAccess = (userRole, module) => {
  return hasPermission(userRole, module, PERMISSIONS.VIEW);
};

export const canCreate = (userRole, module) => {
  return hasPermission(userRole, module, PERMISSIONS.CREATE);
};

export const canUpdate = (userRole, module) => {
  return hasPermission(userRole, module, PERMISSIONS.UPDATE);
};

export const canDelete = (userRole, module) => {
  return hasPermission(userRole, module, PERMISSIONS.DELETE);
};

export const canManage = (userRole, module) => {
  return hasPermission(userRole, module, PERMISSIONS.MANAGE);
};

export const getNavigationMenu = (userRole) => {
  return NAVIGATION_MENU[userRole] || [];
};

export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.SUPER_ADMIN]: 'Super Admin',
    [ROLES.ADMIN]: 'Restaurant Owner',
    [ROLES.MANAGER]: 'Restaurant Manager',
    [ROLES.CHEF]: 'Chef',
    [ROLES.WAITER]: 'Waiter',
    [ROLES.CUSTOMER]: 'Customer'
  };
  return roleNames[role] || role;
};

export const getRoleColor = (role) => {
  const roleColors = {
    [ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-800',
    [ROLES.ADMIN]: 'bg-blue-100 text-blue-800',
    [ROLES.MANAGER]: 'bg-green-100 text-green-800',
    [ROLES.CHEF]: 'bg-orange-100 text-orange-800',
    [ROLES.WAITER]: 'bg-yellow-100 text-yellow-800',
    [ROLES.CUSTOMER]: 'bg-gray-100 text-gray-800'
  };
  return roleColors[role] || 'bg-gray-100 text-gray-800';
}; 