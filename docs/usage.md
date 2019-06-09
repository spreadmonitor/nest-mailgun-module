# Usage

## Defining templates

Templates are simple wrapper classes which must must implment the `BaseEmailTemplate` abstract class and expose the two properties `title` and `body`.

Both of them must contain a valid Pug template which will be used to generate dynamic content.

> **Note:** Never overwrite the `templateParametersType` property it's used for enforcing type-checking.

### Example

```ts
interface PasswordResetTemplateData {
  name: string;

  passwordResetLink: string;
}
class PasswordResetTemplate extends BaseEmailTemplate<PasswordResetTemplateData> {
  public readonly title: string = 'Awesome Product - Password reset request';

  public readonly body: string = `
style(type='text/css').
  .message-body {
  margin: 0.6em 10% 0.8em !important;
  }

h1 Hi #{name},
  div.message-body 
    p Someone requested a password reset for this email address. If it was you please click 
      a(href="#{passwordResetLink}") this link
    |.
    p If it wasn't you, ignore this email.
  `;
}
```
