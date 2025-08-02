import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  QrCode,
  Printer,
  FileDown,
  MapPin,
  Users,
  CheckCircle,
  XCircle
} from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';

const TableManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [editingTable, setEditingTable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for tables
  const [tables, setTables] = useState([
    {
      id: 1,
      name: 'Table 1',
      number: 'T001',
      capacity: 4,
      area: 'Main Hall',
      status: 'active',
      qrCode: 'https://restaurant.com/order?table=1&restaurantId=abc123',
      lastOrder: '2024-01-15 14:30',
      totalOrders: 45
    },
    {
      id: 2,
      name: 'VIP Table 1',
      number: 'VIP001',
      capacity: 6,
      area: 'VIP Section',
      status: 'active',
      qrCode: 'https://restaurant.com/order?table=2&restaurantId=abc123',
      lastOrder: '2024-01-15 16:45',
      totalOrders: 23
    },
    {
      id: 3,
      name: 'Table 2',
      number: 'T002',
      capacity: 2,
      area: 'Main Hall',
      status: 'active',
      qrCode: 'https://restaurant.com/order?table=3&restaurantId=abc123',
      lastOrder: '2024-01-15 13:15',
      totalOrders: 67
    },
    {
      id: 4,
      name: 'Outdoor Table 1',
      number: 'OUT001',
      capacity: 8,
      area: 'Outdoor',
      status: 'inactive',
      qrCode: 'https://restaurant.com/order?table=4&restaurantId=abc123',
      lastOrder: '2024-01-14 20:30',
      totalOrders: 12
    },
    {
      id: 5,
      name: 'Table 3',
      number: 'T003',
      capacity: 4,
      area: 'Main Hall',
      status: 'active',
      qrCode: 'https://restaurant.com/order?table=5&restaurantId=abc123',
      lastOrder: '2024-01-15 15:20',
      totalOrders: 34
    }
  ]);

  const [newTable, setNewTable] = useState({
    name: '',
    number: '',
    capacity: 4,
    area: 'Main Hall',
    status: 'active'
  });

  const areas = ['Main Hall', 'VIP Section', 'Outdoor', 'AC Room', 'Bar Area'];
  const capacities = [2, 4, 6, 8, 10, 12];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAreaColor = (area) => {
    switch (area) {
      case 'VIP Section': return 'bg-purple-100 text-purple-800';
      case 'Outdoor': return 'bg-blue-100 text-blue-800';
      case 'AC Room': return 'bg-indigo-100 text-indigo-800';
      case 'Bar Area': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTables = tables.filter(table => {
    const matchesSearch = table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         table.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || table.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: 'Total Tables',
      value: tables.length,
      color: 'bg-blue-500',
      icon: MapPin
    },
    {
      title: 'Active Tables',
      value: tables.filter(t => t.status === 'active').length,
      color: 'bg-green-500',
      icon: CheckCircle
    },
    {
      title: 'Total Capacity',
      value: tables.reduce((sum, t) => sum + t.capacity, 0),
      color: 'bg-purple-500',
      icon: Users
    },
    {
      title: 'Inactive Tables',
      value: tables.filter(t => t.status === 'inactive').length,
      color: 'bg-red-500',
      icon: XCircle
    }
  ];

  const handleAddTable = () => {
    if (!newTable.name || !newTable.number) {
      alert('Please fill in all required fields');
      return;
    }

    const table = {
      id: Date.now(),
      ...newTable,
      qrCode: `https://restaurant.com/order?table=${newTable.number}&restaurantId=abc123`,
      lastOrder: null,
      totalOrders: 0
    };

    setTables([...tables, table]);
    setNewTable({
      name: '',
      number: '',
      capacity: 4,
      area: 'Main Hall',
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleEditTable = (table) => {
    setEditingTable(table);
    setShowAddModal(true);
  };

  const handleUpdateTable = () => {
    if (!editingTable.name || !editingTable.number) {
      alert('Please fill in all required fields');
      return;
    }

    setTables(tables.map(t => 
      t.id === editingTable.id ? editingTable : t
    ));
    setEditingTable(null);
    setShowAddModal(false);
  };

  const handleDeleteTable = (tableId) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      setTables(tables.filter(t => t.id !== tableId));
    }
  };

  const handleDownloadQR = (table) => {
    setIsLoading(true);
    
    // Use the CDN version of qrcode.js for download
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
    script.onload = () => {
      // Create canvas element
      const canvas = document.createElement('canvas');
      
      // Generate QR code using the CDN library
      window.QRCode.toCanvas(canvas, table.qrCode, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, function (error) {
        if (error) {
          console.error('QR Code generation error:', error);
          alert('Failed to generate QR code');
          setIsLoading(false);
          return;
        }
        
        // Download the canvas as PNG
        const link = document.createElement('a');
        link.download = `QR_${table.name.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        setIsLoading(false);
      });
    };
    
    script.onerror = () => {
      alert('Failed to load QR code library');
      setIsLoading(false);
    };
    
    document.head.appendChild(script);
  };

  const handleBulkDownload = () => {
    setIsLoading(true);
    
    // For now, we'll download each QR code individually
    // In a real implementation, you'd use a library like JSZip
    const activeTables = tables.filter(t => t.status === 'active');
    
    if (activeTables.length === 0) {
      alert('No active tables to download QR codes for.');
      setIsLoading(false);
      return;
    }
    
    // Download each QR code one by one
    activeTables.forEach((table, index) => {
      setTimeout(() => {
        handleDownloadQR(table);
      }, index * 500); // Stagger downloads by 500ms
    });
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`Downloaded QR codes for ${activeTables.length} active tables!`);
    }, activeTables.length * 500 + 1000);
  };

  const handlePrintQR = (table) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${table.name}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 20px;
              margin: 0;
            }
            .qr-container {
              display: inline-block;
              padding: 20px;
              border: 2px solid #333;
              border-radius: 10px;
              background: white;
            }
            .table-info {
              margin-top: 15px;
              font-size: 14px;
              color: #666;
            }
            @media print {
              body { margin: 0; }
              .qr-container { border: none; }
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <div id="qrcode"></div>
            <div class="table-info">
              <strong>${table.name}</strong><br>
              Table: ${table.number}<br>
              Capacity: ${table.capacity} seats<br>
              Area: ${table.area}
            </div>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
          <script>
            QRCode.toCanvas(document.getElementById('qrcode'), '${table.qrCode}', {
              width: 300,
              margin: 2,
              color: {
                dark: '#000000',
                light: '#FFFFFF'
              }
            }, function (error) {
              if (error) console.error(error);
              setTimeout(() => window.print(), 500);
            });
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Table & QR Code Management</h1>
          <p className="text-gray-600">Manage restaurant tables and generate QR codes for customer ordering</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleBulkDownload}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2 disabled:opacity-50"
          >
            <FileDown className="w-5 h-5" />
            <span>Bulk Download QR</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Table</span>
          </button>
        </div>
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
                placeholder="Search tables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="reserved">Reserved</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTables.map((table) => (
          <div 
            key={table.id} 
            className="bg-white rounded-lg shadow-lg border-2 hover:shadow-xl transition-shadow"
          >
            {/* Table Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{table.name}</h3>
                  <p className="text-sm text-gray-600">{table.number}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedTable(table);
                      setShowQRModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                    title="View QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditTable(table)}
                    className="text-green-600 hover:text-green-900"
                    title="Edit Table"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTable(table.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Table"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                  {table.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAreaColor(table.area)}`}>
                  {table.area}
                </span>
              </div>
            </div>

            {/* Table Content */}
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacity:</span>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm font-medium text-gray-900">{table.capacity} seats</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Orders:</span>
                  <span className="text-sm font-medium text-gray-900">{table.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Order:</span>
                  <span className="text-sm text-gray-900">
                    {table.lastOrder ? new Date(table.lastOrder).toLocaleDateString() : 'Never'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">QR URL:</span>
                  <span className="text-xs text-gray-500 truncate max-w-32">
                    {table.qrCode.split('?')[0]}...
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleDownloadQR(table)}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
                >
                  <Download className="w-4 h-4 inline mr-1" />
                  Download QR
                </button>
                <button 
                  onClick={() => handlePrintQR(table)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm"
                >
                  <Printer className="w-4 h-4 inline mr-1" />
                  Print QR
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTable ? 'Edit Table' : 'Add New Table'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table Name *
                  </label>
                  <input
                    type="text"
                    value={editingTable ? editingTable.name : newTable.name}
                    onChange={(e) => {
                      if (editingTable) {
                        setEditingTable({...editingTable, name: e.target.value});
                      } else {
                        setNewTable({...newTable, name: e.target.value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Table 1, VIP Table"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table Number *
                  </label>
                  <input
                    type="text"
                    value={editingTable ? editingTable.number : newTable.number}
                    onChange={(e) => {
                      if (editingTable) {
                        setEditingTable({...editingTable, number: e.target.value});
                      } else {
                        setNewTable({...newTable, number: e.target.value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., T001, VIP001"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity
                  </label>
                  <select
                    value={editingTable ? editingTable.capacity : newTable.capacity}
                    onChange={(e) => {
                      if (editingTable) {
                        setEditingTable({...editingTable, capacity: parseInt(e.target.value)});
                      } else {
                        setNewTable({...newTable, capacity: parseInt(e.target.value)});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {capacities.map(cap => (
                      <option key={cap} value={cap}>{cap} seats</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area/Zone
                  </label>
                  <select
                    value={editingTable ? editingTable.area : newTable.area}
                    onChange={(e) => {
                      if (editingTable) {
                        setEditingTable({...editingTable, area: e.target.value});
                      } else {
                        setNewTable({...newTable, area: e.target.value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingTable ? editingTable.status : newTable.status}
                    onChange={(e) => {
                      if (editingTable) {
                        setEditingTable({...editingTable, status: e.target.value});
                      } else {
                        setNewTable({...newTable, status: e.target.value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={editingTable ? handleUpdateTable : handleAddTable}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  {editingTable ? 'Update Table' : 'Create Table'}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTable(null);
                    setNewTable({
                      name: '',
                      number: '',
                      capacity: 4,
                      area: 'Main Hall',
                      status: 'active'
                    });
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Preview Modal */}
      {showQRModal && selectedTable && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">QR Code Preview</h3>
              
              <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <QRCodeGenerator 
                  value={selectedTable.qrCode}
                  size={200}
                  tableName={selectedTable.name}
                />
              </div>
              
              <div className="text-left mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Table:</strong> {selectedTable.name} ({selectedTable.number})
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>QR URL:</strong> {selectedTable.qrCode}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Capacity:</strong> {selectedTable.capacity} seats
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDownloadQR(selectedTable)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 inline mr-1" />
                  Download
                </button>
                <button
                  onClick={() => handlePrintQR(selectedTable)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  <Printer className="w-4 h-4 inline mr-1" />
                  Print
                </button>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
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

export default TableManagement; 