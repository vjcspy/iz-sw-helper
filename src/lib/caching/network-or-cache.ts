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
  return caches.open(cacheName)
               .then(cache => {
                 return cache.match(req);
               });
}
