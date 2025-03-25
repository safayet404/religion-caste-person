<script>
    export let religions = [];

    let selectedReligionId = religions.length > 0 ? religions[0]._id : null;
    let selectedCastes = [];
    let selectedCasteId = null;

    function updateCastes(event) {
        let selectedReligion = religions.find(
            (religion) => religion._id === event.target.value,
        );
        selectedCastes = selectedReligion ? selectedReligion.castes : [];
        selectedCasteId =
            selectedCastes.length > 0 ? selectedCastes[0]._id : null;
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
                >
                    {#each selectedCastes as caste}
                        <option value={caste._id}>{caste.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
</section>
