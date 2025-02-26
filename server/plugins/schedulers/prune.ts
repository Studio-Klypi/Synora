import { useScheduler } from "#scheduler";
import * as sessionRepo from "~/server/database/repositories/auth/sessions";
import * as reqRepo from "~/server/database/repositories/auth/userRequests";

export default defineNitroPlugin(() => {
  const scheduler = useScheduler();

  scheduler.run(pruneUserRequests).everyFifteenMinutes();
  scheduler.run(pruneAuthSessions).everyFourHours();
});

async function pruneUserRequests() {
  const { count } = await reqRepo.prune();
  console.log(`🔥  ${count} user request${count === 1 ? "" : "s"} pruned!`);
}
async function pruneAuthSessions() {
  const { count } = await sessionRepo.prune();
  console.log(`🔥  ${count} auth session${count === 1 ? "" : "s"} pruned!`);
}
