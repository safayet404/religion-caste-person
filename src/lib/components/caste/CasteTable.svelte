<script>
    import { createEventDispatcher } from "svelte";
    export let castes = [];

    const dispatch = createEventDispatcher();

    function deleteCaste(caste) {
        dispatch("delete", { caste });
    }

    function editCaste(caste) {
        dispatch("edit", { caste });
    }
</script>

<section>
    <div class="container mx-auto p-4">
        <table class="min-w-full table-fixed divide-y divide-[#f87171]">
            <thead>
                <tr>
                    <th
                        class="w-[10%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                    ></th>
                    <th
                        class="w-[25%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Name</th
                    >
                    <th
                        class="w-[40%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Description</th
                    >
                    <th
                        class="w-[25%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Action</th
                    >
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-[#f87171]">
                {#each castes as caste}
                    <tr>
                        <td class="w-[10%] px-6 py-3"
                            ><input type="checkbox" /></td
                        >
                        <td class="w-[25%] px-6 py-3 font-semibold"
                            >{caste?.name}</td
                        >
                        <td class="w-[45%] px-6 py-3">{caste?.description}</td>
                        <td class="w-[25%] px-6 py-3 font-semibold text-sm">
                            <button
                                class="bg-[#ef4c53] text-white p-1 rounded"
                                on:click={() => editCaste(caste)}
                            >
                                Edit</button
                            >
                            <button
                                class="bg-[#ef4c53] text-white p-1 rounded"
                                on:click={() => deleteCaste(caste)}
                                >Delete</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>
