import { base_url } from "$lib/app/base_url";
import axios from "axios";

export async function getReligions() {
    try {
        const res = await axios.get(`${base_url}religions/get-religions`);

        if (res.status !== 200) {
            return [];
        }

        return res.data;
    } catch (error) {
        console.log(`Error fetching religions: ${error.message}`, error);
        return [];
    }
}

export async function loadReligions() {
    let religions = await getReligions();

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
