import Attachment from "./attachment";
import { MessageAttachment } from "@slack/types";

export default class SlackPostParam {
  private channel: string;

  private text: string;

  private attachments: Attachment[];

  private asUser: boolean;

  private iconUrl: string;

  private username: string;

  constructor(channel: string, text: string, attachments: Attachment[],
    iconUrl: string, username: string) {
    this.channel = channel;
    this.text = text;
    this.attachments = attachments;
    this.asUser = false;
    this.iconUrl = iconUrl;
    this.username = username;
  }

  getChannnel(): string {
    return this.channel;
  }

  getText(): string {
    return this.text;
  }

  getAttachements(): Array<MessageAttachment> {
    return JSON.parse(JSON.stringify(this.attachments));
  }

  getAsUser(): boolean {
    return this.asUser;
  }

  getIconUrl(): string {
    return this.iconUrl;
  }

  getUsername(): string {
    return this.username;
  }
}
