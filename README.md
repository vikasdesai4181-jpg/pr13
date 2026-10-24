# React Router Types — route lab

An interactive guide to three React Router types:

- **HashRouter** updates the URL fragment (for example, `/#/products`) and is
  useful when a static host cannot be configured to serve an SPA for every
  route.
- **MemoryRouter** keeps its history in memory rather than changing the browser
  URL. It is useful in tests, Storybook, embedded experiences, and other
  isolated navigation flows.
- **StaticRouter** renders the route for a fixed location without client-side
  navigation. It is intended for server-side rendering, where the server
  provides the incoming request URL.

The three demos are independent. The StaticRouter preview buttons simulate
different request URLs; they do not perform browser navigation.

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```
