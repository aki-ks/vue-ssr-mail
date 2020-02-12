export type TemplateKind = 'subject' | 'html' | 'plain'
export const TemplateKinds: TemplateKind[] = ['subject', 'html', 'plain'];

type Template = { [typ in TemplateKind]: () => Promise<any>}
export const templates: { [name: string]: Template } = {
  'hello-world': {
    subject: () => import('./hello-world/subject.vue'),
    html: () => import('./hello-world/html.vue'),
    plain: () => import('./hello-world/plain.vue')
  }
};
