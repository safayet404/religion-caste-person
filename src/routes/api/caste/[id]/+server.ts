import { apiRequest } from "$lib/utils/apiUtils";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;

    if (!id) {
        return new Response(
            JSON.stringify({ error: "Caste ID is required" }),
            { status: 400 }
        );
    }

    try {

        const castes = await apiRequest(`castes/all-castes/${id}`);

        return new Response(
            JSON.stringify({ castes }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching caste data:", error.message);
        return new Response(
            JSON.stringify({ castes: null, error: "Failed to fetch caste data" }),
            { status: 500 }
        );
    }
};
