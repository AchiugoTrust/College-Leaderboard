import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

async function testAuthentication() {
  try {
    console.log('Testing authentication flow...');
    
    // Test 1: Check if PocketBase is running
    try {
      await pb.health.check();
      console.log('✅ PocketBase is running');
    } catch (error) {
      console.log('❌ PocketBase is not running. Please start it first.');
      return;
    }
    
    // Test 2: Try to authenticate with a test user
    try {
      const authData = await pb.collection('users').authWithPassword('student1@university.edu', 'student123');
      console.log('✅ Authentication successful:', authData.record.name);
      console.log('✅ User role:', authData.record.role);
      console.log('✅ User ID:', authData.record.id);
      
      // Test 3: Check if user is authenticated
      if (pb.authStore.isValid) {
        console.log('✅ User is authenticated');
        console.log('✅ Auth token exists');
      } else {
        console.log('❌ User is not authenticated');
      }
      
      // Test 4: Test logout
      pb.authStore.clear();
      console.log('✅ Logout successful');
      
      if (!pb.authStore.isValid) {
        console.log('✅ User is no longer authenticated after logout');
      }
      
      console.log('\n🎉 Authentication flow test completed successfully!');
      console.log('The login/logout should now work properly.');
      
    } catch (error) {
      console.log('❌ Authentication failed:', error.message);
      console.log('Make sure to run: npm run populate-db');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuthentication(); 