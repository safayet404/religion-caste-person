// +page.js
import { loadPerson } from "$lib/server/person";
import { loadReligions } from "$lib/server/religion";

export const load = async () => {
    return await loadPerson()
};
