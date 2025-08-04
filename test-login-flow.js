const axios = require('axios');

async function testLoginFlow() {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Login Flow...\n');

    // Test login with restaurant owner account
    console.log('1️⃣ Testing restaurant owner login...');
    const loginData = {
      email: 'admin@restaurant.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${baseURL}/auth/login`, loginData);
    console.log('✅ Login successful');
    console.log('👤 User role:', loginResponse.data.user.role);
    console.log('🔑 Token received:', !!loginResponse.data.token);

    // Test protected routes with token
    console.log('\n2️⃣ Testing protected routes...');
    const token = loginResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // Test admin dashboard access
    try {
      const dashboardResponse = await axios.get(`${baseURL}/admin/dashboard`, { headers });
      console.log('✅ Admin dashboard accessible');
    } catch (error) {
      console.log('❌ Admin dashboard failed:', error.response?.data || error.message);
    }

    // Test menu management access
    try {
      const menuResponse = await axios.get(`${baseURL}/menu?restaurantId=1`, { headers });
      console.log('✅ Menu management accessible');
    } catch (error) {
      console.log('❌ Menu management failed:', error.response?.data || error.message);
    }

    console.log('\n🎉 Login flow test completed!');
    console.log('💡 If frontend is still having issues, check:');
    console.log('   - Browser console for JavaScript errors');
    console.log('   - Network tab for failed requests');
    console.log('   - Application tab for localStorage issues');
    
  } catch (error) {
    console.error('❌ Login flow test failed:', error.response?.data || error.message);
  }
}

testLoginFlow(); 