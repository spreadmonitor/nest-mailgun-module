import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from './template.service';
import { BaseEmailTemplate } from '../base-template.class';

describe('TemplateService', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [TemplateService],
    }).compile();
  });

  describe.only('render', () => {
    it('should render valid template', () => {
      const service = app.get(TemplateService);
      const input = `span Hello World!`;
      const output = `<span>Hello World!</span>`;

      class ValidTemplate extends BaseEmailTemplate<void> {
        public readonly body = input;
      }

      expect(service.render(ValidTemplate)).toBe(output);
    });

    it('should render correctly with passed locals', () => {
      const service = app.get(TemplateService);
      const input = `span Hello #{name}!`;
      const output = `<span>Hello World!</span>`;

      interface TemplateLocals {
        name: string;
      }

      class ValidTemplate extends BaseEmailTemplate<TemplateLocals> {
        public readonly body = input;
      }

      expect(service.render(ValidTemplate, { name: 'World' })).toBe(output);
    });
  });
});
