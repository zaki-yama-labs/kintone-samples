declare let kintone: any;
declare let process: any;

type KintoneEvent = {
  [key: string]: any;
};

(function () {
  // 保存済みのfreee認証がない場合、レコードの新規作成に移動する
  kintone.events.on(["app.record.index.show"], async (event: KintoneEvent) => {
    const params = {
      app: kintone.app.getId(),
      query: "作成者 in (LOGINUSER())",
    };
    const resp = await kintone.api("/k/v1/records", "GET", params);
    if (resp.records.length !== 1) {
      location.href = location.pathname + "edit";
    }
    return event;
  });

  // 新規作成画面のリンクからOAuth画面を開く
  kintone.events.on(["app.record.create.show"], (event: KintoneEvent) => {
    const header = kintone.app.record.getHeaderMenuSpaceElement();
    console.log(header);
    header.innerHTML =
      '<div style="padding: 15px 30px">' +
      '<a href="https://app.secure.freee.co.jp/developers/applications" target="_blank">freee連携アプリ設定を開く</a>' +
      "</div>";
  });

  // 初回認証を実施するためのコードを追加
  kintone.events.on(
    ["app.record.create.submit.success", "app.record.edit.submit.success"],
    function (event: KintoneEvent) {
      location.href =
        "https://accounts.secure.freee.co.jp/public_api/authorize?" +
        "client_id=" +
        event.record.clientId.value +
        "&redirect_uri=" +
        encodeURIComponent(
          "https://" + location.host + "/k/" + kintone.app.getId() + "/"
        ) +
        "&response_type=code";
      return event;
    }
  );
})();
