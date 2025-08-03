# Role Matrix & Access Control Documentation

## Overview
This document outlines the complete role-based access control (RBAC) system for the Restaurant Management System. The system supports multiple roles with different levels of permissions and access to various modules.

## Role Hierarchy

### 1. Super Admin (super_admin)
**Description**: Platform administrator with full system access
**Responsibilities**:
- Manage all restaurants on the platform
- Create and manage admin users for restaurants
- Configure platform-wide settings
- Access all system reports and analytics
- Approve/suspend restaurants

**Access Level**: Full system access

### 2. Restaurant Owner/Admin (admin)
**Description**: Restaurant owner with full restaurant management access
**Responsibilities**:
- Manage their restaurant completely
- Create and manage staff (managers, chefs, waiters)
- Manage menu, orders, tables, feedback
- Access restaurant-specific reports
- Configure restaurant settings

**Access Level**: Full restaurant access

### 3. Restaurant Manager (manager)
**Description**: Restaurant manager with most admin permissions
**Responsibilities**:
- Manage staff (chefs, waiters)
- Manage menu, orders, tables, feedback
- View reports (limited)
- Cannot access restaurant settings

**Access Level**: Most restaurant features (except settings)

### 4. Chef (chef)
**Description**: Kitchen staff with order management access
**Responsibilities**:
- View and manage live orders
- Update order status
- View order history
- Manage chef profile
- View menu (read-only)

**Access Level**: Kitchen-related features

### 5. Waiter (waiter)
**Description**: Service staff with limited access
**Responsibilities**:
- View orders and tables
- View customer feedback
- Cannot modify menu or settings

**Access Level**: Limited view access

### 6. Customer (customer)
**Description**: End customer with ordering access
**Responsibilities**:
- View menu
- Place orders
- View order status

**Access Level**: Customer-facing features only

## Permission Levels

| Level | Description | Actions |
|-------|-------------|---------|
| `none` | No access | Cannot view or interact |
| `view` | Read-only access | Can view data but cannot modify |
| `create` | Create access | Can create new items |
| `update` | Update access | Can modify existing items |
| `delete` | Delete access | Can remove items |
| `manage` | Full management | Complete CRUD + special actions |

## Module Access Matrix

| Module | Super Admin | Admin | Manager | Chef | Waiter | Customer |
|--------|-------------|-------|---------|------|--------|----------|
| **SuperAdmin Modules** |
| SuperAdmin Dashboard | ✅ Manage | ❌ | ❌ | ❌ | ❌ | ❌ |
| Restaurant Management | ✅ Manage | ❌ | ❌ | ❌ | ❌ | ❌ |
| Admin User Management | ✅ Manage | ❌ | ❌ | ❌ | ❌ | ❌ |
| Platform Settings | ✅ Manage | ❌ | ❌ | ❌ | ❌ | ❌ |
| SuperAdmin Reports | ✅ Manage | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Admin/Manager Modules** |
| Admin Dashboard | ✅ View | ✅ Manage | ✅ View | ❌ | ❌ | ❌ |
| Staff Management | ✅ Manage | ✅ Manage | ✅ Manage | ❌ | ❌ | ❌ |
| Menu Management | ✅ View | ✅ Manage | ✅ Manage | ✅ View | ❌ | ❌ |
| Order Management | ✅ View | ✅ Manage | ✅ Manage | ✅ View | ✅ View | ❌ |
| Table Management | ✅ View | ✅ Manage | ✅ Manage | ❌ | ✅ View | ❌ |
| Customer Feedback | ✅ View | ✅ Manage | ✅ Manage | ❌ | ✅ View | ❌ |
| Reports | ✅ View | ✅ Manage | ✅ View | ❌ | ❌ | ❌ |
| Settings | ✅ View | ✅ Manage | ✅ View | ❌ | ❌ | ❌ |
| QR Code Generator | ✅ View | ✅ Manage | ✅ View | ❌ | ❌ | ❌ |
| **Chef Modules** |
| Chef Dashboard | ❌ | ❌ | ❌ | ✅ Manage | ❌ | ❌ |
| Live Orders | ❌ | ❌ | ❌ | ✅ Manage | ❌ | ❌ |
| Order History | ❌ | ❌ | ❌ | ✅ View | ❌ | ❌ |
| Chef Profile | ❌ | ❌ | ❌ | ✅ Update | ❌ | ❌ |
| **Customer Modules** |
| Customer Menu | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ View |
| Customer Order | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ Manage |
| **Common Modules** |
| Profile | ✅ Update | ✅ Update | ✅ Update | ✅ Update | ✅ Update | ✅ Update |
| Notifications | ✅ View | ✅ View | ✅ View | ✅ View | ✅ View | ✅ View |

