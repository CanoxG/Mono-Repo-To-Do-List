const PREFIX = 'http://localhost:3001'

export function fetcher(url, opt) {
  return fetch(`${PREFIX}${url}`, opt)
    .then((res) => res.json())
}