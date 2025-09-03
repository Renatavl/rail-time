import { trainRepository } from "../repositories/trainRepository";
import { ensureSevenDays } from "../validation/scheduleUtils";
import type {
  CreateTrainDto,
  PatchTrainDto,
  UpdateTrainDto,
} from "../validation/trainScheme";

type DayApi = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export const trainService = {
  async listByDay(opts: {
    day: DayApi;
    q?: string;
    sortBy: "departure" | "from" | "to" | "number";
    order: "asc" | "desc";
  }) {
    const { day, q, sortBy, order } = opts;

    if (sortBy === "departure") {
      const rows = await trainRepository.listByDeparture({ day, q, order });

      return rows.map((r) => ({
        id: r.train.id,
        number: r.train.number,
        from: r.train.from,
        to: r.train.to,
        schedules: [
          {
            day,
            runs: r.runs,
            departure: r.departure,
            arrival: r.arrival,
          },
        ],
      }));
    }

    const items = await trainRepository.listByTrainField({
      day,
      q,
      field: sortBy,
      order,
    });

    return items.map((t) => ({
      ...t,
      schedules: t.schedules,
    }));
  },

  list(q?: string) {
    return trainRepository.list(q);
  },

  get(id: string) {
    return trainRepository.findById(id);
  },

  async create(dto: CreateTrainDto) {
    const schedule = ensureSevenDays(dto.schedule);
    return trainRepository.create({
      number: dto.number,
      from: dto.from,
      to: dto.to,
      schedule,
    });
  },

  async replace(id: string, dto: UpdateTrainDto) {
    await trainRepository.updateBase(id, {
      number: dto.number,
      from: dto.from,
      to: dto.to,
    });

    const schedule = ensureSevenDays(dto.schedule);
    await trainRepository.upsertSchedule(id, schedule);
    return trainRepository.findById(id);
  },

  async patch(id: string, dto: PatchTrainDto) {
    await trainRepository.updateBase(id, {
      number: dto.number ?? undefined,
      from: dto.from ?? undefined,
      to: dto.to ?? undefined,
    });

    if (dto.schedule?.length) {
      await trainRepository.upsertSchedule(
        id,
        dto.schedule.map((s) => ({
          day: s.day,
          runs: s.runs,
          departure: s.runs ? s.departure ?? null : null,
          arrival: s.runs ? s.arrival ?? null : null,
        }))
      );
    }
    return trainRepository.findById(id);
  },

  remove(id: string) {
    return trainRepository.delete(id);
  },
};
