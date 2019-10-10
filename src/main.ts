import Attachment from './model/attachment';
import Field from './model/field';
import SlackPostParam from './model/slackPostParam';
import slack from './slack';

const run = async (): Promise<void> => {
  const channel = 'server_management';
  const text = '今の残高だよ！';
  const attachments = [new Attachment('good', [new Field('残高', '114514')])];
  const iconUrl = 'https://icon.trpg7.site/cry.png';
  const username = 'Conoha残高お知らせ';

  const slackPostParams = new SlackPostParam(channel, text, attachments, iconUrl, username);

  await slack.postMessage(slackPostParams);
};

run();
