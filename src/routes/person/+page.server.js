import { loadPerson } from "$lib/server/person";
import { loadReligions } from "$lib/server/religion";

export const load = async () => {
    const religionObj = await loadReligions();
    const personObj = await loadPerson(); // Extract `persons` correctly

    return {
        religionObj,
        personObj,
    };
};
