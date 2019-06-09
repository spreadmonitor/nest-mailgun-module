import { Test, TestingModule } from '@nestjs/testing';

import { TemplateService } from './template.service';
import { BaseEmailTemplate } from '../base-template.class';
import { MailgunModuleOptions } from '../module-options.class';

describe('TemplateService', () => {
  let app: TestingModule;

  class ValidBaseTemplateOne extends BaseEmailTemplate {
    public title: string = 'Subject';
    public body: string = `span Hello World!`;
  }
  class ValidBaseTemplateTwo extends BaseEmailTemplate<{ name: string }> {
    public title: string = 'Subject';
    public body: string = `span Hello #{name}!`;
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: MailgunModuleOptions,
          useValue: {
            templates: {
              BaseTemplateOne: ValidBaseTemplateOne,
              BaseTemplateTwo: ValidBaseTemplateTwo,
            },
          },
        },
      ],
    }).compile();
  });

  describe('constructor', () => {
    it('should register templates passed in MailgunModuleOptions', () => {
      const service = app.get(TemplateService);

      expect(service['templates'].size).toBe(2);
    });
  });

  describe('register', () => {
    it('should register valid templates', () => {
      const service = app.get(TemplateService);

      class ValidTemplate extends BaseEmailTemplate<void> {
        public readonly title: string = 'Subject';
        public readonly body: string = 'Duh';
      }

      service.registerTemplate(ValidTemplate);

      expect(service['templates'].size).toBe(3);
    });

    it('should throw error on invalid templates', () => {
      const service = app.get(TemplateService);

      class InValidTemplate extends BaseEmailTemplate<void> {
        public readonly title: string = null;
        public readonly body: string = null;
      }

      expect(() => {
        service.registerTemplate(InValidTemplate);
      }).toThrow();
      expect(service['templates'].size).toBe(3);
    });
  });

  describe('render', () => {
    it('should render valid static template', () => {
      const service = app.get(TemplateService);

      expect(service.renderMessage(ValidBaseTemplateOne)).toBe('<span>Hello World!</span>');
    });

    it('should render template correctly with passed locals', () => {
      const service = app.get(TemplateService);

      expect(service.renderMessage(ValidBaseTemplateTwo, { name: 'World' })).toBe('<span>Hello World!</span>');
    });
  });
});
