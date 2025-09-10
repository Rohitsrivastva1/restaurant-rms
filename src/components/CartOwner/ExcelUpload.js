import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle,
  X,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import * as XLSX from 'xlsx';

const ExcelUpload = () => {
  const { cartId } = useParams();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  // Download Excel template
  const downloadTemplate = () => {
    const templateData = [
      {
        'Item Name': 'Chicken Burger',
        'Description': 'Juicy chicken burger with fresh vegetables',
        'Price': 12.99,
        'Category Name': 'Main Dishes',
        'Image URL': 'https://example.com/image.jpg',
        'Available': 'Yes',
        'Vegetarian': 'No',
        'Spicy': 'No',
        'Preparation Time (minutes)': 15,
        'Sort Order': 1
      },
      {
        'Item Name': 'Caesar Salad',
        'Description': 'Fresh romaine lettuce with caesar dressing',
        'Price': 8.99,
        'Category Name': 'Salads',
        'Image URL': '',
        'Available': 'Yes',
        'Vegetarian': 'Yes',
        'Spicy': 'No',
        'Preparation Time (minutes)': 10,
        'Sort Order': 2
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Menu Items');
    
    // Add instructions sheet
    const instructions = [
      ['Instructions for Menu Items Upload'],
      [''],
      ['Required Fields:'],
      ['- Item Name: Name of the menu item (required)'],
      ['- Price: Price of the item (required, numbers only)'],
      ['- Category Name: Name of the category (will be created if not exists)'],
      [''],
      ['Optional Fields:'],
      ['- Description: Description of the item'],
      ['- Image URL: URL to the item image'],
      ['- Available: Yes/No (default: Yes)'],
      ['- Vegetarian: Yes/No (default: No)'],
      ['- Spicy: Yes/No (default: No)'],
      ['- Preparation Time (minutes): Number in minutes (default: 0)'],
      ['- Sort Order: Number for ordering (default: 0)'],
      [''],
      ['Notes:'],
      ['- Categories will be created automatically if they don\'t exist'],
      ['- Use "Yes" or "No" for boolean fields'],
      ['- Remove this instructions sheet before uploading'],
      ['- Maximum 100 items per upload']
    ];
    
    const instructionsWs = XLSX.utils.aoa_to_sheet(instructions);
    XLSX.utils.book_append_sheet(wb, instructionsWs, 'Instructions');
    
    XLSX.writeFile(wb, 'menu-items-template.xlsx');
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setUploadError('Please upload an Excel file (.xlsx or .xls)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Validate data
        const { validData, errors } = validateExcelData(jsonData);
        setValidationErrors(errors);
        setPreviewData(validData);
        setShowPreview(true);
        setUploadError('');
      } catch (error) {
        setUploadError('Error reading Excel file: ' + error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Validate Excel data
  const validateExcelData = (data) => {
    const errors = [];
    const validData = [];

    data.forEach((row, index) => {
      const rowErrors = [];
      const rowNumber = index + 2; // +2 because Excel starts from row 1 and we skip header

      // Required fields validation
      if (!row['Item Name'] || row['Item Name'].toString().trim() === '') {
        rowErrors.push(`Row ${rowNumber}: Item Name is required`);
      }

      if (!row['Price'] || isNaN(parseFloat(row['Price']))) {
        rowErrors.push(`Row ${rowNumber}: Price must be a valid number`);
      }

      // Optional field validation
      if (row['Available'] && !['Yes', 'No', 'yes', 'no', 'Y', 'N', 'y', 'n', '1', '0', true, false].includes(row['Available'])) {
        rowErrors.push(`Row ${rowNumber}: Available must be Yes/No`);
      }

      if (row['Vegetarian'] && !['Yes', 'No', 'yes', 'no', 'Y', 'N', 'y', 'n', '1', '0', true, false].includes(row['Vegetarian'])) {
        rowErrors.push(`Row ${rowNumber}: Vegetarian must be Yes/No`);
      }

      if (row['Spicy'] && !['Yes', 'No', 'yes', 'no', 'Y', 'N', 'y', 'n', '1', '0', true, false].includes(row['Spicy'])) {
        rowErrors.push(`Row ${rowNumber}: Spicy must be Yes/No`);
      }

      if (row['Preparation Time (minutes)'] && isNaN(parseInt(row['Preparation Time (minutes)']))) {
        rowErrors.push(`Row ${rowNumber}: Preparation Time must be a valid number`);
      }

      if (row['Sort Order'] && isNaN(parseInt(row['Sort Order']))) {
        rowErrors.push(`Row ${rowNumber}: Sort Order must be a valid number`);
      }

      if (rowErrors.length === 0) {
        // Convert to API format
        validData.push({
          name: row['Item Name'].toString().trim(),
          description: row['Description'] ? row['Description'].toString().trim() : '',
          price: parseFloat(row['Price']),
          categoryName: row['Category Name'] ? row['Category Name'].toString().trim() : '',
          imageUrl: row['Image URL'] ? row['Image URL'].toString().trim() : '',
          isAvailable: convertToBoolean(row['Available'], true),
          isVegetarian: convertToBoolean(row['Vegetarian'], false),
          isSpicy: convertToBoolean(row['Spicy'], false),
          preparationTime: parseInt(row['Preparation Time (minutes)']) || 0,
          sortOrder: parseInt(row['Sort Order']) || 0
        });
      } else {
        errors.push(...rowErrors);
      }
    });

    return { validData, errors };
  };

  // Convert various formats to boolean
  const convertToBoolean = (value, defaultValue) => {
    if (value === undefined || value === null || value === '') return defaultValue;
    if (typeof value === 'boolean') return value;
    const str = value.toString().toLowerCase();
    return ['yes', 'y', '1', 'true'].includes(str);
  };

  // Upload data to backend
  const uploadData = async () => {
    if (previewData.length === 0) {
      setUploadError('No valid data to upload');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/cart/owner/carts/${cartId}/menu-items/bulk-import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: previewData })
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(`Successfully imported ${result.imported} items. ${result.errors.length} errors.`);
        setPreviewData([]);
        setShowPreview(false);
        setValidationErrors([]);
        
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        const errorData = await response.json();
        setUploadError(errorData.message || 'Upload failed');
      }
    } catch (error) {
      setUploadError('Error uploading data: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Clear preview
  const clearPreview = () => {
    setPreviewData([]);
    setShowPreview(false);
    setValidationErrors([]);
    setUploadError('');
    setUploadStatus('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileSpreadsheet className="h-8 w-8 text-orange-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Excel Menu Upload</h1>
            </div>
            <button
              onClick={downloadTemplate}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Template</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Excel File</h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Upload your menu items Excel file</p>
            <p className="text-sm text-gray-500 mb-4">
              Download the template above, fill it with your menu items, and upload it here
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors mx-auto"
            >
              <Upload className="h-5 w-5" />
              <span>Choose File</span>
            </button>
          </div>

          {/* Status Messages */}
          {uploadStatus && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {uploadStatus}
            </div>
          )}

          {uploadError && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {uploadError}
            </div>
          )}
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Preview Data ({previewData.length} items)
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={clearPreview}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </button>
                <button
                  onClick={uploadData}
                  disabled={uploading || previewData.length === 0}
                  className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="h-4 w-4" />
                  <span>{uploading ? 'Uploading...' : 'Upload All'}</span>
                </button>
              </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                <h4 className="text-sm font-medium text-red-800 mb-2">Validation Errors:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Data Preview Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vegetarian
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spicy
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previewData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.categoryName || 'No category'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isAvailable ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isVegetarian ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isVegetarian ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isSpicy ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isSpicy ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelUpload;
