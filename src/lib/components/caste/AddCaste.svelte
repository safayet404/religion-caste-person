<script>
    import { page } from "$app/stores";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let id;

    let name = "";
    let description = "";
    let religionId = id;

    function addCaste() {
        const newCaste = {
            name,
            description,
            religionId,
        };
        dispatch("add", newCaste);
        name = "";
        description = "";
        religionId = "";
    }
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="mt-10 font-bold text-xl">Caste Page</h1>

        <form class="mt-10 mx-auto" on:submit|preventDefault={addCaste}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion ">Caste</label>
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
                    <div class="flex gap-5">
                        <button
                            type="submit"
                            class="bg-[#3f00e7] p-2 w-full text-white rounded-md"
                        >
                            Add Caste
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
