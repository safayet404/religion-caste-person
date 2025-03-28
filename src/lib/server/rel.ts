import { base_url } from "$lib/app/base_url";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    try {
        const response = await fetch(`${base_url}religions/get-religions`);

        if (!response.ok) {
            return new Response(JSON.stringify([]), { status: 200 });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error(`Error fetching religions: ${error.message}`, error);
        return new Response(JSON.stringify([]), { status: 500 });
    }
};

export async function load({ fetch }) {
    const response = await fetch('/api/religions');
    let religions = await response.json();

    if (religions.length === 0) {
        console.warn('No religion found. Using fallback data.');
        religions = [
            {
                id: 'ddad=fdajkshfajshdfaf',
                name: 'XYZ',
                description: 'No description',
            }
        ];
    }

    return { religions };
}