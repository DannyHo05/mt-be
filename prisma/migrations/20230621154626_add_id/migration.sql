-- AlterTable
ALTER TABLE "group" ADD CONSTRAINT "group_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "group_apps" ADD CONSTRAINT "group_apps_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "message" ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
