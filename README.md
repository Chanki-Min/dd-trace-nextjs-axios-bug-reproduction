This is a [Next.js](https://nextjs.org/) to demonstrate bug of dd-trace

## About Issue

The problem is that the dd-trace library fails to add the x-datadog-* header to the header of an HTTP request sent by Axios when Mock Service Worker (MSW) has enabled.

## How To Reproduce

1. Clone this repository

2. Make sure Node.js version is match with `.nvmrc` (use nvm or asdf to install node.js, or just use OS Package manager)

3. Install Dependencies

    ``` sh
    npm i
    ```

4. Build Next.js Project

    ``` sh
    npm run build
    ```

5. Start Next.js Server (this will inject dd-trace by `./server.js`)

    ``` sh
    npm run start-with-msw
    ```

6. Start node.js server (The Server) in **other terminal** to see whether `X-Datadog-*` header is propagated to make distributed tracing

    ``` sh
    node ./simple-header-print-server.js
    ```

7. Open browser and visit `http://localhost:3000/`. this will trigger `getServerSideProps` function, witch makes http request to `http://localhost:8000/` that started in step (6)

8. The Server will print headers, when request made by `fetch` then `x-datadog-*` header will propagated, but made by `axios`, header will not propagated

9. Close Next.js Server and re-start by `npm run start`. This will NOT Enable MSW. and Repeat Step (7)

10. When MSW Is not enabled, Header will propagated

## ETC

I originaly Thought this is MSW's Issue, But In This repo, I declared hooks to `http.request` and `fetch.request` in `./server.js`.

When MSW is enabled, axios call cannot captured by `http.request` hook (see in terminal output of Next.js Server). So I Think dd-trace cannot capture MSW's bypassed request.
