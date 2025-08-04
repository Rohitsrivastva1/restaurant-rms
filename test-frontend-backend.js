const axios = require('axios');

async function testFrontendBackend() {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Frontend-Backend Connectivity...\n');

    // Test basic connectivity
    console.log('1️⃣ Testing basic connectivity...');
    const response = await axios.get(`${baseURL}/menu?restaurantId=1`);
    console.log('✅ Backend is reachable');
    console.log('📊 Response status:', response.status);
    console.log('📋 Response data structure:', Object.keys(response.data));

    // Test CORS headers
    console.log('\n2️⃣ Testing CORS headers...');
    const corsResponse = await axios.get(`${baseURL}/menu?restaurantId=1`, {
      headers: {
        'Origin': 'http://localhost:3001'
      }
    });
    console.log('✅ CORS headers present');
    console.log('🔒 CORS headers:', corsResponse.headers['access-control-allow-origin']);

    // Test menu data format
    console.log('\n3️⃣ Testing menu data format...');
    if (response.data && response.data.items) {
      console.log('✅ Menu data format is correct');
      console.log('📦 Number of items:', response.data.items.length);
      console.log('🍽️ First item:', response.data.items[0]?.name || 'No items');
    } else {
      console.log('❌ Menu data format is incorrect');
      console.log('📋 Actual response:', response.data);
    }

    console.log('\n🎉 Frontend-Backend connectivity test completed!');
    console.log('💡 If frontend is still failing, check:');
    console.log('   - Frontend is running on http://localhost:3001');
    console.log('   - Network connectivity');
    console.log('   - Browser console for errors');
    
  } catch (error) {
    console.error('❌ Frontend-Backend test failed:', error.response?.data || error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('   - Make sure backend is running on port 3000');
    console.log('   - Check if frontend is running on port 3001');
    console.log('   - Try accessing http://localhost:3000/menu?restaurantId=1 in browser');
  }
}

testFrontendBackend(); 