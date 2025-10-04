import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import prisma from '../../prisma/client.js'
import { generateRandomPassword } from '../../src/utils/randomPassword.js'

const password = generateRandomPassword();
const hashedPassword = bcrypt.hashSync(password, 8);

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const user:User = {
  id: v4(),
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password: hashedPassword,
}

export const insertUsers = async (users: User): Promise<void> => {
  await prisma.user.create({
    data: users,
  })
}


// export const insertUsers = async (users: any) => {
//   await prisma.user.createMany({
//     data: users,
//     skipDuplicates: true,
//   });
// };
