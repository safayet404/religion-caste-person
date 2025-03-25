<script>
    export let error;
</script>

<svelte:head>
    <title>{error.status === 404 ? "Page Not Found" : "Error"}</title>
</svelte:head>

<main class="error-page">
    <h1>
        {error.status === 404 ? "404 - Page Not Found" : "Something went wrong"}
    </h1>
    <p>{error.message || "The page you are looking for does not exist."}</p>
    <a href="/" class="home-link">Go Back Home</a>
</main>

<style>
    .error-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        background-color: #f8f8f8;
    }
    h1 {
        font-size: 2rem;
        color: #e63946;
    }
    .home-link {
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #0077b6;
        color: white;
        text-decoration: none;
        border-radius: 5px;
    }
</style>
