import React, { useState, useEffect } from 'react';
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
import { tableAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import QRCodeGenerator from './QRCodeGenerator';
import QRCode from 'qrcode';

const TableManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [editingTable, setEditingTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tables, setTables] = useState([]);

  // Fetch tables from API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await tableAPI.getAll(user?.restaurantId);
        console.log('Tables response:', response.data);
        setTables(response.data?.tables || []);
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    if (user?.restaurantId) {
      fetchTables();
    }
  }, [user?.restaurantId]);

  const [newTable, setNewTable] = useState({
    name: '',
    tableNumber: '',
    capacity: 4,
    area: 'Main Hall',
    status: 'available'
  });

  const areas = ['Main Hall', 'VIP Section', 'Outdoor', 'AC Room', 'Bar Area'];
  const capacities = [2, 4, 6, 8, 10, 12];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'cleaning': return 'bg-blue-100 text-blue-800';
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

  const filteredTables = Array.isArray(tables) ? tables.filter(table => {
    const matchesSearch = (table.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (table.tableNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || table.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) : [];

  const stats = [
    {
      title: 'Total Tables',
      value: Array.isArray(tables) ? tables.length : 0,
      color: 'bg-blue-500',
      icon: MapPin
    },
    {
      title: 'Available Tables',
      value: Array.isArray(tables) ? tables.filter(t => t.status === 'available').length : 0,
      color: 'bg-green-500',
      icon: CheckCircle
    },
    {
      title: 'Total Capacity',
      value: Array.isArray(tables) ? tables.reduce((sum, t) => sum + (t.capacity || 0), 0) : 0,
      color: 'bg-purple-500',
      icon: Users
    },
    {
      title: 'Occupied Tables',
      value: Array.isArray(tables) ? tables.filter(t => t.status === 'occupied').length : 0,
      color: 'bg-red-500',
      icon: XCircle
    }
  ];

  const handleAddTable = async () => {
    if (!newTable.name || !newTable.tableNumber) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const tableData = {
        name: newTable.name,
        tableNumber: newTable.tableNumber, // Map to tableNumber field
        capacity: parseInt(newTable.capacity),
        area: newTable.area,
        status: newTable.status,
        restaurantId: user.restaurantId
      };

      console.log('Creating table with data:', tableData);
      const response = await tableAPI.create(tableData);
      console.log('Created table:', response.data);
      
      setTables(prev => [...prev, response.data]);
      
      setNewTable({
        name: '',
        tableNumber: '',
        capacity: 4,
        area: 'Main Hall',
        status: 'available'
      });
      setShowAddModal(false);
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleEditTable = (table) => {
    setEditingTable(table);
    setShowAddModal(true);
  };

  const handleUpdateTable = async () => {
    if (!editingTable.name || !editingTable.tableNumber) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const tableData = {
        name: editingTable.name,
        tableNumber: editingTable.tableNumber, // Map to tableNumber field
        capacity: parseInt(editingTable.capacity),
        area: editingTable.area,
        status: editingTable.status
      };
      
      console.log('Updating table with data:', tableData);
      const response = await tableAPI.update(editingTable.id, tableData);
      console.log('Updated table:', response.data);
      
      setTables(prev => prev.map(t => 
        t.id === editingTable.id ? response.data : t
      ));
      setEditingTable(null);
      setShowAddModal(false);
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTable = async (tableId) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        setLoading(true);
        await tableAPI.delete(tableId);
        setTables(prev => prev.filter(t => t.id !== tableId));
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    }
  };

  // Test QR code generation
  const testQRGeneration = async () => {
    try {
      console.log('Testing QR code generation...');
      const testURL = 'http://localhost:3001/menu?table=T1&restaurantId=1';
      
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      
      await QRCode.toCanvas(canvas, testURL, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      // Create a simple download
      const link = document.createElement('a');
      link.download = 'test-qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
      
      console.log('Test QR code generated and downloaded successfully');
      alert('Test QR code generated successfully! Check downloads.');
    } catch (error) {
      console.error('Test QR generation failed:', error);
      alert('Test QR generation failed: ' + error.message);
    }
  };

  const handleDownloadQR = async (table) => {
    try {
      setLoading(true);
      
      // Get QR code data from API
      const response = await tableAPI.generateQR(table.id);
      const qrData = response.data.qrData;
      
      console.log('QR Data:', qrData);
      console.log('QR URL:', qrData.url);
      
      // Test QR code generation with a simple URL first
      const testURL = qrData.url || 'http://localhost:3001/menu?table=T1&restaurantId=1';
      console.log('Generating QR for URL:', testURL);
      
      // Generate QR code using the local library
      const qrCanvas = document.createElement('canvas');
      qrCanvas.width = 300;
      qrCanvas.height = 300;
      
      console.log('QRCode library available:', typeof QRCode);
      console.log('QRCode.toCanvas available:', typeof QRCode.toCanvas);
      
      try {
        await QRCode.toCanvas(qrCanvas, testURL, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        console.log('QR Code generated successfully');
      } catch (qrError) {
        console.error('QR Code generation failed:', qrError);
        throw qrError;
      }
      
      // Create a new canvas with QR code and info
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = 400;
      finalCanvas.height = 500;
      const ctx = finalCanvas.getContext('2d');
      
      // Fill background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 400, 500);
      
      // Draw QR code in the center
      ctx.drawImage(qrCanvas, 50, 20, 300, 300);
      console.log('QR code drawn to final canvas');
      
      // Add table info below QR code
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Table: ${table.name}`, 200, 340);
      ctx.fillText(`Number: ${table.tableNumber}`, 200, 360);
      ctx.fillText(`Capacity: ${table.capacity}`, 200, 380);
      
      // Add geofencing info
      ctx.font = '12px Arial';
      ctx.fillText(`📍 Geofence: ${qrData.geofence.radius}m radius`, 200, 400);
      ctx.fillText(`Lat: ${qrData.geofence.latitude}, Lng: ${qrData.geofence.longitude}`, 200, 420);
      
      // Download the canvas as PNG
      const link = document.createElement('a');
      link.download = `QR_${table.name.replace(/\s+/g, '_')}_${table.tableNumber}.png`;
      link.href = finalCanvas.toDataURL();
      link.click();
      
      console.log('QR code downloaded successfully');
      setLoading(false);
    } catch (error) {
      console.error('QR Code generation error:', error);
      setError('Failed to generate QR code: ' + error.message);
      setLoading(false);
    }
  };

  const handleBulkDownload = () => {
    setLoading(true);
    
    // For now, we'll download each QR code individually
    // In a real implementation, you'd use a library like JSZip
    const availableTables = Array.isArray(tables) ? tables.filter(t => t.status === 'available') : [];
    
    if (availableTables.length === 0) {
      alert('No available tables to download QR codes for.');
      setLoading(false);
      return;
    }
    
    // Download each QR code one by one
    availableTables.forEach((table, index) => {
      setTimeout(() => {
        handleDownloadQR(table);
      }, index * 500); // Stagger downloads by 500ms
    });
    
    setTimeout(() => {
      setLoading(false);
      alert(`Downloaded QR codes for ${availableTables.length} available tables!`);
    }, availableTables.length * 500 + 1000);
  };

  const handlePrintQR = async (table) => {
    try {
      // Get QR code data from API
      const response = await tableAPI.generateQR(table.id);
      const qrData = response.data.qrData;
      
      // Generate QR code
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, qrData.url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      // Convert QR code to data URL
      const qrDataURL = qrCanvas.toDataURL();
      
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
                max-width: 400px;
              }
              .table-info {
                margin-top: 15px;
                font-size: 14px;
                color: #666;
              }
              .qr-code {
                margin: 20px auto;
                display: block;
              }
              .url-display {
                background: #f0f0f0;
                padding: 10px;
                margin: 10px 0;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                word-break: break-all;
              }
              @media print {
                body { margin: 0; }
                .qr-container { border: none; }
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h2>Restaurant QR Code</h2>
              <img src="${qrDataURL}" alt="QR Code" class="qr-code" />
              <div class="table-info">
                <strong>${table.name}</strong><br>
                Table: ${table.tableNumber}<br>
                Capacity: ${table.capacity} seats<br>
                Area: ${table.area}
              </div>
              <div style="margin-top: 15px;">
                <strong>Instructions:</strong><br>
                1. Scan the QR code with your phone<br>
                2. Allow location access<br>
                3. Browse menu and place orders
              </div>
              <div class="url-display">
                ${qrData.url}
              </div>
              <div style="margin-top: 10px; font-size: 12px; color: #999;">
                Generated on: ${new Date().toLocaleDateString()}
              </div>
            </div>
            <script>
              setTimeout(() => window.print(), 500);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('Print QR error:', error);
      alert('Failed to generate QR code for printing');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tables...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Error loading tables</div>
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Table & QR Code Management</h1>
          <p className="text-gray-600">Manage restaurant tables and generate QR codes for customer ordering</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={testQRGeneration}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
          >
            <QrCode className="w-5 h-5" />
            <span>Test QR</span>
          </button>
          <button
            onClick={handleBulkDownload}
            disabled={loading}
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
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="cleaning">Cleaning</option>
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
        {tables.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tables found</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first table</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add First Table
              </button>
            </div>
          </div>
        ) : (
          tables.map((table) => (
          <div 
            key={table.id} 
            className="bg-white rounded-lg shadow-lg border-2 hover:shadow-xl transition-shadow"
          >
            {/* Table Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{table.name || 'Unnamed Table'}</h3>
                  <p className="text-sm text-gray-600">{table.tableNumber || 'No Number'}</p>
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
                    {table.lastOrderAt ? new Date(table.lastOrderAt).toLocaleDateString() : 'Never'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">QR URL:</span>
                  <span className="text-xs text-gray-500 truncate max-w-32">
                    {table.qrCodeUrl ? table.qrCodeUrl.split('?')[0] + '...' : 'Not generated'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleDownloadQR(table)}
                  disabled={loading}
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
        ))
        )}
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
                    value={editingTable ? editingTable.tableNumber : newTable.tableNumber}
                    onChange={(e) => {
                      if (editingTable) {
                        setEditingTable({...editingTable, tableNumber: e.target.value});
                      } else {
                        setNewTable({...newTable, tableNumber: e.target.value});
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
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="reserved">Reserved</option>
                    <option value="cleaning">Cleaning</option>
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
                      tableNumber: '',
                      capacity: 4,
                      area: 'Main Hall',
                      status: 'available'
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
                  value={selectedTable.qrCodeUrl || `https://restaurant.com/order?table=${selectedTable.tableNumber}&restaurantId=${user?.restaurantId}`}
                  size={200}
                  tableName={selectedTable.name}
                />
              </div>
              
              <div className="text-left mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Table:</strong> {selectedTable.name || 'Unnamed Table'} ({selectedTable.tableNumber || 'No Number'})
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>QR URL:</strong> {selectedTable.qrCodeUrl || `https://restaurant.com/order?table=${selectedTable.tableNumber}&restaurantId=${user?.restaurantId}`}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Capacity:</strong> {selectedTable.capacity || 0} seats
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