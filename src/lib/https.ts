import store from './store';

class ApiError extends Error {
    constructor(
        public status: number,
    public message: string
) {
    super();
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';
    this.status = status ?? 0;
}
}

class https {
    private count(num: number) {
        let count = store.activeRequests;
        count.update((e) => e + num);
    }

    private async start() {
        this.count(1);
    }
    private async end(res: Response) {
        this.count(-1);
        if (!res.ok) throw new ApiError(res.status, (await res.json()).message);
        return await res.json();
    }

    public async get(url: string) {
    await this.start();

    let req = await fetch(url, {
        method: 'GET'
    });

    return await this.end(req);
}
public async post(url: string, body?: object) {
    await this.start();

    let req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    });

    return await this.end(req);
}
public async patch(url: string) {
    await this.start();

    let req = await fetch(url, {
        method: 'PATCH',
    });

    return await this.end(req);
}
public async delete(url: string) {
    await this.start();

    let req = await fetch(url, {
        method: 'DELETE',
    });

    return await this.end(req);
}
}

export default new https();
