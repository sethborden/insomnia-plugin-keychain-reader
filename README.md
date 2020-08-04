# insomnia-plugin-keychain-reader

Super simple (insomnia)[http://insomnia.rest] plugin that lets you pull values out your MacOS keychain and use them in template tags. Rather than hardcoding passwords/API tokens, etc. into your Insomnia environment, you can store them in your keychain and pull them out of there.

## Getting a value
In a place where you can type a template, type `keychain`, wait for the template tag logic to pick things up, then pick `keychain` off the list. Click on the value and set your *account* and *service* values from which the password will get pulled.

## Setting a value
There are two easy ways to set a password to use:
 1. Run the command `security add-generic-password -a <account> -s <service> -w <password>` in the terminal. OR...
 2. Under the workspace actions menu in Insomnia click the "Add Value to Keychain" option and follow the prompts.
