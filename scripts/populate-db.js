import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

async function populateDatabase() {
  try {
    console.log('Starting database population...');

    // Create admin user if it doesn't exist
    try {
      const adminData = {
        email: 'admin@university.edu',
        password: 'admin123',
        passwordConfirm: 'admin123',
        name: 'System Administrator',
        username: 'admin',
        role: 'admin'
      };
      
      const admin = await pb.collection('users').create(adminData);
      console.log('✅ Admin user created:', admin.email);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️ Admin user already exists');
      } else {
        console.error('❌ Failed to create admin user:', error.message);
      }
    }

    // Create departments
    const departments = [
      { name: 'Computer Science', code: 'CS', description: 'Department of Computer Science and Engineering' },
      { name: 'Mathematics', code: 'MATH', description: 'Department of Mathematics' },
      { name: 'Physics', code: 'PHYS', description: 'Department of Physics' },
      { name: 'Engineering', code: 'ENG', description: 'Department of Engineering' },
      { name: 'Business', code: 'BUS', description: 'School of Business' }
    ];

    for (const dept of departments) {
      try {
        const department = await pb.collection('departments').create(dept);
        console.log(`✅ Department created: ${department.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️ Department already exists: ${dept.name}`);
        } else {
          console.error(`❌ Failed to create department ${dept.name}:`, error.message);
        }
      }
    }

    // Create sample lecturers
    const lecturers = [
      {
        email: 'dr.smith@university.edu',
        password: 'lecturer123',
        passwordConfirm: 'lecturer123',
        name: 'Dr. John Smith',
        username: 'dr.smith',
        role: 'lecturer',
        department: 'Computer Science'
      },
      {
        email: 'prof.jones@university.edu',
        password: 'lecturer123',
        passwordConfirm: 'lecturer123',
        name: 'Prof. Sarah Jones',
        username: 'prof.jones',
        role: 'lecturer',
        department: 'Mathematics'
      },
      {
        email: 'dr.brown@university.edu',
        password: 'lecturer123',
        passwordConfirm: 'lecturer123',
        name: 'Dr. Michael Brown',
        username: 'dr.brown',
        role: 'lecturer',
        department: 'Physics'
      }
    ];

    for (const lecturer of lecturers) {
      try {
        const user = await pb.collection('users').create(lecturer);
        console.log(`✅ Lecturer created: ${user.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️ Lecturer already exists: ${lecturer.name}`);
        } else {
          console.error(`❌ Failed to create lecturer ${lecturer.name}:`, error.message);
        }
      }
    }

    // Create sample students
    const students = [
      {
        email: 'student1@university.edu',
        password: 'student123',
        passwordConfirm: 'student123',
        name: 'Alice Johnson',
        username: 'alice.johnson',
        role: 'student',
        student_id: 'STU001',
        department: 'Computer Science',
        year_of_study: 2
      },
      {
        email: 'student2@university.edu',
        password: 'student123',
        passwordConfirm: 'student123',
        name: 'Bob Wilson',
        username: 'bob.wilson',
        role: 'student',
        student_id: 'STU002',
        department: 'Mathematics',
        year_of_study: 3
      },
      {
        email: 'student3@university.edu',
        password: 'student123',
        passwordConfirm: 'student123',
        name: 'Carol Davis',
        username: 'carol.davis',
        role: 'student',
        student_id: 'STU003',
        department: 'Physics',
        year_of_study: 1
      }
    ];

    for (const student of students) {
      try {
        const user = await pb.collection('users').create(student);
        console.log(`✅ Student created: ${user.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️ Student already exists: ${student.name}`);
        } else {
          console.error(`❌ Failed to create student ${student.name}:`, error.message);
        }
      }
    }

    // Create sample staff
    const staff = [
      {
        email: 'staff1@university.edu',
        password: 'staff123',
        passwordConfirm: 'staff123',
        name: 'David Miller',
        username: 'david.miller',
        role: 'staff',
        department: 'Administration'
      }
    ];

    for (const staffMember of staff) {
      try {
        const user = await pb.collection('users').create(staffMember);
        console.log(`✅ Staff created: ${user.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️ Staff already exists: ${staffMember.name}`);
        } else {
          console.error(`❌ Failed to create staff ${staffMember.name}:`, error.message);
        }
      }
    }

    console.log('✅ Database population completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Admin: admin@university.edu / admin123');
    console.log('Lecturer: dr.smith@university.edu / lecturer123');
    console.log('Student: student1@university.edu / student123');
    console.log('Staff: staff1@university.edu / staff123');

  } catch (error) {
    console.error('❌ Database population failed:', error);
  }
}

// Run the population script
populateDatabase(); 