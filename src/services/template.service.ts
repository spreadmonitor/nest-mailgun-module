import { Injectable } from '@nestjs/common';
import {
  compile as pugCompile,
  Options as PugCompileOptions,
  compileTemplate as PugTemplateRendererFn,
  LocalsObject,
} from 'pug';

import { BaseEmailTemplate } from '../base-template.class';

@Injectable()
export class TemplateService {
  private readonly templates: Map<new () => BaseEmailTemplate, PugTemplateRendererFn> = new Map();

  // TODO: Make this injectable via forRoot
  private pugCompileOptions: PugCompileOptions = {};

  public registerTemplate(template: new () => BaseEmailTemplate): PugTemplateRendererFn {
    let valid = this.validateTemplate(template);
    let pugTemplateRendererFn: PugTemplateRendererFn = null;

    if (!valid) {
      throw new Error('Invalid template recieved.');
    }

    pugTemplateRendererFn = pugCompile(new template().body, this.pugCompileOptions);
    this.templates.set(template, pugTemplateRendererFn);

    return pugTemplateRendererFn;
  }

  /**
   * Returns the rendered HTML message.
   * @param template the template to render
   * @param locals the variables passed to the renderer
   */
  render<T extends BaseEmailTemplate>(template: new () => T, locals?: T['templateParameters']): string {
    let pugTemplateRendererFn = this.templates.get(template);

    /**
     * If the template hasnt been registered yet, we try to register it.
     */
    if (!pugTemplateRendererFn) {
      pugTemplateRendererFn = this.registerTemplate(template);
    }

    return pugTemplateRendererFn(locals);
  }

  /**
   * Validates the recieved template class constructor.
   *
   * @param template template class constrocutor
   */
  private validateTemplate(template: new () => BaseEmailTemplate): boolean {
    try {
      const instance = new template();

      return instance instanceof BaseEmailTemplate && typeof instance.body === 'string';
    } catch (error) {
      // TODO: It would be better to tell the developer why the template is not valid.
      // We do not care about errors, it means the tempate is not valid.
      return false;
    }
  }
}
