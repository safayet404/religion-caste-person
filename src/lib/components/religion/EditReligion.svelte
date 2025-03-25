<script>
    import { createEventDispatcher } from "svelte";

    export let selectedReligion;

    console.log("selectedPerson:", selectedReligion);

    const dispatch = createEventDispatcher();

    let name = selectedReligion.name;
    let description = selectedReligion.description;
    let isActive = selectedReligion.isActive;

    function save() {
        dispatch("save", {
            id: selectedReligion._id || selectedReligion.id,
            name,
            description,
            isActive,
        });
    }

    function cancel() {
        dispatch("cancel");
    }
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-lg md:text-4xl mt-10">Religion Manager</h1>

        <form class="mt-10 mx-auto" on:submit|preventDefault={save}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion ">Religion</label>
                    <input
                        type="text"
                        name="name"
                        bind:value={name}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Description</label>
                    <input
                        type="text"
                        name="description"
                        bind:value={description}
                        class="border border-[#3f00e7] rounded-md p-2 mt-2"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Active</label>
                    <input
                        type="checkbox"
                        bind:checked={isActive}
                        class="w-5 bg-[#3f00e7] h-5"
                    />
                </div>
                <div class="flex flex-col">
                    <div class="flex gap-5">
                        <button
                            type="submit"
                            class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                        >
                            Save
                        </button>

                        <button
                            class="bg-[#f100b7] p-2 w-full text-white text-center rounded-md"
                            on:click={cancel}>Cancel</button
                        >
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
