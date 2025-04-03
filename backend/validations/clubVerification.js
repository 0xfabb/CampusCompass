import { z } from "zod";

export const addClubSchema = z.object({
  clubName: z.string().min(3).max(50),
  clubData: z.string().min(10).max(500),
  clubSec: z.string().min(3).max(30),
});

export const getClubSchema = z.object({
  serverId: z.number().positive().int(),
});
