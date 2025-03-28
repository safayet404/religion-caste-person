import { apiRequest } from "$lib/utils/apiUtils";
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const religions = await apiRequest("religions/get-religions");


        return new Response(
            JSON.stringify({ religions }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return new Response(
            JSON.stringify({ religions: [] }),
            { status: 500 }
        );
    }
};