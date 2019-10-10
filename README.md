# Conohaの残高をslackに通知するやつ
## これは何？
タイトルに同じ

## 起動方法
```bash
npm install
npm run build
NODE_SLACK_TOKEN=XXX NODE_CONOHA_PASS=XXX NODE_CONOHA_TENANT_ID=XXX npm run run
```

## 備考
Conohaのtokenは有効1日なので毎回取ろうな？

## 関連リンク
Conoha API
- https://www.conoha.jp/docs/
Slack
- https://api.slack.com/methods/chat.postMessage
- https://api.slack.com/docs/message-attachments