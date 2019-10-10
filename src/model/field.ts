export default class Field {
  private title: string;

  private value: string;

  constructor(title: string, value: string) {
    this.title = title;
    this.value = value;
  }

  toObject(): object {
    return {
      title: this.title,
      value: this.value,
    };
  }
}
