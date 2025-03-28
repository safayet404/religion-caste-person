
export async function load({ fetch }) {
    const response = await fetch('/api/data');
    const { religions, persons } = await response.json();

    return { religions, persons }

}