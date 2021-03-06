import { TemplateKind } from '../src/email';
import { createBundleRenderer } from 'vue-server-renderer';
import { SSRContext } from '../src/main';
import mjml2html from 'mjml';
const serverBundle = require('../dist/vue-ssr-server-bundle.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false
});

export function renderAllTemplates(name: string, data: object) {
  return Promise.all([
    renderPage(name, 'subject', data),
    renderPage(name, 'html', data).then(html => renderMjml(html)),
    renderPage(name, 'plain', data)
  ]).then(results => ({
    subject: results[0],
    html: results[1],
    plain: results[2]
  }))
}

export function renderPage (name: string, mode: TemplateKind, data: object): Promise<string> {
  const context: SSRContext = { url: `/mail/${name}/${mode}`, data };
  return renderer.renderToString(context)
}

export function renderMjml(html: string) {
  const result = mjml2html(html);
  if (result.errors && result.errors.length) {
    result.errors.forEach(e => console.error(e));
    throw new Error('Mjml compilation failed with errors');
  } else {
    return result.html;
  }
}
