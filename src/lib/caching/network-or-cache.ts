export async function fromNetWork(req: RequestInfo, timeout: number): Promise<Response | undefined> {
  return new Promise<any>((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    
    fetch(req).then(response => {
      clearTimeout(timeoutId);
      resolve(response);
    }, reject)
  });
}


export async function fromCache(req: RequestInfo, cacheName: string): Promise<Response | undefined> {
  return new Promise((resolve, reject) => {
    caches.open(cacheName)
          .then(cache => cache.match(req)
                              .then(matching => matching ? resolve(matching) : reject(), () => reject()));
  });
}
