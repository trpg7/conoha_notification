import axios, { AxiosResponse } from 'axios';

const username = process.env.NODE_CONOHA_USERNAME;
const password = process.env.NODE_CONOHA_PASS;
const tenantId = process.env.NODE_CONOHA_TENANT_ID;

const getTokenUrl = 'https://identity.tyo1.conoha.io/v2.0/tokens';
const getPaymentUrl = `https://account.tyo1.conoha.io/v1/${tenantId}/payment-summary`;
const getBillingUrl = `https://account.tyo1.conoha.io/v1/${tenantId}/billing-invoices`;

const getToken = (): Promise<AxiosResponse> => {
  const result = axios.post(getTokenUrl, {
    auth: {
      passwordCredentials: {
        username,
        password,
      },
      tenantId,
    },
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
};

// 残高取得
const getPayment = (token: string): Promise<AxiosResponse> => {
  const result = axios.get(getPaymentUrl, {
    headers: {
      'X-Auth-Token': token,
    },
  });
  return result;
};

// 請求取得
const getBilling = (token: string): Promise<AxiosResponse> => {
  const result = axios.get(getBillingUrl, {
    headers: {
      'X-Auth-Token': token,
    },
  });
  return result;
};

export default {
  getToken,
  getPayment,
  getBilling,
};
