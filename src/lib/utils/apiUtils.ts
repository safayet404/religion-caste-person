import { base_url } from "$lib/app/base_url";

/**
 * Generic API handler for GET, POST, PUT, DELETE requests.
 * @param {string} endpoint - The API endpoint
 * @param {string} method - The HTTP method ('GET', 'POST', 'PUT', 'DELETE')
 * @param {object} [data] - The data to send for POST/PUT requests
 * @returns {Promise<object>} - The response data
 */
export async function apiRequest(endpoint: string, method: string = "GET", data: object | null = null): Promise<any> {
    const headers = {
        "Content-Type": "application/json",
    };

    const options: RequestInit = {
        method,
        headers,
    };

    if (data && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(`${base_url}${endpoint}`, options);

        if (res.ok) {
            return await res.json();
        } else {
            throw new Error(`API Error: ${res.statusText}`);
        }
    } catch (error) {
        console.error("API request failed:", error);
        throw new Error("Failed to fetch data from API");
    }
}
