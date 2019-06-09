import { Injectable } from '@nestjs/common';
import { compile as pugCompile, Options as PugCompileOptions, compileTemplate as PugTemplateRendererFn } from 'pug';

import { BaseEmailTemplate } from '../base-template.class';
import { MailgunModuleOptions } from '../module-options.class';

@Injectable()
export class TemplateService {
  private readonly templates: Map<
    new () => BaseEmailTemplate,
    { message: PugTemplateRendererFn; title: PugTemplateRendererFn }
  > = new Map();

  // TODO: Make this injectable via forRoot
  private pugCompileOptions: PugCompileOptions = {};

  constructor(private readonly moduleOptions: MailgunModuleOptions) {
    Object.values(moduleOptions.templates).forEach(template => this.registerTemplate(template));
  }

  public registerTemplate(template: new () => BaseEmailTemplate) {
    let valid = this.validateTemplate(template);

    if (!valid) {
      throw new Error('Invalid template recieved.');
    }

    this.templates.set(template, {
      message: pugCompile(new template().body, this.pugCompileOptions),
      title: pugCompile(new template().title, this.pugCompileOptions),
    });

    return this.templates.get(template);
  }

  /**
   * Returns the rendered HTML message.
   * @param template the template to render
   * @param locals the variables passed to the renderer
   */
  renderMessage<T extends BaseEmailTemplate>(template: new () => T, locals?: T['templateParameters']): string {
    let renderer = this.getTemplateInstance(template);

    return renderer.message(locals);
  }

  /**
   * Returns the rendered HTML title.
   * @param template the template to render
   * @param locals the variables passed to the renderer
   */
  renderTitle<T extends BaseEmailTemplate>(template: new () => T, locals?: T['templateParameters']): string {
    let renderer = this.getTemplateInstance(template);

    return renderer.title(locals);
  }

  private getTemplateInstance<T extends BaseEmailTemplate>(template: new () => T) {
    let pugTemplateRendererFn = this.templates.get(template);

    /**
     * If the template hasnt been registered yet, we try to register it.
     */
    if (!pugTemplateRendererFn) {
      return this.registerTemplate(template);
    }

    return pugTemplateRendererFn;
  }

  /**
   * Validates the recieved template class constructor.
   *
   * @param template template class constrocutor
   */
  private validateTemplate(template: new () => BaseEmailTemplate): boolean {
    try {
      const instance = new template();

      return (
        instance instanceof BaseEmailTemplate && typeof instance.body === 'string' && typeof instance.title === 'string'
      );
    } catch (error) {
      // TODO: It would be better to tell the developer why the template is not valid.
      // We do not care about errors, it means the tempate is not valid.
      return false;
    }
  }
}
