
export async function load({ fetch }) {
    const response = await fetch('/api/religion');
    const { religions } = await response.json();

    return { religions }

}