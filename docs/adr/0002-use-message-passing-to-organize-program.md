# 2. Use message passing to organize program

Date: 2021-08-13

## Status

Accepted

## Context

I needed to decide how to organize my extension code. Unlike a webpage, an extension is composed of many components running in seperate execution contexts.
There is the background service worker, content scripts injected into web pages and extension pages (like the popup that opens when you click the action button, the extension icon on the top-right in chrome). This situation requires organizing the program in a different way than a normal webpage.

## Decision

Use message passing as the main tool to organize and compose the components of the extension.

## Consequences

This decision changes how the program should be viewed conceptually. Every component of the extension (content script, background script, extension page) should be viewed as an independent machine or cell. The overall of creating the extension problem is solved by breaking the problem down into small problems. Each problem is solve by a single cell that has a limited responsibility and doesn't know much. The solutions to small problems are combined to solve the overall problem via message passing. That means each cell (again a component of the extension) communicates with each other via sending messages. How messages are handled by the receiver is up to them. This effectively decouples the different components of the extension.

In practice, this means that the content scripts and extension pages of our extension use most chrome.* APIs sparingly and ideally not at all. Instead, they only use the chrome.runtime.sendMessage API to send messages to the background script. The background script uses the chrome.* APIs extensively and handles most of the logic of the extension. The content scripts and extension pages act as small, reusable pieces of functionality. They do not know a lot of about the wider extension. They do their job, then send a message to the background script.
