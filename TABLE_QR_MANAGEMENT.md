# Table & QR Code Management System

## 📍 Overview
**Path:** `/admin/tables`  
**Role:** Admin/Manager only  
**Purpose:** Complete table management with QR code generation for customer self-ordering

## 🎯 Core Features

### 1. **Table Management**
- ✅ Create new tables with custom names and numbers
- ✅ Edit existing table details (capacity, area, status)
- ✅ Delete or deactivate tables
- ✅ View all tables with search and filter functionality
- ✅ Track table performance (total orders, last order)

### 2. **QR Code Generation**
- ✅ Auto-generate unique QR codes for each table
- ✅ QR codes link to customer ordering system
- ✅ Download individual QR codes as PNG/PDF
- ✅ Bulk download all QR codes as ZIP file
- ✅ Print QR codes for physical placement

### 3. **Advanced Features**
- ✅ Table status management (Active/Inactive/Reserved)
- ✅ Area/Zone categorization (Main Hall, VIP Section, Outdoor, etc.)
- ✅ Seating capacity configuration (2-12 seats)
- ✅ QR code preview modal
- ✅ Table analytics and usage tracking

## 🖥️ UI Components

### **Header Section**
- Page title and description
- Bulk QR download button
- Add new table button

### **Statistics Cards**
- Total Tables count
- Active Tables count
- Total Capacity (sum of all table capacities)
- Inactive Tables count

### **Search & Filter**
- Search by table name or number
- Filter by status (All, Active, Inactive, Reserved)
- Filter button for additional options

### **Table Grid**
Each table card displays:
- Table name and number
- Status badge (Active/Inactive/Reserved)
- Area/Zone badge
- Seating capacity
- Total orders count
- Last order date
- QR code URL preview
- Action buttons (View QR, Edit, Delete)

### **Action Buttons per Table**
- **View QR Code:** Opens modal with QR preview
- **Download QR:** Downloads QR code as image
- **Print QR:** Prints QR code for physical placement
- **Edit Table:** Opens edit modal
- **Delete Table:** Removes table with confirmation

## 📋 Modal Forms

### **Add/Edit Table Modal**
**Form Fields:**
- **Table Name** (required): e.g., "Table 1", "VIP Table"
- **Table Number** (required): e.g., "T001", "VIP001"
- **Seating Capacity** (optional): 2, 4, 6, 8, 10, 12 seats
- **Area/Zone** (optional): Main Hall, VIP Section, Outdoor, AC Room, Bar Area
- **Status** (optional): Active, Inactive, Reserved

### **QR Code Preview Modal**
- Displays actual QR code image
- Shows table details (name, number, capacity)
- Displays full QR URL
- Download and Print buttons
- Close button

## 🔧 Technical Implementation

### **QR Code URL Structure**
```
https://restaurant.com/order?table={tableNumber}&restaurantId={restaurantId}
```

**Example URLs:**
- `https://restaurant.com/order?table=T001&restaurantId=abc123`
- `https://restaurant.com/order?table=VIP001&restaurantId=abc123`

### **QR Code Generation**
- Uses `qrcode.react` library (when installed)
- Fallback to canvas-based QR placeholder
- Generates unique URLs for each table
- Includes restaurant branding (optional)

### **Data Structure**
```javascript
{
  id: 1,
  name: 'Table 1',
  number: 'T001',
  capacity: 4,
  area: 'Main Hall',
  status: 'active',
  qrCode: 'https://restaurant.com/order?table=T001&restaurantId=abc123',
  lastOrder: '2024-01-15 14:30',
  totalOrders: 45
}
```

## 🚀 Advanced Features (Future Implementation)

### **Bulk Operations**
- ✅ Bulk QR download (ZIP file)
- 🔄 Bulk table status updates
- 🔄 Bulk table area assignments

### **Print Features**
- ✅ Individual QR code printing
- 🔄 Batch QR code printing
- 🔄 Custom print layouts
- 🔄 Restaurant branding on QR codes

