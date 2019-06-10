import { BaseEmailTemplate } from 'src/base-template.class';

/**
 * The options object passed to the MailgunModule.forRoot function.
 */
export class MailgunModuleOptions {
  /**
   * Array of initial template classes. New templates can be registered later via the `TemplateService.registerTemplate()` function.
   */
  templates: { [className: string]: new () => BaseEmailTemplate };

  /**
   * The Mailgun domain. (Note: The sender domain must be passed here not the API domain.)
   *
   * @example `sandboxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org`
   */
  mailgunDomain: string;

  /**
   * The API key for the specified Mailgun domain.
   *
   * FORMAT: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx-xxxxxxxx`
   */
  mailgunApiKey: string;
}
