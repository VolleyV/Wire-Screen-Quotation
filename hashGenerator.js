const bcrypt = require('bcrypt');

async function generateHash(password) {
  const saltRounds = 10; // Standard salt rounds for bcrypt
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function main() {
  const plainPassword1 = 'Vignet@123';
  const hash1 = await generateHash(plainPassword1);
  console.log(`Hash for user1: ${hash1}`);

  const plainPassword2 = '@dminKhunnaphab';
  const hash2 = await generateHash(plainPassword2);
  console.log(`Hash for user2: ${hash2}`);
}

main(); 