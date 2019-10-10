import axios, { AxiosResponse } from 'axios';
import SlackPostParam from './model/slackPostParam';

const token = process.env.NODE_SLACK_TOKEN;

const postUrl = 'https://slack.com/api/chat.postMessage';

const postMessage = (slackPostParam: SlackPostParam): Promise<AxiosResponse> => {
  const result = axios.post(postUrl, null, {
    params: {
      token,
      text: slackPostParam.getText(),
      channel: slackPostParam.getChannnel(),
      attachments: slackPostParam.getAttachements(),
      // eslint-disable-next-line @typescript-eslint/camelcase
      as_user: slackPostParam.getAsUser(),
      // eslint-disable-next-line @typescript-eslint/camelcase
      icon_url: slackPostParam.getIconUrl(),
      username: slackPostParam.getUsername(),
    },
  });
  return result;
};

export default {
  postMessage,
};
