// eslint-disable-next-line import/no-extraneous-dependencies
import { WebClient, WebAPICallResult } from '@slack/web-api';
import SlackPostParam from './model/slackPostParam';

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

const postMessage = async (slackPostParam: SlackPostParam): Promise<WebAPICallResult> => {
  const result = await web.chat.postMessage({
    text: slackPostParam.getText(),
    channel: slackPostParam.getChannnel(),
    attachments: slackPostParam.getAttachements(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    as_user: slackPostParam.getAsUser(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    icon_url: slackPostParam.getIconUrl(),
    username: slackPostParam.getUsername(),
  });
  return result;
};

export default {
  postMessage,
};
