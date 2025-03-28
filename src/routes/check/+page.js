export async function load({ fetch, params }) {


    const response = await fetch(`/api/caste/67d31432662e3565481dac3a`); // Correct API endpoint

    if (!response.ok) {
        return { castes: null, error: "Failed to fetch caste data" };
    }

    const { castes } = await response.json();

    return { castes };
}


