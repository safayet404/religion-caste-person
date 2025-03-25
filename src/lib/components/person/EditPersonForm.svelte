<script>
    import { createEventDispatcher } from "svelte";
    import ReligionAndCaste from "../religion-caste/ReligionAndCaste.svelte";
    import Calender from "../Calender.svelte";

    const dispatch = createEventDispatcher();

    export let selectedPerson;
    export let religions = [];

    let name = selectedPerson.name;
    let email = selectedPerson.email;
    let company = selectedPerson.company;
    let job = selectedPerson.job;
    let dateOfBirth = selectedPerson.dateOfBirth;
    let religion = selectedPerson.religion;
    let caste = selectedPerson.caste;

    let selectedReligionId = null;
    let selectedCasteId = null;
    let selectedDate = "";

    function handleUpdate(event) {
        selectedReligionId = event.detail.selectedReligionId;
        selectedCasteId = event.detail.selectedCasteId;

        religion = event.detail.selectedReligionId;
        caste = event.detail.selectedCasteId;
    }

    function handleDateSelected(event) {
        selectedDate = event.detail;
        dateOfBirth = selectedDate;
    }

    function save() {
        dispatch("save", {
            id: selectedPerson._id || selectedPerson.id,
            name,
            email,
            company,
            job,
            dateOfBirth,
            religion,
            caste,
        });
    }

    function cancel() {
        dispatch("cancel");
    }
</script>

<section>
    <div class="container mx-auto p-4">
        <h1 class="font-bold text-lg md:text-4xl mt-10">Person Manager</h1>

        <form class="mt-10 mx-auto" on:submit|preventDefault={save}>
            <div class="grid grid-cols-1 w-[50%] gap-10">
                <div class="flex flex-col">
                    <label for="religion">Name</label>
                    <input
                        type="text"
                        name="name"
                        bind:value={name}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Email</label>
                    <input
                        type="email"
                        name="email"
                        bind:value={email}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Company</label>
                    <input
                        type="text"
                        name="company"
                        bind:value={company}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="religion">Job</label>
                    <input
                        type="text"
                        name="job"
                        bind:value={job}
                        class="border border-[#3f00e7] rounded-md p-2 mt-1"
                        required
                    />
                </div>

                <Calender {dateOfBirth} on:dateSelected={handleDateSelected} />
                <ReligionAndCaste
                    {religion}
                    {caste}
                    {religions}
                    on:updateReligion={handleUpdate}
                />

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
