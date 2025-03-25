<script>
    import { base_url } from "$lib/app/base_url.js";
    import CasteTable from "$lib/components/caste/CasteTable.svelte";
    import AddReligion from "$lib/components/religion/AddReligion.svelte";
    import EditReligion from "$lib/components/religion/EditReligion.svelte";
    import ReligionTable from "$lib/components/religion/ReligionTable.svelte";
    import axios from "axios";
    import toast from "svelte-5-french-toast";

    export let data;
    let religions = data.religions;

    let selectedReligion = null;

    let isLoading = false;

    function handleEdit(event) {
        selectedReligion = event.detail.religion;
    }

    async function updateReligion(event) {
        const updatedReligion = event.detail;

        try {
            const res = await axios.put(
                `${base_url}religions/update-religion/${updatedReligion.id}`,
                updatedReligion,
            );
            religions = religions.map((religion) =>
                religion._id === updatedReligion.id ? res.data : religion,
            );

            toast.success("Religion Updated");
        } catch (error) {
            toast.error("Failed to update person.Please try again");
        } finally {
            selectedReligion = null;
        }
    }

    async function addReligion(event) {
        if (isLoading) return;

        const newReligion = event.detail;

        if (!newReligion || !newReligion.name || newReligion.name.length < 2) {
            toast.error(
                "Name is required and must be at least 2 characters long",
            );
            return;
        }

        try {
            const res = await axios.post(
                `${base_url}religions/create-religion`,
                newReligion,
            );
            religions = [res.data, ...religions];
            toast.success("Religion added!");
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            toast.error("Failed to add person.Please try again");
        } finally {
            isLoading = false;
        }
    }

    async function deleteReligion(event) {
        const delReligion = event.detail.religion;

        try {
            const res = await axios.delete(
                `${base_url}religions/delete-religion/${delReligion._id}`,
            );
            religions = religions.filter(
                (religion) => religion._id !== delReligion._id,
            );
            toast.success("Religion deleted!");
        } catch (error) {
            toast.error("Failed to delete religion.Please try again");
        }
    }
</script>

<div class="w-full">
    {#if selectedReligion}
        <EditReligion
            {selectedReligion}
            on:save={updateReligion}
            on:cancel={() => (selectedReligion = null)}
        />
    {:else}
        <AddReligion on:add={addReligion} />
        {#if isLoading}
            <div>Loading ...</div>
        {:else}
            <ReligionTable
                {religions}
                on:edit={handleEdit}
                on:delete={deleteReligion}
            />
        {/if}
    {/if}
</div>
