import { Injectable } from '@nestjs/common';
import { compile as pugCompile, Options as PugCompileOptions, compileTemplate as PugTemplateRendererFn } from 'pug';

import { BaseEmailTemplate } from '../base-template.class';
import { MailgunModuleOptions } from '../module-options.class';
import { EmailTemplateRenderer } from '@core/interfaces';

@Injectable()
export class TemplateService {
  private readonly templates: Map<new () => BaseEmailTemplate, EmailTemplateRenderer> = new Map();

  // TODO: Make this injectable via forRoot
  private pugCompileOptions: PugCompileOptions = {};

  constructor(private readonly moduleOptions: MailgunModuleOptions) {
    Object.values(moduleOptions.templates).forEach(template => this.registerTemplate(template));
  }

  public registerTemplate(template: new () => BaseEmailTemplate): EmailTemplateRenderer {
    const valid = this.validateTemplate(template);
    let instance: BaseEmailTemplate;
    let fullTitleString: string;

    if (!valid) {
      throw new Error('Invalid template recieved.');
    }

    instance = new template();
    /**
     * We don't want the first word of the title to be interpreted as an HTML tag.
     */
    fullTitleString = instance.title.startsWith('|') ? instance.title : `| ${instance.title}`;

    this.templates.set(template, {
      message: pugCompile(instance.body, this.pugCompileOptions),
      title: pugCompile(fullTitleString, this.pugCompileOptions),
    });

    return this.templates.get(template) as EmailTemplateRenderer;
  }

  /**
   * Returns the rendered HTML message.
   * @param template the template to render
   * @param locals the variables passed to the renderer
   */
  renderMessage<T extends BaseEmailTemplate>(template: new () => T, locals?: T['templateParametersType']): string {
    const renderer = this.getTemplateInstance(template);

    return renderer.message(locals);
  }

  /**
   * Returns the rendered HTML title.
   * @param template the template to render
   * @param locals the variables passed to the renderer
   */
  renderTitle<T extends BaseEmailTemplate>(template: new () => T, locals?: T['templateParametersType']): string {
    const renderer = this.getTemplateInstance(template);

    return renderer.title(locals);
  }

  private getTemplateInstance<T extends BaseEmailTemplate>(template: new () => T): EmailTemplateRenderer {
    const pugTemplateRendererFn = this.templates.get(template);

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
