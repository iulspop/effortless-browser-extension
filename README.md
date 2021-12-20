# Effortless - Make Focus Your Default

A Chrome extension that changes the browser so that it's effortless to be focused & intentional. You use it by installing it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/effortless-make-focus-you/pfkeilinhgpmadhklhbpabebpapmdein).

Effortless assists your cognitive control abilities by asking you to make your purpose for using the browser explicit & assigning a timebox for that intention.

## Development

### How to load the extension into the browser from source?
To load the extension in the browser & test it manually, follow these steps:
1. Click the extensions "puzzle piece" icon in Chrome and click "Manage Extensions"
2. Click the "Developer mode" toggle button, this will enable loading the extension under development.
3. Before we load the unpacked extension (the extension folder), it must be built, since this extension project uses Webpack to compile SCSS & ES Modules. To build the extension, follow these steps:
  a) Run `npm install`
  b) Run `npm run dev:build`
4. Now we can go back to the browser in the "Manage Extensions" page, select "Load unpacked", then select the `dev-build` folder which Webpack compiled the extension to. Click "Select Folder" & the extension should be loaded into the browser!
Note 1: If you make changes to the code, Webpack will recompile the extension, but the browser will not reload the files. To reload the extension after changing the code, click the reload button on the bottom right of the extension card in the "Manage Extensions" page.
Note 2: If you make changes to the code, reload & find behavior of the extension doesn't reflect the changes to the code, then check if Webpack is compiling without error.

### How to run the tests?
Currently there are only e2e tests configured & I'm transitioning from Cypress to Puppeteer. The Cypress tests are not maintained & don't reflect the behavior of the extensions, therefore there are not automated tests at the moment.