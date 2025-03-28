<script>
    import { base_url } from "$lib/app/base_url.js";
    import AddPersonsForm from "$lib/components/person/AddPersonsForm.svelte";
    import EditPersonForm from "$lib/components/person/EditPersonForm.svelte";
    import PersonsTable from "$lib/components/person/PersonsTable.svelte";
    import ReligionAndCaste from "$lib/components/religion-caste/ReligionAndCaste.svelte";
    import { apiRequest } from "$lib/utils/apiUtils.js";
    import axios from "axios";
    import toast from "svelte-5-french-toast";

    export let data;
    let religions = data.religions;
    let persons = data.persons;

    let isLoading = false;

    let selectedPerson = null;

    function handleEdit(event) {
        selectedPerson = event.detail.person;
    }

    async function deletePerson(event) {
        const delPerson = event.detail.person;

        try {
            await apiRequest(`user/delete-user/${delPerson._id}`, "DELETE");
            persons = persons.filter((person) => person._id !== delPerson._id);
            toast.success("Person deleted!");
        } catch (error) {
            toast.error("Failed to delete person.Please try again");
            console.error("API Error:", error.message);
        }
    }

    async function addPerson(event) {
        if (isLoading) return;

        const newPerson = event.detail;
        if (!newPerson || !newPerson.name || newPerson.name.length < 2) {
            toast.error("Name is reuired and must be 2 characters long");
            return;
        }

        console.log("person", newPerson);

        try {
            const person = await apiRequest(
                "user/create-user",
                "POST",
                newPerson,
            );

            persons = [person, ...persons];
            toast.success("Person added!");
        } catch (error) {
            console.log();
            console.error("API Error:", error.response?.data || error.message);
            toast.error("Failed to add person.Please try again");
        } finally {
            isLoading = false;
        }
    }

    async function updatePerson(event) {
        const updatedPerson = event.detail;

        try {
            const person = await apiRequest(
                `user/update-user/${updatedPerson.id}`,
                "PUT",
                updatedPerson,
            );

            console.log(person);

            persons = persons.map((person) =>
                person._id === updatedPerson.id ? updatedPerson : person,
            );
            toast.success("Person updated!");
        } catch (error) {
            toast.error("Failed to update person.Please try again");
        } finally {
            selectedPerson = null;
        }
    }
</script>

<div class="w-full">
    {#if selectedPerson}
        <EditPersonForm
            {selectedPerson}
            {religions}
            on:save={updatePerson}
            on:cancel={() => (selectedPerson = null)}
        />
    {:else}
        <AddPersonsForm {religions} on:add={addPerson} />
        {#if isLoading}
            <div>Loading ...</div>
        {:else}
            <PersonsTable
                {persons}
                on:edit={handleEdit}
                on:delete={deletePerson}
            />
        {/if}
    {/if}
</div>
