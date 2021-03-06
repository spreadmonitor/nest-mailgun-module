/**
 * A base template class what should be extend by actual templates.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export abstract class BaseEmailTemplate<TemplateParameters = any> {
  public abstract readonly body: string;

  public abstract readonly title: string;

  /**
   * DO NOT OVERWRITE this property. It's used for type-checking.
   */
  public readonly templateParametersType!: TemplateParameters;
}
