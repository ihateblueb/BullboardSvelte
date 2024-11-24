import https from '$lib/https';

export default async function getQueues() {
    return await https.get('/api/queues');
}
