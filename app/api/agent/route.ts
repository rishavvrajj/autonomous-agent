import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { AgentConfig, db } from "@/db";
import { and, eq } from "drizzle-orm";

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