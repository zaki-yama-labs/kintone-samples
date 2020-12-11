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

  // コールバックURLに対応するJavaScriptを作成
  kintone.events.on("app.record.index.show", async (event: KintoneEvent) => {
    const params = {
      app: kintone.app.getId(),
      query: "作成者 in (LOGINUSER())",
    };
    const resp = await kintone.api("/k/v1/records", "GET", params);
    if (resp.records.length !== 1) return;

    // freee の認可コード付きで開かれた場合のみ処理する
    const queryString = location.search;
    const queryParams = new URLSearchParams(queryString);
    const code = queryParams.get("code");
    if (!code) {
      alert("freee の認証情報取得に失敗しました。");
      return;
    }

    const record = resp.records[0];
    const body =
      "grant_type=authorization_code" +
      `&client_id=${record.clientId.value}` +
      `&client_secret=${record.clientSecret.value}` +
      `&redirect_uri=${encodeURIComponent(
        `https://${location.host}/k/${kintone.app.getId()}/`
      )}` +
      `&code=${code}`;
    const header = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const tokenResp = await kintone.proxy(
      "https://accounts.secure.freee.co.jp/public_api/token",
      "POST",
      header,
      body
    );
    // tokenResp[0]: body
    // tokenResp[1]: status
    // tokenResp[2]: headers

    // TODO: status チェック

    console.log(tokenResp);
    const credentials = JSON.parse(tokenResp[0]);
    // 有効期限を日付に変換
    const expiredDateTime = new Date(
      credentials.created_at * 1000 + credentials.expires_in * 1000
    );

    const putParams = {
      app: kintone.app.getId(),
      id: record.$id.value,
      record: {
        accessToken: {
          value: credentials.access_token,
        },
        refreshToken: {
          value: credentials.refresh_token,
        },
        expiresDateTime: {
          value: expiredDateTime.toISOString(),
        },
      },
    };

    await kintone.api("/k/v1/record", "PUT", putParams);
    alert("認証に成功しました");
  });
})();
