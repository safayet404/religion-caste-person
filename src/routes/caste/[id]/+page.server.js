

export async function load({ fetch, params }) {
    const { id } = params;



    const response = await fetch(`/api/caste/${id}`);

    if (!response.ok) {
        return { castes: null, error: "Failed to fetch caste data" };
    }

    const { castes } = await response.json();

    return { castes, id };
}
