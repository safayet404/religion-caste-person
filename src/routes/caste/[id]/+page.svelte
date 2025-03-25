<script>
    import { base_url } from "$lib/app/base_url.js";
    import AddCaste from "$lib/components/caste/AddCaste.svelte";
    import CasteTable from "$lib/components/caste/CasteTable.svelte";
    import EditCaste from "$lib/components/caste/EditCaste.svelte";
    import axios from "axios";
    import toast from "svelte-5-french-toast";

    export let data;
    let castes = data.castes;
    let id = data.id;

    let selectedCaste = null;

    let isLoading = false;

    async function addCaste(event) {
        if (isLoading) return;

        const newCaste = event.detail;

        if (!newCaste || !newCaste.name || newCaste.name.length < 2) {
            toast.error(
                "Name is required and must be at least 2 characters long",
            );
            return;
        }

        try {
            const res = await axios.post(
                `${base_url}castes/create-caste`,
                newCaste,
            );
            castes = [res.data, ...castes];
            toast.success("Caste added!");
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            toast.error("Failed to add caste.Please try again");
        } finally {
            isLoading = false;
        }
    }

    async function handleEdit(event) {
        selectedCaste = event.detail.caste;
    }

    async function updateCaste(event) {
        const updatedCaste = event.detail;
        console.log("update", updatedCaste);

        try {
            const res = await axios.put(
                `${base_url}castes/update-caste/${updatedCaste.id}`,
                updatedCaste,
            );
            castes = castes.map((caste) =>
                caste._id === updatedCaste.id ? res.data : caste,
            );

            toast.success("Caste updated!");
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to update caste. Please try again.");
        } finally {
            selectedCaste = null;
        }
    }

    async function deleteCaste(event) {
        const delCaste = event.detail.caste;

        try {
            const res = await axios.delete(
                `${base_url}castes/delete-caste/${delCaste._id}`,
            );

            castes = castes.filter((caste) => caste._id !== delCaste._id);
            toast.success("Caste deleted!");
        } catch (error) {
            toast.error("Failed to delete caste.Please try again");
        }
    }
</script>

<div class="w-full">
    {#if selectedCaste}
        <EditCaste
            {selectedCaste}
            on:save={updateCaste}
            on:cancel={() => (selectedCaste = null)}
        />
    {:else}
        <AddCaste {id} on:add={addCaste} />
        {#if isLoading}
            <div>Loading ....</div>
        {:else}
            <CasteTable {castes} on:delete={deleteCaste} on:edit={handleEdit} />
        {/if}
    {/if}
</div>
