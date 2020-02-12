# SSR Mail Renderer

An http server that delivers server-side rendered vue.js pages.
It is intended to be used as template engine for emails.

## Defining templates

Email templates are defined in a `src/email/<template-name>/` directory.
Each emails consists of a template for the email subject,
the html-formatted and plaintext mail content.
In addition, each mail must be registered in the `src/email/index.js` file.

# Previewing templates

Templates can be previewed under the `/mail/<template-name>/<subject|plain|html>` routes.

If the template is requested via a post request,
variables can be passed as json object in the request body.
For get requests, variables can only be passed via query parameters.

The passed variables are injected/provided to the templates as
json object under the name 'data'.

For production usage, rendering templates via a post request
to the endpoints `/mail/<template-name>` and passing variables
in the request body is recommended.


## Start the Server
```
# install dependencies
npm install

# compile the templates
npm run build

# launch the express.js SSR server
npm run start
```
