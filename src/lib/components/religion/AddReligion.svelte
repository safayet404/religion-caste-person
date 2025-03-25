<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let name = "";
    let description = "";
    let isActive = false;

    function addReligion() {
        const newReligion = {
            name,
            description,
            isActive,
        };
        dispatch("add", newReligion);
        name = "";
        description = "";
        isActive = false;
    }
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-lg md:text-4xl mt-10">Religion Manager</h1>

        <form class="mt-10 mx-auto" on:submit|preventDefault={addReligion}>
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
                    <button
                        type="submit"
                        class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                    >
                        <!-- {$isLoading ? "Religion Adding ...." : "Add Religion"} -->
                        Add Religion
                    </button>
                </div>
            </div>
        </form>
    </div>
</section>
