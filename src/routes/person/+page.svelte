<script>
    import ReligionAndCaste from "$lib/components/religion-caste/ReligionAndCaste.svelte";

    export let data;
    let religions = data.religions;
</script>

<ReligionAndCaste {religions} />
