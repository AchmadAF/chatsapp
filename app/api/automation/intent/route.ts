import { detectIntent } from "@/lib/automation";
import { z } from "zod";

const schema = z.object({ message: z.string().min(1) });

export async function POST(request: Request) {
  const { message } = schema.parse(await request.json());
  const result = await detectIntent(message);
  return Response.json(result);
}
