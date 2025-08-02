# 🍽️ Smart Restaurant Management System

A comprehensive React-based restaurant management system with role-based access control, real-time order tracking, customer self-service via QR codes, and complete table management system.

## ✨ Features

### 🔑 Role-Based Access Control
- **👑 SuperAdmin**: Platform owner managing all restaurants and admin users
- **🧑‍💼 Admin/Manager**: Restaurant owner/manager with full restaurant control
- **👨‍🍳 Chef**: Kitchen staff with order management and performance tracking
- **👥 Customer**: Self-service ordering via QR codes

### 🎯 Key Functionalities

#### SuperAdmin Panel
- **Dashboard**: Platform-wide analytics and statistics
- **Restaurant Management**: Add, edit, and manage restaurants
- **Admin User Management**: Create and manage admin users
- **Platform Settings**: Configure system-wide settings
- **Reports**: Comprehensive platform analytics

#### Admin (Restaurant Manager) Panel
- **Dashboard**: Real-time analytics with order trends
- **Menu Management**: Full CRUD operations for menu items
- **Table & QR Management**: Create tables, generate QR codes, download/print
- **Order Management**: Track and manage all orders
- **Staff Management**: Manage restaurant staff
- **Reports**: Revenue analytics and performance metrics
- **Customer Feedback**: Manage reviews and ratings
- **Settings**: Restaurant-specific configurations

#### Chef Panel (Kitchen Display System)
- **Live Orders**: Real-time order queue with status updates
- **Order History**: View completed orders and performance
- **Profile**: Personal performance metrics and achievements

#### Customer Interface
- **QR Code Access**: Scan table QR codes for instant menu access
- **Interactive Menu**: Browse categories with search and filters
- **Shopping Cart**: Add items, adjust quantities, view total
- **Order Placement**: Complete checkout process
- **Table Information**: Shows current table and restaurant details

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/restaurant-rms.git
cd restaurant-rms
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 🎮 Demo Access

### Login Credentials
The system includes a complete authentication system with demo credentials:

#### Admin Access
- **Email**: `admin@restaurant.com`
- **Password**: `admin123`
- **Role**: Admin
- **Access**: Full restaurant management

#### Manager Access
- **Email**: `manager@restaurant.com`
- **Password**: `manager123`
- **Role**: Manager
- **Access**: Same as admin

#### Chef Access
- **Email**: `chef@restaurant.com`
- **Password**: `chef123`
- **Role**: Chef
- **Access**: Kitchen operations

### Customer Interface
Access the customer interface with QR code parameters:
```
http://localhost:3000/customer?table=1&restaurantId=abc123
http://localhost:3000/customer?table=VIP001&restaurantId=abc123
http://localhost:3000/customer?table=T002&restaurantId=abc123
```

**Invalid QR Code**: `http://localhost:3000/customer` (shows error page)

## 📁 Project Structure

```
restaurant-rms/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── DashboardLayout.js
│   │   │   ├── Header.js
│   │   │   └── Sidebar.js
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Logout.js
│   │   │   └── ProtectedRoute.js
│   │   ├── SuperAdmin/
│   │   │   ├── Dashboard.js
│   │   │   ├── RestaurantManagement.js
│   │   │   ├── AdminUserManagement.js
│   │   │   ├── PlatformSettings.js
│   │   │   └── Reports.js
│   │   ├── Admin/
│   │   │   ├── Dashboard.js
│   │   │   ├── MenuManagement.js
│   │   │   ├── TableManagement.js
│   │   │   ├── OrderManagement.js
│   │   │   ├── StaffManagement.js
│   │   │   ├── Reports.js
│   │   │   ├── CustomerFeedback.js
│   │   │   ├── Settings.js
│   │   │   └── QRCodeGenerator.js
│   │   ├── Chef/
│   │   │   ├── LiveOrders.js
│   │   │   ├── OrderHistory.js
│   │   │   └── ChefProfile.js
│   │   └── Customer/
│   │       ├── MenuScreen.js
│   │       └── InvalidTable.js
│   ├── App.js
│   └── index.js
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── API_DOCUMENTATION.md
├── TAILWIND_TROUBLESHOOTING.md
├── TABLE_QR_MANAGEMENT.md
└── README.md
```

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **QR Codes**: qrcode.react
- **Authentication**: JWT with localStorage
- **UI Components**: Headless UI, Heroicons

