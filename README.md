# nest-mailgun-module

![Build Status](https://github.com/spreadmonitor/nest-mailgun-module/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/spreadmonitor/nest-mailgun-module/branch/develop/graph/badge.svg)](https://codecov.io/gh/spreadmonitor/nest-mailgun-module)

Re-usable [NestJS](https://github.com/nestjs/nest) module for sending emails via [Mailgun](https://www.mailgun.com/).

## Installation

```bash
$ npm install @spreadmonitor/nest-mailgun-module
```

## Usage

```ts
import { Module } from '@nestjs/common';
import { MailgunModule } from '@spreadmonitor/nest-mailgun-module';

import * as TEMPLATES from './email-templates';

@Module({
  imports: [
    MailgunModule.forRoot({
      templates: TEMPLATES,
      sender: 'Fancy Co. <no-reply@fancy.com>',
      mailgunApiKey: process.env['MAILGUN_API_KEY'],
      mailgunDomain: process.env['MAILGUN_DOMAIN'],
    }),
  ],
  exports: [MailgunModule],
})
export class CoreModule {}
```

```ts
import { SignupService } from '@app/auth/services';
import { MailService } from '@spreadmonitor/nest-mailgun-module';
import { WelcomeTemplate } from '@app/auth/email-templates';

@Controller('auth')
export class SignupController {
  constructor(private readonly signupService: SignupService, private readonly mailService: MailService) {}

  @Post('signup')
  async createAccount(@Body() payload: SignupPayload): string {
    await this.signupService.createAccount();

    await this.mailService.send(payload.email, WelcomeTemplate, {
      name: payload.name,
    });

    return { message: 'Yay! Account created!' };
  }
}
```

For detailed usage please read the [documentation](docs/usage.md).

## Contact

- Author - [Attila Olah](https://twitter.com/NoNameProvided_)
- Repository - [spreadmonitor/nest-mailgun-module](https://github.com/spreadmonitor/nest-mailgun-module)

## License

This project is licensed under [MIT](https://choosealicense.com/licenses/mit/).
