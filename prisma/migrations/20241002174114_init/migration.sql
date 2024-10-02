-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "PaymentChannel" AS ENUM ('CASH', 'BANK_TRANSFER', 'PAYMENT_GATEWAY');

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "line_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "email_vertify_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "monthly" DOUBLE PRECISION NOT NULL,
    "yearly" DOUBLE PRECISION NOT NULL,
    "yearly_discount" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_packages" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "package_id" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "expired_date" TIMESTAMP(3) NOT NULL,
    "paid_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "total_payment" DOUBLE PRECISION NOT NULL,
    "paid_at" TIMESTAMP(3),
    "payment_document" TEXT,
    "PaymentChannel" "PaymentChannel" NOT NULL,
    "last_notify_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "building_id" UUID NOT NULL,
    "floor_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "is_deposit" BOOLEAN NOT NULL DEFAULT true,
    "deposit" DOUBLE PRECISION NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT NOT NULL,
    "contract_start_date" TIMESTAMP(3) NOT NULL,
    "contract_end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renters" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "card_id" TEXT,
    "nickname" TEXT,
    "address" TEXT,
    "line_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "renters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_rentals" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "room_id" UUID NOT NULL,
    "renter_id" UUID NOT NULL,
    "electrict_bill" DOUBLE PRECISION,
    "water_bill" DOUBLE PRECISION,
    "maintenance_fee" DOUBLE PRECISION,
    "total_payment" DOUBLE PRECISION,
    "last_notify_at" TIMESTAMP(3),
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "last_paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "room_rentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_rental_payments" (
    "id" UUID NOT NULL,
    "room_rental_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "payment_document" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "room_rental_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrators" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "administrators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_username_key" ON "companies"("username");

-- CreateIndex
CREATE UNIQUE INDEX "companies_code_key" ON "companies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_username_email_phone_number_idx" ON "companies"("username", "email", "phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "packages_id_key" ON "packages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "packages_code_key" ON "packages"("code");

-- CreateIndex
CREATE INDEX "packages_code_idx" ON "packages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "company_packages_id_key" ON "company_packages"("id");

-- CreateIndex
CREATE INDEX "company_packages_company_id_package_id_paid_at_idx" ON "company_packages"("company_id", "package_id", "paid_at");

-- CreateIndex
CREATE UNIQUE INDEX "buildings_id_key" ON "buildings"("id");

-- CreateIndex
CREATE INDEX "buildings_company_id_idx" ON "buildings"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_id_key" ON "rooms"("id");

-- CreateIndex
CREATE INDEX "rooms_company_id_building_id_contract_start_date_contract_e_idx" ON "rooms"("company_id", "building_id", "contract_start_date", "contract_end_date");

-- CreateIndex
CREATE UNIQUE INDEX "renters_id_key" ON "renters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "renters_username_key" ON "renters"("username");

-- CreateIndex
CREATE INDEX "renters_company_id_username_idx" ON "renters"("company_id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "room_rentals_id_key" ON "room_rentals"("id");

-- CreateIndex
CREATE INDEX "room_rentals_company_id_room_id_renter_id_idx" ON "room_rentals"("company_id", "room_id", "renter_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_rental_payments_id_key" ON "room_rental_payments"("id");

-- CreateIndex
CREATE INDEX "room_rental_payments_room_rental_id_idx" ON "room_rental_payments"("room_rental_id");

-- CreateIndex
CREATE UNIQUE INDEX "administrators_id_key" ON "administrators"("id");

-- AddForeignKey
ALTER TABLE "company_packages" ADD CONSTRAINT "company_packages_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_packages" ADD CONSTRAINT "company_packages_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renters" ADD CONSTRAINT "renters_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_rentals" ADD CONSTRAINT "room_rentals_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_rentals" ADD CONSTRAINT "room_rentals_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_rentals" ADD CONSTRAINT "room_rentals_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "renters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_rental_payments" ADD CONSTRAINT "room_rental_payments_room_rental_id_fkey" FOREIGN KEY ("room_rental_id") REFERENCES "room_rentals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
