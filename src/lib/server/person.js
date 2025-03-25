import { base_url } from "$lib/app/base_url";
import axios from "axios";

export async function getPerson() {
    try {
        const res = await axios.get(`${base_url}user/get-users`);

        if (res.status !== 200) {
            return [];
        }

        return res.data;
    } catch (error) {
        console.log(`Error fetching users: ${error.message}`, error);
        return [];
    }
}

export async function loadPerson() {
    let persons = await getPerson();

    if (persons.length === 0) {
        console.warn('No religion found. Using fallback data.');
        persons = [
            {
                id: 'ddad=fdajkshfajshdfaf',
                name: 'XYZ',
                email: 'test@gmail.com',
                job: "ABC",
                dateOfBirth: "2008-01-15T00:00:00.000Z",
                religion: "67d300bedf23bb77d6e639a5",
                caste: "67d300fed95389197f72736b"

            }
        ];
    }

    return { persons };
}
