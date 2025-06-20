import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Check if we have any departments
    const departments = await pb.collection('departments').getFullList();
    console.log('Current departments:', departments);

    if (departments.length === 0) {
      console.log('No departments found. Creating sample departments...');
      
      const sampleDepartments = [
        {
          name: 'Computer Science',
          code: 'CS',
          description: 'Department of Computer Science and Engineering'
        },
        {
          name: 'Mathematics',
          code: 'MATH',
          description: 'Department of Mathematics and Statistics'
        },
        {
          name: 'Physics',
          code: 'PHYS',
          description: 'Department of Physics and Astronomy'
        },
        {
          name: 'Engineering',
          code: 'ENG',
          description: 'Department of Engineering'
        },
        {
          name: 'Business',
          code: 'BUS',
          description: 'School of Business and Economics'
        }
      ];

      for (const dept of sampleDepartments) {
        try {
          const created = await pb.collection('departments').create(dept);
          console.log(`Created department: ${created.name}`);
        } catch (error) {
          console.error(`Failed to create department ${dept.name}:`, error.message);
        }
      }
    }

    // Check if we have any users with lecturer role
    const lecturers = await pb.collection('users').getFullList({
      filter: 'role = "lecturer"'
    });
    console.log('Current lecturers:', lecturers);

    if (lecturers.length === 0) {
      console.log('No lecturers found. You may need to create a lecturer account first.');
    }

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase(); 