<script>
    import { createQuery } from '@tanstack/svelte-query';
    import getQueues from '$lib/api/getQueues';

    const query = createQuery({
        queryKey: ['queues'],
        retry: false,
        queryFn: async () => await getQueues()
    });
</script>

<h1>Bullboard</h1>

{#if $query.isLoading}
    Loading
{:else if $query.isError}
    <!--
    <Error
        status={$query.error.status}
        message={$query.error.message}
        server={Boolean($query.error.status)}
        retry={() => $query.refetch()}
    />
    -->
{:else if $query.isSuccess}
    {#each $query.data as queue}
        queue
    {/each}
{/if}