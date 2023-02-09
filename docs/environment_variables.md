## Using Environment Variables in a Vite Project

Environment variables can be useful for storing configuration values that can change between environments (e.g. `development`, `production`). You can access environment variables in a Vite project using the `import.meta.env` object. The `import.meta.env` object contains environment variables that are set at build time, including any environment variables that are prefixed with <b>VITE\_</b>.

Here's how you can use the `import.meta.env` object to access environment variables in your Vite project:

1. Set the environment variable that you want to access inside `.env` file. For example:

```
VITE_API_KEY=abc123
```

2. In your code, access the value of the environment variable using the `import.meta.env` object. For example:

```
console.log(import.meta.env.VITE_API_KEY);
```

This method of accessing environment variables is particularly useful when you need to use the values of these variables during the build process, such as for configuring build-time optimization.

### Built-in variables:

- `import.meta.env.PROD`: {boolean} whether the app is running in production;

- `import.meta.env.DEV`: {boolean} whether the app is running in development (always the opposite of `import.meta.env.PROD`).

For more details about env variables read the Vite docs [here](https://vitejs.dev/guide/env-and-mode.html).
