<script>
    import { createEventDispatcher } from "svelte";

    export let religions = [];

    const dispatch = createEventDispatcher();

    function editReligion(religion) {
        dispatch("edit", { religion });
    }

    function deleteReligion(religion) {
        dispatch("delete", { religion });
    }
</script>

<section>
    <div class="container mx-auto p-4">
        <table class="min-w-full table-fixed divide-y divide-[#3f00e7]">
            <thead>
                <tr>
                    <th
                        class="w-[5%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                    ></th>
                    <th
                        class="w-[15%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Name</th
                    >
                    <th
                        class="w-[45%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Description</th
                    >
                    <th
                        class="w-[5%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >isActive</th
                    >
                    <th
                        class="w-[30%] px-6 py-3 text-left text-xs font-bold text-black tracking-wider"
                        >Action</th
                    >
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-[#3f00e7]">
                {#each religions as religion}
                    <tr>
                        <td class="w-[5%] px-6 py-3"
                            ><input type="checkbox" /></td
                        >
                        <td class="w-[15%] px-6 py-3 text-left font-semibold"
                            >{religion?.name}</td
                        >
                        <td class="w-[45%] px-6 py-3 text-left"
                            >{religion?.description}</td
                        >
                        <td class="w-[5%] px-6 py-3 text-left"
                            >{religion?.isActive ? "Yes" : "No"}</td
                        >
                        <td
                            class="w-[30%] space-y-2 px-6 py-3 font-semibold text-sm"
                        >
                            <button class="bg-[#ef4c53] text-white p-1 rounded">
                                <a href={`caste/${religion._id}`}>Caste</a
                                ></button
                            >
                            <button
                                class="bg-[#ef4c53] text-white p-1 rounded"
                                on:click={() => editReligion(religion)}
                            >
                                Edit</button
                            >
                            <button
                                class="bg-[#ef4c53] text-white p-1 rounded"
                                on:click={() => deleteReligion(religion)}
                                >Delete</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</section>
