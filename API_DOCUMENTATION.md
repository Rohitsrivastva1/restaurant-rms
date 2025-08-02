# Restaurant Management System - API Documentation

## Overview
This document outlines all the API endpoints required for the Smart Restaurant Management System. The system supports multiple roles: SuperAdmin, Admin (Restaurant Owner/Manager), Chef, and Customer.

## Base URL
```
https://api.restaurant-rms.com/v1
```

## Authentication
All API requests (except customer endpoints) require authentication using JWT tokens.

### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 1. Authentication APIs

### 1.1 Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@restaurant.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Restaurant Manager",
    "email": "admin@restaurant.com",
    "role": "admin",
    "restaurantId": 5
  }
}
```

### 1.2 Register Restaurant (SuperAdmin)
```http
POST /auth/register-restaurant
```

**Request Body:**
```json
{
  "restaurantName": "Spice Garden",
  "ownerName": "John Doe",
  "email": "owner@spicegarden.com",
  "phone": "+91 98765 43210",
  "address": "123 Main Street, Mumbai",
  "cuisine": "Indian",
  "capacity": 50
}
```

## 2. SuperAdmin APIs

### 2.1 Dashboard Statistics
```http
GET /superadmin/dashboard
```

**Response:**
```json
{
  "totalRestaurants": 60,
  "pendingVerifications": 12,
  "activeRestaurants": 45,
  "totalOrdersToday": 1234,
  "orderTrend": [
    {"day": "Mon", "orders": 45},
    {"day": "Tue", "orders": 52}
  ],
  "restaurantStatus": [
    {"status": "active", "count": 45},
    {"status": "pending", "count": 12},
    {"status": "suspended", "count": 3}
  ]
}
```

### 2.2 Restaurant Management

#### 2.2.1 Get All Restaurants
```http
GET /superadmin/restaurants
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (active, pending, suspended)
- `search`: Search by name or email

**Response:**
```json
{
  "restaurants": [
    {
      "id": 1,
      "name": "Spice Garden",
      "email": "contact@spicegarden.com",
      "phone": "+91 98765 43210",
      "location": "Mumbai, Maharashtra",
      "status": "pending",
      "admins": 2,
      "totalOrders": 156,
      "menuCount": 45,
      "registeredDate": "2024-01-15"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 60,
    "pages": 6
  }
}
```

#### 2.2.2 Approve Restaurant
```http
PUT /superadmin/restaurants/{id}/approve
```

#### 2.2.3 Suspend Restaurant
```http
PUT /superadmin/restaurants/{id}/suspend
```

### 2.3 Admin User Management

#### 2.3.1 Get All Admins
```http
GET /superadmin/admins
```

#### 2.3.2 Create Admin
```http
POST /superadmin/admins
```

**Request Body:**
```json
{
  "name": "New Admin",
  "email": "admin@restaurant.com",
  "phone": "+91 98765 43211",
  "restaurantId": 5,
  "role": "admin"
}
```

#### 2.3.3 Reset Admin Password
```http
PUT /superadmin/admins/{id}/reset-password
```

### 2.4 Platform Settings

#### 2.4.1 Get Platform Settings
```http
GET /superadmin/settings
```

**Response:**
```json
{
  "razorpay": {
    "keyId": "rzp_test_...",
    "keySecret": "encrypted_secret"
  },
  "notifications": {
    "twilio": {
      "accountSid": "AC...",
      "authToken": "encrypted_token"
    },
    "firebase": {
      "serverKey": "encrypted_key"
    }
  },
  "support": {
    "email": "support@platform.com",
    "phone": "+91 98765 43210"
  }
}
```

#### 2.4.2 Update Platform Settings
```http
PUT /superadmin/settings
```

## 3. Admin (Restaurant) APIs

### 3.1 Dashboard Statistics
```http
GET /admin/dashboard
```

**Response:**
```json
{
  "todayOrders": 156,
  "todayRevenue": 12450,
  "activeTables": "3/5",
  "kitchenOrders": 8,
  "orderTrend": [
    {"time": "9AM", "orders": 12},
    {"time": "10AM", "orders": 18}
  ],
  "topItems": [
    {
      "name": "Butter Chicken",
      "sales": 45,
      "revenue": 2250
    }
  ],
  "tableStatus": [
    {
      "table": "Table 1",
      "status": "occupied",
      "orders": 2
    }
  ]
}
```

### 3.2 Menu Management

#### 3.2.1 Get Menu Items
```http
GET /admin/menu
```

