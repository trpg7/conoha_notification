import Field from './field';

export default class Attachment {
  private color: string;

  private fields: Field[];

  constructor(color: string, fields: Field[]) {
    this.color = color;
    this.fields = fields;
  }

  toObject(): object {
    return {
      color: this.color,
      fields: this.fields,
    };
  }
}
