const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
async function main() {
  const groupChatApp = await prisma.groupApp.upsert({
    where: { id: '50e0c7f9-998d-416e-b098-1e7a73a6f6d5' },
    create: {},
    update: {},
  });
  const user1 = await signUp(
    {
      username: 'camquy1@gmail.com',
      first_name: 'John',
      last_name: 'Doe',
      password: '123123123',
    },
    groupChatApp.id,
  );
  const user2 = await signUp(
    {
      username: 'camquy2@gmail.com',
      first_name: 'Danny',
      last_name: 'Doe',
      password: '123123123',
    },
    groupChatApp.id,
  );
  const user3 = await signUp(
    {
      username: 'camquy3@gmail.com',
      first_name: 'Hachi',
      last_name: 'Doe',
      password: '123123123',
    },
    groupChatApp.id,
  );
  const group1 = await prisma.group.create({
    data: {
      name: 'group1',
      group_app: {
        connect: {
          id: groupChatApp.id,
        },
      },
    },
  });
  const group2 = await prisma.group.create({
    data: {
      name: 'user1-user2',
      group_app: {
        connect: {
          id: groupChatApp.id,
        },
      },
    },
  });

  const linkUser1ToGroup1 = await prisma.usersOnGroups.create({
    data: {
      groupId: group1.id,
      userId: user1.id,
    },
  });
  const linkUser2ToGroup1 = await prisma.usersOnGroups.create({
    data: {
      groupId: group1.id,
      userId: user2.id,
    },
  });
  const linkUser3ToGroup1 = await prisma.usersOnGroups.create({
    data: {
      groupId: group1.id,
      userId: user3.id,
    },
  });
  const linkUser2ToGroup2 = await prisma.usersOnGroups.create({
    data: {
      groupId: group2.id,
      userId: user2.id,
    },
  });
  const linkUser1ToGroup2 = await prisma.usersOnGroups.create({
    data: {
      groupId: group2.id,
      userId: user1.id,
    },
  });
}
async function signUp(payload, appId) {
  try {
    const hashPassword = await bcrypt.hash(payload.password, 10);
    const groupApp = await prisma.groupApp.findUnique({
      where: {
        id: appId,
      },
    });
    const user = await prisma.user.create({
      data: {
        ...payload,
        password: hashPassword,
        group_app: {
          connect: {
            id: groupApp.id,
          },
        },
      },
      select: {
        username: true,
        first_name: true,
        last_name: true,
        id: true,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    throw new Error('Email already exists!');
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect;
    process.exit(0);
  });