## 📊 Key Features Explained

### 1. QR Code System
- **Table Management**: Create, edit, delete tables with areas and capacities
- **QR Generation**: Automatic QR code generation for each table
- **Download/Print**: Download QR codes as PNG or print with table info
- **Bulk Operations**: Download all active table QR codes at once
- **URL Format**: `restaurant.com/customer?table=5&restaurantId=abc123`
- **Invalid Handling**: Shows error page for invalid QR codes

### 2. Authentication System
- **Login Page**: Role-based login with demo credentials
- **Protected Routes**: Automatic redirection for unauthorized access
- **Session Management**: localStorage-based user sessions
- **Logout**: Secure logout with session cleanup

### 3. Table Management
- **CRUD Operations**: Full create, read, update, delete for tables
- **Area Management**: Assign tables to different areas (Main Hall, VIP, etc.)
- **Status Tracking**: Active, inactive, reserved status
- **Order Analytics**: Track orders per table
- **QR Integration**: Direct QR code generation and management

### 4. Menu Management
- **Category Organization**: Pizza, Burgers, Salads, Pasta, Desserts, Beverages
- **Image Support**: High-quality food images from Unsplash
- **Pricing**: Dynamic pricing with currency formatting
- **Cart Integration**: Add to cart with quantity management

### 5. Customer Experience
- **QR Code Scanning**: Scan table QR codes for instant access
- **Table Information**: Shows current table number and area
- **Shopping Cart**: Add items, adjust quantities, view total
- **Checkout Process**: Complete order placement
- **Mobile Responsive**: Optimized for mobile devices

### 6. Analytics & Reporting
- **Dashboard Stats**: Real-time statistics and metrics
- **Revenue Tracking**: Sales analytics and trends
- **Order Analytics**: Order performance and timing
- **Staff Performance**: Chef and staff productivity metrics

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://api.restaurant-rms.com/v1
REACT_APP_RAZORPAY_KEY=rzp_test_your_key
REACT_APP_WEBSOCKET_URL=wss://api.restaurant-rms.com
```

### Tailwind CSS Configuration
The project uses Tailwind CSS with custom configuration:
- **Version**: 3.4.0
- **PostCSS**: Configured for optimal build process
- **Custom Colors**: Restaurant-themed color palette
- **Responsive Design**: Mobile-first approach

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop**: Full dashboard experience
- **Tablet**: Touch-friendly admin interfaces
- **Mobile**: Customer ordering and QR scanning
- **Kitchen Displays**: Touch-optimized chef interface

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Different permissions per user role
- **Protected Routes**: Automatic access control
- **Session Management**: Secure user session handling
- **Input Validation**: Form validation and sanitization

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the build folder to Netlify
```

## 📈 Performance Optimization

- **Code Splitting**: React Router-based lazy loading
- **Component Optimization**: Efficient state management
- **Image Optimization**: Optimized food images
- **Bundle Size**: Minimal production bundle
- **Caching**: Browser caching for static assets

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

## 📚 Documentation

- **API Documentation**: `API_DOCUMENTATION.md`
- **Tailwind Troubleshooting**: `TAILWIND_TROUBLESHOOTING.md`
- **Table & QR Management**: `TABLE_QR_MANAGEMENT.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@restaurant-rms.com
- Documentation: [API Documentation](API_DOCUMENTATION.md)

## 🔮 Roadmap

### Phase 2 Features
- [ ] Payment gateway integration (Razorpay)
- [ ] Real-time notifications (WebSocket)
- [ ] Inventory management system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced reporting features

### Phase 3 Features
- [ ] Mobile apps (React Native)
- [ ] AI-powered order predictions
- [ ] Integration with delivery platforms
- [ ] Multi-restaurant chains
- [ ] Advanced POS integration
- [ ] Customer loyalty program

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first styling
- Recharts for beautiful data visualization
- Lucide for the comprehensive icon set
- qrcode.react for QR code generation

---

**Made with ❤️ for the restaurant industry**
