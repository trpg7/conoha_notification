import Attachment from './model/attachment';
import Field from './model/field';
import SlackPostParam from './model/slackPostParam';
import { ConohaTokenResponse } from './model/conohaTokenResponse';
import { PaymentResponse } from './model/paymentResponse';
import { BillingResponse, BillingInvoice } from './model/billingResponse';
import slack from './slack';
import conoha from './conoha';
import enums from './enums';

interface SlackConfig {
  [index: number]: {
    iconUrl: string;
    color: string;
    text: string;
  };
}

const slackConfig: SlackConfig = {
  [enums.CONOHA_ICON.JOY]: {
    iconUrl: 'https://icon.trpg7.site/joy.png',
    color: 'good',
    text: '今の残高だよ！',
  },
  [enums.CONOHA_ICON.ANGRY]: {
    iconUrl: 'https://icon.trpg7.site/angry.png',
    color: 'warning',
    text: '今の残高だよ！ ちょっとピンチ！',
  },
  [enums.CONOHA_ICON.CRY]: {
    iconUrl: 'https://icon.trpg7.site/cry.png',
    color: 'danger',
    text: '今の残高だよ！ すごくピンチ！',
  },
};

const isSameMonth = (right: Date, left: Date): boolean => {
  const result = right.getUTCFullYear() === left.getUTCFullYear()
    && right.getUTCMonth() === left.getUTCMonth();
  return result;
};

const getState = (balance: number): number => {
  if (balance >= 500) {
    return enums.CONOHA_ICON.JOY;
  }
  if (balance >= 200) {
    return enums.CONOHA_ICON.ANGRY;
  }
  return enums.CONOHA_ICON.CRY;
};

const getCurrentBillingInvoive = (billingResponse: BillingResponse): BillingInvoice => {
  const now = new Date();
  return billingResponse.billing_invoices.find((element) => {
    const result = isSameMonth(new Date(element.due_date), now);
    return result;
  });
};

const run = async (): Promise<void> => {
  const conohaTokenResult = await conoha.getToken();
  const conohaTokenResponse: ConohaTokenResponse = conohaTokenResult.data;
  const conohaToken = conohaTokenResponse.access.token.id;

  const paymentResult = await conoha.getPayment(conohaToken);
  const paymentResponse: PaymentResponse = paymentResult.data;
  const payment = paymentResponse.payment_summary.total_deposit_amount;

  const billingResult = await conoha.getBilling(conohaToken);
  const billingInvoice = getCurrentBillingInvoive(billingResult.data);

  const bill = billingInvoice.bill_plus_tax;

  const balance = payment - bill;

  const state = getState(balance);
  const config = slackConfig[state];

  const channel = 'server_management';
  const { text } = config;
  const attachments = [new Attachment(config.color, [new Field('残高', `¥ ${balance}`)])];
  const { iconUrl } = config;
  const username = 'Conoha残高お知らせ';

  const slackPostParams = new SlackPostParam(channel, text, attachments, iconUrl, username);

  await slack.postMessage(slackPostParams);
};

run();
