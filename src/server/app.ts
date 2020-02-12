import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express-serve-static-core';
import { TemplateKind } from '@/email';
import { renderPage, renderMjml, renderAllTemplates } from './render';

const port = 1919;

express()
  .use(express.static('public'))
  .use(bodyParser.json())
  .get('/mail/:name', (req, res) => multiTemplateHandler(req, res))
  .get('/mail/:name/subject', (req, res) => rawHandler(req, res, 'subject'))
  .get('/mail/:name/plain', (req, res) => rawHandler(req, res, 'plain'))
  .get('/mail/:name/html', (req, res) => mjmlHandler(req, res))
  .post('/mail/:name', (req, res) => multiTemplateHandler(req, res))
  .post('/mail/:name/subject', (req, res) => rawHandler(req, res, 'subject'))
  .post('/mail/:name/plain', (req, res) => rawHandler(req, res, 'plain'))
  .post('/mail/:name/html', (req, res) => mjmlHandler(req, res))
  .listen(port, () => console.log(`Application listening on port ${port}`));

function multiTemplateHandler (req: Request, res: Response) {
  renderAllTemplates(req.params.name, extractVariables(req))
    .then(response => res.json(response))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}

function mjmlHandler (req: Request, res: Response) {
  renderPage(req.params.name, 'html', extractVariables(req))
    .then(html => renderMjml(html))
    .then(mjml => res.send(mjml))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}

function rawHandler (req: Request, res: Response, mode: TemplateKind) {
  renderPage(req.params.name, mode, extractVariables(req))
    .then(text => res.send(text))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}

function extractVariables (req: Request) {
  /** Sets value for a key on an object, but create nested objects for dots in the key */
  function assign (obj: any, name: string, value: any) {
    const path = name.split('.');

    for (let i = 0; i < path.length - 1; i++) {
      let part = path[i];
      if (!obj[part]) {
        obj = obj[part] = {};
      } else {
        obj = obj[part] = {};
      }
    }

    obj[path[path.length - 1]] = value;
  }

  switch (req.method) {
    case 'GET':
      const params = {};
      Object.keys(req.query).forEach(name =>
        assign(params, name, req.query[name]));
      return params;

    case 'POST':
      return req.body;
  }
}
