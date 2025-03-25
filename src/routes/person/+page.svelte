<script>
    import { base_url } from "$lib/app/base_url.js";
    import AddPersonsForm from "$lib/components/person/AddPersonsForm.svelte";
    import EditPersonForm from "$lib/components/person/EditPersonForm.svelte";
    import PersonsTable from "$lib/components/person/PersonsTable.svelte";
    import ReligionAndCaste from "$lib/components/religion-caste/ReligionAndCaste.svelte";
    import axios from "axios";
    import toast from "svelte-5-french-toast";

    export let data;

    let { religionObj, personObj } = data || {};

    let religions = religionObj.religions;
    let persons = personObj.persons;

    let isLoading = false;

    let selectedPerson = null;

    function handleEdit(event) {
        selectedPerson = event.detail.person;
    }

    async function deletePerson(event) {
        const delPerson = event.detail.person;

        try {
            const res = await axios.delete(
                `${base_url}user/delete-user/${delPerson._id}`,
            );
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
            const res = await axios.post(
                `${base_url}user/create-user`,
                newPerson,
            );
            persons = [res.data, ...persons];
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
        const updatePerson = event.detail;

        try {
            const res = await axios.put(
                `${base_url}user/update-user/${updatePerson.id}`,
                updatePerson,
            );
            persons = persons.map((person) =>
                person._id === updatePerson.id ? res.data : person,
            );
            toast.success("Person updated !");
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
