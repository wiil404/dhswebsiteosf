import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase-server";

export async function GET(request: Request) {

    const supabase = await createClient();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "Missing article ID" },
            { status: 400 }
        );
    }

    const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }

    return NextResponse.json(data);

}