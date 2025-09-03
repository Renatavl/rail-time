-- CreateEnum
CREATE TYPE "public"."DayOfWeek" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateTable
CREATE TABLE "public"."Train" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Train_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TrainSchedule" (
    "id" TEXT NOT NULL,
    "trainId" TEXT NOT NULL,
    "day" "public"."DayOfWeek" NOT NULL,
    "runs" BOOLEAN NOT NULL DEFAULT false,
    "departure" TEXT,
    "arrival" TEXT,

    CONSTRAINT "TrainSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Train_number_key" ON "public"."Train"("number");

-- CreateIndex
CREATE UNIQUE INDEX "TrainSchedule_trainId_day_key" ON "public"."TrainSchedule"("trainId", "day");

-- AddForeignKey
ALTER TABLE "public"."TrainSchedule" ADD CONSTRAINT "TrainSchedule_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "public"."Train"("id") ON DELETE CASCADE ON UPDATE CASCADE;
