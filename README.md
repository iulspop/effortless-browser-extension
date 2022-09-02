# Effortless - Make Focus Your Default

A Chrome extension that changes the browser so that it's effortless to be focused & intentional. You use it by installing it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/effortless-make-focus-you/pfkeilinhgpmadhklhbpabebpapmdein).

Effortless assists your cognitive control abilities by asking you to make your purpose for using the browser explicit & assigning a timebox for that intention.

## Development

### How to load the extension into the browser from source?

To load the extension in the browser & test it manually, follow these steps:

1. Click the extensions puzzle piece icon on the top nav bar in Chrome and click "Manage Extensions"
2. Click the "Developer mode" toggle button, this will enable loading extensions under development
3. Build the extension by running these commands:
   1. `npm install`
   2. `npm run dev:build`
   - Note: Normally an extension folder can be loaded unpacked without a build. However since the project uses SCSS & ES Modules features, we need to transpile the code using Webpack to JS the browser understands.
4. Go back to the "Manage Extensions" page. Select "Load unpacked", then select the `build` folder which Webpack compiled the extension folder to
5. The extension should be loaded into the browser and active!
   - Note: If you make changes to the code, Webpack will recompile the extension automatically, but the browser will not reload the files. For code changes to take effect, you must click the reload button on the bottom right of the extension card in the "Manage Extensions" page.
   - Note: If you make changes to the code, reload & find behavior of the extension doesn't reflect the changes to the code, then check if Webpack is compiling without error.

### How to run the tests?

Currently, only E2E tests are configured with Puppeteer. Currently they're not helpful since they're inconsistent, so stick with manual tests. Eventually I'll improve them and add unit and integration tests.

To run the E2E tests:

1. Install packages `npm install`
2. Run `npm test:e2e`