### **Analytics & Insights**
- ✅ Table usage tracking
- 🔄 Table performance analytics
- 🔄 Heatmap of table usage
- 🔄 Peak hours analysis

### **Layout Management**
- 🔄 Drag-and-drop table layout editor
- 🔄 Physical table positioning
- 🔄 Floor plan integration
- 🔄 Table arrangement visualization

## 📱 Customer Flow

### **QR Code Scanning Process**
1. Customer scans QR code at table
2. QR code contains table number and restaurant ID
3. Frontend loads menu based on restaurant ID
4. Order is automatically tagged with table number
5. Kitchen receives order with table information
6. Order can be delivered to correct table

### **URL Parameters**
- `table`: Table number/identifier
- `restaurantId`: Unique restaurant identifier
- `menu`: Menu version/date (optional)
- `lang`: Language preference (optional)

## 🛠️ Installation & Setup

### **Required Libraries**
```bash
npm install qrcode.react
npm install html-to-image  # For PNG download
npm install jspdf          # For PDF download
```

### **Component Structure**
```
src/components/Admin/
├── TableManagement.js     # Main table management component
├── QRCodeGenerator.js     # QR code generation component
└── TableForm.js          # Add/Edit table form (optional)
```

## 🔒 Security Considerations

### **QR Code Security**
- QR codes contain only public URLs
- No sensitive data in QR codes
- Restaurant ID is public identifier
- Table numbers are not sensitive

### **Access Control**
- Only admin/manager can access table management
- QR codes are publicly accessible (by design)
- Table editing requires authentication

## 📊 Performance Optimizations

### **QR Code Generation**
- Generate QR codes on-demand
- Cache generated QR codes
- Lazy load QR previews
- Optimize image sizes for download

### **Data Management**
- Paginate table list for large datasets
- Implement virtual scrolling
- Cache table data locally
- Optimize search and filter operations

## 🎨 UI/UX Guidelines

### **Color Scheme**
- **Active Tables:** Green badges
- **Inactive Tables:** Red badges
- **Reserved Tables:** Yellow badges
- **VIP Areas:** Purple badges
- **Outdoor Areas:** Blue badges

### **Responsive Design**
- Mobile-friendly table cards
- Responsive grid layout
- Touch-friendly action buttons
- Optimized modal sizes

### **Accessibility**
- Screen reader support
- Keyboard navigation
- High contrast mode
- Alt text for QR codes

## 🔄 Future Enhancements

### **Real-time Features**
- Live table status updates
- Real-time order notifications
- Live QR code regeneration
- WebSocket integration

### **Integration Features**
- POS system integration
- Payment gateway integration
- Inventory management integration
- Customer feedback integration

### **Analytics Dashboard**
- Table usage analytics
- Customer behavior tracking
- Revenue per table
- Peak hours analysis

## 📝 API Endpoints (Future)

### **Table Management**
```
GET    /api/tables              # Get all tables
POST   /api/tables              # Create new table
PUT    /api/tables/:id          # Update table
DELETE /api/tables/:id          # Delete table
```

### **QR Code Management**
```
GET    /api/tables/:id/qr       # Get QR code for table
POST   /api/tables/bulk-qr      # Generate bulk QR codes
GET    /api/tables/:id/analytics # Get table analytics
```

## 🎯 Success Metrics

### **Usage Metrics**
- Number of tables created
- QR code downloads
- Table status changes
- Order volume per table

### **Performance Metrics**
- Page load time
- QR code generation time
- Search response time
- Modal open/close time

---

## 📞 Support & Maintenance

### **Troubleshooting**
- QR code not generating: Check URL format
- Table not saving: Validate required fields
- Download not working: Check browser permissions
- Print not working: Check printer settings

### **Maintenance Tasks**
- Regular QR code validation
- Table data cleanup
- Performance monitoring
- Security updates

---

*This documentation covers the complete Table & QR Code Management system for restaurant administrators and managers.* 