/**
 * A base template class what should be extend by actual templates.
 */
export abstract class BaseEmailTemplate<TemplateParameters = any> {
  public abstract readonly body: string;

  public readonly templateParameters: TemplateParameters;
}
