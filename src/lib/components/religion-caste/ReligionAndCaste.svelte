<script>
    import { createEventDispatcher } from "svelte";

    export let religions = [];
    export let religion;
    export let caste;

    let selectedReligionId = religion
        ? religion
        : religions.length > 0
          ? religions[0]._id
          : null;
    let selectedCastes = [];
    let selectedCasteId = caste ? caste : null;
    const dispatch = createEventDispatcher();

    function updateCastes(event) {
        let selectedReligion = religions.find(
            (religion) => religion._id === event.target.value,
        );
        selectedCastes = selectedReligion ? selectedReligion.castes : [];
        if (!caste && selectedCastes.length > 0) {
            selectedCasteId = selectedCastes[0]._id;
        }

        dispatch("updateReligion", { selectedReligionId, selectedCasteId });
    }

    function updateCaste(event) {
        selectedCasteId = event.target.value;

        dispatch("updateReligion", { selectedReligionId, selectedCasteId });
    }

    if (selectedReligionId && religions.length > 0) {
        updateCastes({ target: { value: selectedReligionId } });
    }
</script>

<section class="container mx-auto">
    <div class="mx-auto">
        <div class="grid grid-cols-2 bg-[#14646f] p-10 rounded-md">
            <div class="flex flex-col">
                <label for="religion">Select a Religion</label>
                <select
                    bind:value={selectedReligionId}
                    on:change={updateCastes}
                    class="rounded-md p-2 w-[50%] mt-5"
                >
                    {#each religions as religion}
                        <option value={religion._id}>{religion.name}</option>
                    {/each}
                </select>
            </div>

            <div class="flex flex-col">
                <label for="caste">Select a Caste</label>
                <select
                    bind:value={selectedCasteId}
                    class="rounded-md p-2 w-[50%] mt-5"
                    on:change={updateCaste}
                >
                    {#each selectedCastes as caste}
                        <option value={caste._id}>{caste.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
</section>
