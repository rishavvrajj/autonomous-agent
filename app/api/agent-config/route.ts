import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { AgentConfig, db } from "@/db";
import { and, desc, eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { agentId, name, description, agentImage } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Check if agent already exists for this user
  const existingAgent = await db
    .select()
    .from(AgentConfig)
    .where(
      and(
        eq(AgentConfig.agentId, agentId),
        eq(AgentConfig.userEmail, session.user.email)
      )
    )
    .limit(1);

  if (existingAgent.length > 0) {
    return NextResponse.json(
      {
        message: "Agent already exists",
        agentConfig: existingAgent[0]
      },
      { status: 200 }
    );
  }

  // Insert new agent if it doesn't exist
  const newAgentConfig = await db
    .insert(AgentConfig)
    .values({
      agentId,
      name,
      description,
      agentImage,
      userEmail: session.user.email
    })
    .returning();

  return NextResponse.json(
    {
      message: "Agent Config saved successfully",
      agentConfig: newAgentConfig
    },
    { status: 200 }
  );
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(req.url);
    const agentId = searchParams.get("agentId");

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (agentId) {
      if (!session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const [agentConfig] = await db
        .select()
        .from(AgentConfig)
        .where(
          and(
            eq(AgentConfig.userEmail, session.user.email),
            eq(AgentConfig.agentId, agentId),
          ),
        )
        .limit(1);

      if (!agentConfig) {
        return NextResponse.json(
          { error: "Agent config not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(agentConfig);
    }

    const agentConfig = await db
      .select()
      .from(AgentConfig)
      .where(eq(AgentConfig.userEmail, session.user.email))
      .orderBy(desc(AgentConfig.createdAt));

    if (!agentConfig.length) {
      return NextResponse.json(
        { message: "No agent config found", agentConfig: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Agent config fetched successfully",
        agentConfig,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /agent-config error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {

  const agentConfig = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 400 }
    )
  }

  const { id, ...updatableFields } = agentConfig;

  const result = await db.update(AgentConfig)
    .set({
      ...updatableFields,
      createdAt: new Date()
    }).where(and(eq(AgentConfig.userEmail, session.user.email),
      eq(AgentConfig.agentId, agentConfig.agentId)))
    .returning();

  console.log(result)

  return NextResponse.json(
    { message: "Agent Configuration update" },
    { status: 200 }
  )
}