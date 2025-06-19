import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

async function testDashboard() {
  try {
    console.log('Testing dashboard functionality...');
    
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
      
      // Test 3: Get user stats
      const enrollments = await pb.collection('enrollments').getFullList({
        filter: `student = "${authData.record.id}" && status = "enrolled"`
      });
      console.log('✅ User enrollments:', enrollments.length);
      
      // Test 4: Get assignments
      const assignments = await pb.collection('assignments').getFullList({
        filter: `is_published = true`,
        limit: 5
      });
      console.log('✅ Available assignments:', assignments.length);
      
      // Test 5: Get recent activity
      const submissions = await pb.collection('submissions').getFullList({
        filter: `student = "${authData.record.id}"`,
        limit: 5
      });
      console.log('✅ User submissions:', submissions.length);
      
      console.log('\n🎉 Dashboard functionality test completed successfully!');
      console.log('The dashboard should now work without 500 errors.');
      
    } catch (error) {
      console.log('❌ Authentication failed:', error.message);
      console.log('Make sure to run: npm run populate-db');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testDashboard(); 