## User Creation Permissions

### Who can create what roles:

| Creator Role | Can Create |
|--------------|------------|
| Super Admin | Admin, Manager, Chef, Waiter |
| Admin | Manager, Chef, Waiter |
| Manager | Chef, Waiter |
| Chef | ❌ None |
| Waiter | ❌ None |
| Customer | ❌ None |

## Navigation Menu Structure

### Super Admin Menu
- Dashboard
- Restaurant Management
- Admin Users
- Platform Settings
- Reports

### Admin Menu
- Dashboard
- Staff Management
- Menu Management
- Order Management
- Table Management
- Customer Feedback
- Reports
- Settings

### Manager Menu
- Dashboard
- Staff Management
- Menu Management
- Order Management
- Table Management
- Customer Feedback
- Reports

### Chef Menu
- Dashboard
- Live Orders
- Order History
- Profile

### Waiter Menu
- Orders
- Tables
- Feedback

## Implementation Details

### Frontend Implementation
- Role matrix defined in `src/utils/roleMatrix.js`
- Permission checking functions: `canAccess()`, `canCreate()`, `canUpdate()`, `canDelete()`, `canManage()`
- Protected routes using `ProtectedRoute` component
- Dynamic navigation based on user role

### Backend Implementation
- Role-based guards using `@Roles()` decorator
- User creation permissions enforced in controller
- Restaurant-scoped access for non-super admin users
- JWT tokens include user role and restaurant ID

### Security Features
- Role-based route protection
- API endpoint authorization
- Restaurant-scoped data access
- Permission hierarchy enforcement
- Session management with JWT

## Usage Examples

### Frontend Permission Checking
```javascript
import { canAccess, canManage, MODULES } from '../utils/roleMatrix';

// Check if user can access a module
if (canAccess(user.role, MODULES.STAFF_MANAGEMENT)) {
  // Show staff management UI
}

// Check if user can manage a module
if (canManage(user.role, MODULES.ORDER_MANAGEMENT)) {
  // Show full order management features
}
```

### Backend Route Protection
```typescript
@Post()
@Roles(UserRole.ADMIN, UserRole.MANAGER)
async createStaff(@Body() createUserDto: any) {
  // Only admins and managers can create staff
}
```

### Protected Route Usage
```javascript
<ProtectedRoute requiredModule={MODULES.STAFF_MANAGEMENT}>
  <StaffManagement />
</ProtectedRoute>
```

## Best Practices

1. **Always check permissions** before showing UI elements
2. **Use role-based navigation** to show only relevant menu items
3. **Implement server-side validation** for all API endpoints
4. **Log access attempts** for security monitoring
5. **Regular permission audits** to ensure proper access control
6. **Use descriptive error messages** for access denied scenarios

## Security Considerations

1. **JWT Token Security**: Tokens include role and restaurant ID
2. **API Rate Limiting**: Prevent abuse of authentication endpoints
3. **Session Management**: Proper logout and token invalidation
4. **Input Validation**: Validate all user inputs on both frontend and backend
5. **Audit Logging**: Log all sensitive operations for compliance
6. **Regular Security Updates**: Keep dependencies updated

## Troubleshooting

### Common Issues

1. **Access Denied Errors**
   - Check user role in JWT token
   - Verify module permissions in role matrix
   - Ensure proper route protection

2. **Navigation Issues**
   - Verify user role is correctly set
   - Check navigation menu configuration
   - Ensure proper route definitions

3. **API Permission Errors**
   - Verify backend role guards
   - Check user creation permissions
   - Ensure restaurant scoping is correct

### Debug Tools

1. **Role Matrix Debugger**: Use browser console to check permissions
2. **JWT Token Inspector**: Decode tokens to verify user data
3. **API Response Logging**: Monitor backend permission checks
4. **Frontend State Inspection**: Check AuthContext for user data

## Future Enhancements

1. **Dynamic Permissions**: Database-driven permission system
2. **Role Templates**: Predefined role configurations
3. **Permission Groups**: Group-based access control
4. **Time-based Access**: Temporary permission grants
5. **Audit Dashboard**: Comprehensive access logging
6. **Multi-tenant Support**: Enhanced restaurant isolation 