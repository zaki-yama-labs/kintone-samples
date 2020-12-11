declare let kintone: any;
declare let process: any;

type KintoneEvent = {
  [key: string]: any;
};

(function () {
  // クライアントID
  const client_id = process.env.CLIENT_ID;
  // カレンダーID
  const calendar_id = process.env.CALENDAR_ID;
  // 認証用URL（読み取り／更新）
  const scope = "https://www.googleapis.com/auth/calendar";
  // Discovery Docs
  const discovery_docs = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  // 保存済みのfreee認証がない場合、レコードの新規作成に移動する
  kintone.events.on(["app.record.index.show"], async (event: KintoneEvent) => {
    const params = {
      app: kintone.app.getId(),
    };
    const resp = await kintone.api("/k/v1/records", "GET", params);
    if (resp.records.length !== 1) {
      location.href = location.pathname + "edit";
    }
    return event;
  });
})();
