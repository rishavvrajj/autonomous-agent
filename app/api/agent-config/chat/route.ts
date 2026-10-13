import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { AgentConfig, db } from "@/db";
import { and, eq } from "drizzle-orm";
import { executeAgentChat } from "@/lib/agent/agent";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { agentId, messages } = await req.json();

    if (!agentId || !messages) {
      return NextResponse.json(
        { error: "Missing agentId or message" },
        { status: 400 }
      );
    }

    const agentConfigs = await db
      .select()
      .from(AgentConfig)
      .where(
        and(
          eq(AgentConfig.agentId, agentId),
          eq(AgentConfig.userEmail, session.user.email)
        )
      );

    const agentConfig = agentConfigs[0];

    if (!agentConfig) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    const response = await executeAgentChat(
      agentConfig.name ?? "",
      agentConfig.description ?? "",
      messages
    );

    return NextResponse.json(
      {
        message: response,
        agentId,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in agent chat route:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}