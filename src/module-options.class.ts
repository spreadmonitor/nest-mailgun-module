import { BaseEmailTemplate } from '@core/base-template.class';

/**
 * The options object passed to the MailgunModule.forRoot function.
 */
export class MailgunModuleOptions {
  /**
   * Array of initial template classes. New templates can be registered later via the `TemplateService.registerTemplate()` function.
   */
  templates!: { [className: string]: new () => BaseEmailTemplate };

  /**
   * The sender used in the from field of the sent emails.
   *
   * Example: `Spreadmonitor <no-reply@spreadmonitor.com>`
   */
  sender!: string;

  /**
   * The Mailgun domain. (Note: The sender domain must be passed here not the API domain.)
   *
   * @example `sandboxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.mailgun.org`
   */
  mailgunDomain!: string;

  /**
   * The API key for the specified Mailgun domain.
   *
   * FORMAT: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx-xxxxxxxx`
   */
  mailgunApiKey!: string;

  /**
   * The root endpoint of the Mailgun API. This parameter can be used to set the differetn API root for EU domains.
   *
   * FORMAT:  `api.eu.mailgun.net` or `api.mailgun.net`
   */
  mailgunBaseUrl!: string;
}
