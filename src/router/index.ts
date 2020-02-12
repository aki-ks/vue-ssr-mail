import Vue from 'vue'
import VueRouter from 'vue-router'
import { TemplateKinds, templates as emailTemplates } from '../email'

Vue.use(VueRouter);

export function createRouter(): VueRouter {
  const templateNames = Object.keys(emailTemplates);
  const routes = templateNames.flatMap(name =>
    TemplateKinds.map(mode => ({
      path: `/mail/${name}/${mode}`,
      name: `${name}-${mode}`,
      component: emailTemplates[name][mode]
    }))
  );

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  });
}
