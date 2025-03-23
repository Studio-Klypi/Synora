-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('active', 'passive', 'charges', 'products', 'others');

-- CreateEnum
CREATE TYPE "JournalType" AS ENUM ('sells', 'purchases', 'bank', 'cash', 'others');

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("number","companyUuid")
);

-- CreateTable
CREATE TABLE "journals" (
    "uuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "JournalType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journals_pkey" PRIMARY KEY ("uuid","companyUuid")
);

-- CreateTable
CREATE TABLE "accounting_entries" (
    "uuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "journalUuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reference" TEXT NOT NULL,
    "creditAccountId" INTEGER NOT NULL,
    "debitAccountId" INTEGER NOT NULL,
    "amount" MONEY NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounting_entries_pkey" PRIMARY KEY ("uuid","companyUuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_id_key" ON "accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "journals_uuid_key" ON "journals"("uuid");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "companies"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journals" ADD CONSTRAINT "journals_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "companies"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_entries" ADD CONSTRAINT "accounting_entries_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "companies"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_entries" ADD CONSTRAINT "accounting_entries_journalUuid_fkey" FOREIGN KEY ("journalUuid") REFERENCES "journals"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_entries" ADD CONSTRAINT "accounting_entries_creditAccountId_fkey" FOREIGN KEY ("creditAccountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting_entries" ADD CONSTRAINT "accounting_entries_debitAccountId_fkey" FOREIGN KEY ("debitAccountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
