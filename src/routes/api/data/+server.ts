import { apiRequest } from "$lib/utils/apiUtils";
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const religions = await apiRequest("religions/get-religions");

        const persons = await apiRequest("user/get-users");

        return new Response(
            JSON.stringify({ religions, persons }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return new Response(
            JSON.stringify({ religions: [], persons: [] }),
            { status: 500 }
        );
    }
};