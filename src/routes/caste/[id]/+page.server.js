import { base_url } from "$lib/app/base_url";
import axios from "axios";

async function getCasteByReligion(id) {
    try {
        const res = await axios.get(`${base_url}castes/all-castes/${id}`);

        if (res.status !== 200) {
            return [];
        }

        return res.data;
    } catch (error) {
        console.log(`Error fetching religions : ${error.message}`, error);
        return [];
    }
}

export const load = async ({ params }) => {
    const { id } = params;
    console.log("Religion ID", id);


    let castes = await getCasteByReligion(id);

    console.log("caste", castes);


    if (castes.length === 0) {
        console.warn('No Castes found. Using fallback data.');
        religions = [
            {
                id: 'ddad=fdajkshfajshdfaf',
                name: 'XYZ',
                description: 'No description',
            }
        ];
    }

    return {
        castes,
        id
    };
};
