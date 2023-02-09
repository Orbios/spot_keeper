## Using Absolute Imports in a Vite Project

### To use absolute imports in a Vite project, follow these steps:

1. In the `tsconfig.json` file, add the following line to the `compilerOptions` object:

```
"baseUrl": "./src"
```

This line specifies the root directory for your project's source files.

2. Install the `vite-tsconfig-paths` plugin as a dev dependency.

3. In the `vite.config.ts` file, use the `vite-tsconfig-paths` plugin as follows:

```
...
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()]
});
```

## Changing the Build Folder Name in a Vite Project

By default, Vite builds your project's output to a folder named `dist`. If you'd like to change this to a different folder name, such as `build`, follow these steps:

1. In your `vite.config.ts` file, add or update the `outDir` property to specify the desired build folder name. For example:

```
export default defineConfig({
  build: {
    outDir: 'build'
  }
});
```

2. In the terminal, run the following command to rebuild your project using the updated `outDir` configuration:

```
npm run build
```

That's it! Your Vite project will now build its output to a folder named `build` instead of `dist`.
