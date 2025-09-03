import { DayOfWeek } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

type DayApi = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export const trainRepository = {
  listByDeparture({
    day,
    q,
    order,
  }: {
    day: DayApi;
    q?: string;
    order: "asc" | "desc";
  }) {
    return prisma.trainSchedule.findMany({
      where: {
        day,
        runs: true,
        train: q
          ? {
              OR: [
                { number: { contains: q, mode: "insensitive" } },
                { from: { contains: q, mode: "insensitive" } },
                { to: { contains: q, mode: "insensitive" } },
              ],
            }
          : undefined,
      },
      orderBy: { departure: order },
      include: {
        train: {
          select: { id: true, number: true, from: true, to: true },
        },
      },
    });
  },

  listByTrainField({
    day,
    q,
    field,
    order,
  }: {
    day: DayApi;
    q?: string;
    field: "from" | "to" | "number";
    order: "asc" | "desc";
  }) {
    return prisma.train.findMany({
      where: {
        ...(q
          ? {
              OR: [
                { number: { contains: q, mode: "insensitive" } },
                { from: { contains: q, mode: "insensitive" } },
                { to: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
        schedules: { some: { day, runs: true } },
      },
      orderBy: { [field]: order },
      include: {
        schedules: {
          where: { day },
        },
      },
    });
  },
  list(q?: string) {
    const where = q
      ? {
          OR: [
            { number: { contains: q } },
            { from: { contains: q } },
            { to: { contains: q } },
          ],
        }
      : undefined;
    return prisma.train.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { schedules: true },
    });
  },

  findById(id: string) {
    return prisma.train.findUnique({
      where: { id },
      include: { schedules: true },
    });
  },

  create(data: {
    number: string;
    from: string;
    to: string;
    schedule: Array<{
      day: DayOfWeek;
      runs: boolean;
      departure: string | null;
      arrival: string | null;
    }>;
  }) {
    return prisma.train.create({
      data: {
        number: data.number,
        from: data.from,
        to: data.to,
        schedules: { createMany: { data: data.schedule } },
      },
      include: { schedules: true },
    });
  },

  updateBase(
    id: string,
    data: { number?: string; from?: string; to?: string }
  ) {
    return prisma.train.update({ where: { id }, data });
  },

  upsertSchedule(
    id: string,
    rows: Array<{
      day: DayOfWeek;
      runs: boolean;
      departure: string | null;
      arrival: string | null;
    }>
  ) {
    return prisma.$transaction(
      rows.map((s) =>
        prisma.trainSchedule.upsert({
          where: { trainId_day: { trainId: id, day: s.day } },
          update: { runs: s.runs, departure: s.departure, arrival: s.arrival },
          create: {
            trainId: id,
            day: s.day,
            runs: s.runs,
            departure: s.departure,
            arrival: s.arrival,
          },
        })
      )
    );
  },

  delete(id: string) {
    return prisma.train.delete({ where: { id } });
  },
};
