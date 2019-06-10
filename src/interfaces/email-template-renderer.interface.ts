import { compileTemplate as PugTemplateRendererFn } from 'pug';

export interface EmailTemplateRenderer {
  message: PugTemplateRendererFn;
  title: PugTemplateRendererFn;
}
