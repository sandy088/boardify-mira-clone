import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret:
    "sk_dev_a6QXKrcdvsBBOiq3JAAuvIRNk-aiuwwZXQQshCUaVwMqCb5-pl5nP9hOOK4aj_Vf",
});

export async function POST(req: Request) {
  const authorization = await auth();
  const user = await currentUser();

  console.log("Auth_info", {
    authorization,
    user,
  });

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await req.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl!,
  };

  const session = await liveblocks.prepareSession(user.id, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
