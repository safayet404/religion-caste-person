import { loadReligions } from "$lib/server/religion"

export const load = async () => {
    return await loadReligions()
}