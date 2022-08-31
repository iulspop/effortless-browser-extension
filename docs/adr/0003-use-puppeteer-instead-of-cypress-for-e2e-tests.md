# 3. Use Puppeteer instead of Cypress for E2E tests

Date: 2021-08-13

## Status

Accepted

## Context

Initially, I choose to write E2E tests using Cypress because it was difficult to seperate code to write unit tests and to write integration tests that used browser extension APIs. However there were a number of limitations to using Cypress for testing the Effortless browser extension.

First, since Effortless injects code into the main frame of the window, but Cypress uses that frame to control the sub-frame under test, I had to add code and a seperate compiling configuration to account for that.

Second, Cypress doesn't support communicating with a page from the testing framework through `chrome.runtime.sendMessage`. That's because for `chrome.runtime.sendMessage` to be enabled and not undefined, the test page must be opened with HTTPS enabled and the extension `manifest.json` `externally_connetable` to be configured. To enable HTTPS, you need to setup an SSL certificate. Since Cypress sits between your server and the browser, it cannot have a valid SSL certificate. To work around not having `chrome.runtime.sendMessage`, I created another extension that is loaded on test builds that listens for events on the DOM and then sends a message to extension under this. This made the code much more complicated but messages were still unreliable, so test conveniences like reloading the extension code and resetting the extension state before tests didn't work reliably.

Third, [Cypress cannot open pages using browser specific protocols](https://github.com/cypress-io/cypress/issues/1965) such as `chrome-extension://`. That means opening and testing extension pages like the action button popup or configuration page is impossible without convoluted proxy and mocking setup.

Fourth, Cypress is designed for testing an application running on one page, but Effortless interacts when every tab and window opened by the user and a lot of bugs lie in synchronizing these pages.

Conversely, Puppeteer has none of the above issues:

1. Doesn't modify the main frame.
2. Supports communicating with the extension either through `chrome.runtime.sendMessage` and serving the test page through a HTTPS server or by opening an extension page and using extension communication APIs or [by executing code from the background script context directly](https://github.com/puppeteer/puppeteer/issues/2486#issuecomment-602116047) ([Note with Manifest V3 that methods needs a workaround involving service workers](https://github.com/puppeteer/puppeteer/issues/2486#issuecomment-1159705685)).
3. Can open `chrome-extension://` pages.
4. Can interact with many pages, albeit awkwardly.

## Decision

Use Puppeteer for E2E tests and potentially for integration tests.

## Consequences

Deleted all code related to testing with Cypress and removed test build configuration since that is no longer necessary.