**Query Parameters:**
- `category`: Filter by category
- `search`: Search by name
- `available`: Filter by availability

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Butter Chicken",
      "category": "Main Course",
      "price": 450,
      "description": "Creamy and rich butter chicken",
      "image": "https://...",
      "available": true,
      "veg": false,
      "spicyLevel": 2,
      "ingredients": ["Chicken", "Butter", "Cream"]
    }
  ]
}
```

#### 3.2.2 Create Menu Item
```http
POST /admin/menu
```

**Request Body:**
```json
{
  "name": "New Dish",
  "category": "Main Course",
  "price": 350,
  "description": "Delicious new dish",
  "veg": true,
  "spicyLevel": 1,
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "image": "base64_encoded_image"
}
```

#### 3.2.3 Update Menu Item
```http
PUT /admin/menu/{id}
```

#### 3.2.4 Delete Menu Item
```http
DELETE /admin/menu/{id}
```

#### 3.2.5 Toggle Item Availability
```http
PUT /admin/menu/{id}/toggle-availability
```

### 3.3 Table Management

#### 3.3.1 Get Tables
```http
GET /admin/tables
```

**Response:**
```json
{
  "tables": [
    {
      "id": 1,
      "number": "Table 1",
      "capacity": 4,
      "status": "occupied",
      "currentOrder": {
        "id": 123,
        "items": 3,
        "total": 890
      },
      "qrCode": "https://restaurant.com/order?table=1"
    }
  ]
}
```

#### 3.3.2 Create Table
```http
POST /admin/tables
```

**Request Body:**
```json
{
  "number": "Table 6",
  "capacity": 6,
  "location": "Window Side"
}
```

#### 3.3.3 Update Table Status
```http
PUT /admin/tables/{id}/status
```

**Request Body:**
```json
{
  "status": "free"
}
```

### 3.4 Order Management

#### 3.4.1 Get Orders
```http
GET /admin/orders
```

**Query Parameters:**
- `status`: Filter by status (received, in_progress, ready, served)
- `table`: Filter by table number
- `date`: Filter by date

**Response:**
```json
{
  "orders": [
    {
      "id": 123,
      "tableNumber": 3,
      "items": [
        {
          "id": 1,
          "name": "Butter Chicken",
          "quantity": 2,
          "price": 450,
          "notes": "Extra spicy"
        }
      ],
      "status": "received",
      "totalAmount": 1250,
      "timestamp": "2024-01-15T10:30:00Z",
      "estimatedTime": 15
    }
  ]
}
```

#### 3.4.2 Update Order Status
```http
PUT /admin/orders/{id}/status
```

**Request Body:**
```json
{
  "status": "in_progress",
  "assignedChef": "chef_id"
}
```

### 3.5 Staff Management

#### 3.5.1 Get Staff
```http
GET /admin/staff
```

#### 3.5.2 Create Staff Member
```http
POST /admin/staff
```

**Request Body:**
```json
{
  "name": "Chef John",
  "email": "chef@restaurant.com",
  "phone": "+91 98765 43212",
  "role": "chef",
  "specialization": "Indian Cuisine"
}
```

### 3.6 Reports

#### 3.6.1 Revenue Report
```http
GET /admin/reports/revenue
```

**Query Parameters:**
- `period`: daily, weekly, monthly
- `startDate`: Start date
- `endDate`: End date

**Response:**
```json
{
  "totalRevenue": 125000,
  "orderCount": 450,
  "averageOrderValue": 278,
  "trend": [
    {"date": "2024-01-01", "revenue": 4500},
    {"date": "2024-01-02", "revenue": 5200}
  ]
}
```

#### 3.6.2 Menu Performance Report
```http
GET /admin/reports/menu-performance
```

### 3.7 Customer Feedback

#### 3.7.1 Get Feedback
```http
GET /admin/feedback
```

**Response:**
```json
{
  "feedback": [
    {
      "id": 1,
      "orderId": 123,
      "rating": 4.5,
      "comment": "Great food and service!",
      "dish": "Butter Chicken",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## 4. Chef APIs

### 4.1 Live Orders
```http
GET /chef/orders
```

**Response:**
```json
{
  "orders": [
    {
      "id": 123,
      "tableNumber": 3,
      "items": [
        {
          "name": "Butter Chicken",
          "quantity": 2,
          "notes": "Extra spicy"
        }
      ],
      "status": "received",
      "timestamp": "2024-01-15T10:30:00Z",
      "totalAmount": 1250,
      "estimatedTime": 15
    }
  ]
}
```

### 4.2 Update Order Status
```http
PUT /chef/orders/{id}/status
```

**Request Body:**
```json
{
  "status": "in_progress"
}
```

### 4.3 Order History
```http
GET /chef/orders/history
```

## 5. Customer APIs

### 5.1 Get Menu (Public)
```http
GET /customer/menu
```

**Query Parameters:**
- `table`: Table number
- `category`: Filter by category
- `search`: Search items

**Response:**
```json
{
  "restaurant": {
    "name": "Spice Garden",
    "logo": "https://...",
    "description": "Authentic Indian Cuisine"
  },
  "menu": [
    {
      "id": 1,
      "name": "Butter Chicken",
      "category": "Main Course",
      "price": 450,
      "description": "Creamy and rich butter chicken",
      "image": "https://...",
      "available": true,
      "veg": false,
      "spicyLevel": 2,
      "rating": 4.5,
      "popular": true
    }
  ]
}
```

### 5.2 Place Order (Public)
```http
POST /customer/orders
```

**Request Body:**
```json
{
  "tableNumber": 5,
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "notes": "Extra spicy"
    }
  ],
  "customerName": "John Doe",
  "phone": "+91 98765 43210"
}
```

**Response:**
```json
{
  "orderId": "ORD123456",
  "totalAmount": 1250,
  "estimatedTime": 15,
  "paymentUrl": "https://razorpay.com/...",
  "status": "received"
}
```

### 5.3 Get Order Status (Public)
```http
GET /customer/orders/{orderId}/status
```

**Response:**
```json
{
  "orderId": "ORD123456",
  "status": "in_progress",
  "estimatedTime": 10,
  "timestamp": "2024-01-15T10:30:00Z",
  "items": [
    {
      "name": "Butter Chicken",
      "quantity": 2,
      "status": "preparing"
    }
  ]
}
```

### 5.4 Submit Feedback (Public)
```http
POST /customer/orders/{orderId}/feedback
```

**Request Body:**
```json
{
  "rating": 4.5,
  "comment": "Great food and service!",
  "dishRatings": [
    {
      "dishId": 1,
      "rating": 5
    }
  ]
}
```

## 6. Payment Integration

### 6.1 Create Payment Intent
```http
POST /payments/create-intent
```

**Request Body:**
```json
{
  "orderId": "ORD123456",
  "amount": 1250,
  "currency": "INR",
  "customerEmail": "customer@email.com"
}
```

**Response:**
```json
{
  "paymentIntentId": "pi_...",
  "clientSecret": "pi_..._secret_...",
  "razorpayOrderId": "order_..."
}
```

### 6.2 Payment Webhook
```http
POST /payments/webhook
```

**Request Body:**
```json
{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_...",
        "amount": 1250,
        "currency": "INR",
        "order_id": "order_..."
      }
    }
  }
}
```

## 7. Notification APIs

### 7.1 Send SMS
```http
POST /notifications/sms
```

**Request Body:**
```json
{
  "to": "+91 98765 43210",
  "message": "Your order is ready!",
  "template": "order_ready"
}
```

### 7.2 Send Push Notification
```http
POST /notifications/push
```

**Request Body:**
```json
{
  "tokens": ["device_token_1", "device_token_2"],
  "title": "Order Update",
  "body": "Your order is being prepared",
  "data": {
    "orderId": "ORD123456",
    "status": "in_progress"
  }
}
```

## Error Responses

All APIs return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  }
}
```

## Common Error Codes

- `AUTHENTICATION_ERROR`: Invalid or missing token
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid request data
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- Customer APIs: 100 requests per minute
- Admin APIs: 1000 requests per minute
- SuperAdmin APIs: 500 requests per minute

## WebSocket Events

### Real-time Order Updates
```javascript
// Subscribe to order updates
socket.emit('subscribe', { tableNumber: 5 });

// Receive order updates
socket.on('order_update', (data) => {
  console.log('Order updated:', data);
});

// Events:
// - order_received
// - order_in_progress
// - order_ready
// - order_served
```

### Kitchen Display System
```javascript
// Subscribe to kitchen updates
socket.emit('subscribe_kitchen', { restaurantId: 5 });

// Receive kitchen updates
socket.on('kitchen_update', (data) => {
  console.log('Kitchen update:', data);
});
```

## Testing

### Test Data
```json
{
  "testRestaurant": {
    "id": 1,
    "name": "Spice Garden",
    "email": "test@spicegarden.com"
  },
  "testAdmin": {
    "email": "admin@test.com",
    "password": "test123"
  },
  "testChef": {
    "email": "chef@test.com",
    "password": "test123"
  }
}
```

### Sample API Calls

```bash
# Login as admin
curl -X POST https://api.restaurant-rms.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "test123", "role": "admin"}'

# Get menu items
curl -X GET https://api.restaurant-rms.com/v1/admin/menu \
  -H "Authorization: Bearer YOUR_TOKEN"

# Place order
curl -X POST https://api.restaurant-rms.com/v1/customer/orders \
  -H "Content-Type: application/json" \
  -d '{"tableNumber": 5, "items": [{"id": 1, "quantity": 2}]}'
```

This API documentation covers all the endpoints needed for the complete restaurant management system. Each endpoint includes request/response examples and proper error handling. 