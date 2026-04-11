// Create Admin Account Script
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminAccount() {
  try {
    const email = 'admin@123.com';
    const password = 'Khoa1234';
    const role = 'admin';

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      console.log('❌ User with this email already exists!');
      console.log('   Use UPDATE instead:');
      console.log(`   UPDATE users SET role = 'admin' WHERE email = '${email}';`);
      process.exit(1);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        isActive: true,
        profile: {
          create: {
            fullName: 'Administrator',
          }
        }
      },
      include: {
        profile: true
      }
    });

    console.log('✅ Admin account created successfully!');
    console.log('');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Role:', role);
    console.log('🆔 User ID:', user.id.toString());
    console.log('');
    console.log('🔐 You can now login at: http://localhost:5000/api/auth/login');

  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminAccount();
