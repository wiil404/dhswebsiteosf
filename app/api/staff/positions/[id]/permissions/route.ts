import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabase-admin";

export async function GET(
    request: Request,
    context: {
        params: Promise<{
            id: string
        }>
    }
) {

    const { id } = await context.params;

    const { data, error } = await supabaseAdmin
        .from("position_permissions")
        .select(`
            permission_id,
            permissions(
                id,
                name,
                description
            )
        `)
        .eq("position_id", id);

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(data);

}

export async function POST(
    request: Request,
    context: {
        params: Promise<{
            id: string
        }>
    }
) {

    const { id } = await context.params;

    const body = await request.json();

    const permissions: string[] = body.permissions;

    await supabaseAdmin
        .from("position_permissions")
        .delete()
        .eq("position_id", id);

    if (permissions.length > 0) {

        const rows = permissions.map(permission_id => ({
            position_id: id,
            permission_id
        }));

        const { error } = await supabaseAdmin
            .from("position_permissions")
            .insert(rows);

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

    }

    return NextResponse.json({
        success: true
    });

}