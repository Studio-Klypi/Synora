-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "permissions" SET DEFAULT ARRAY[]::TEXT[];
