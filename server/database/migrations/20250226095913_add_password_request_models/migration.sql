-- CreateEnum
CREATE TYPE "UserRequestType" AS ENUM ('password');

-- CreateTable
CREATE TABLE "user_requests" (
    "code" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "type" "UserRequestType" NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "user_requests_pkey" PRIMARY KEY ("code","userUuid")
);

-- AddForeignKey
ALTER TABLE "user_requests" ADD CONSTRAINT "user_requests_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
