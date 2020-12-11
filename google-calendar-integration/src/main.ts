declare let kintone: any;
declare let gapi: any;
declare let process: any;

(function () {
  "use strict";
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

  function initClient() {
    gapi.client
      .init({
        discoveryDocs: discovery_docs,
        clientId: client_id,
        scope: scope,
      })
      .then(function () {
        // Google認証済みのチェック
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
          // Google認証の呼び出し
          gapi.auth2.getAuthInstance().signIn();
        }
      });
  }

  // APIクライアントとOauth2モジュールのロード
  // モジュールロード後のinitClient関数の呼び出し
  gapi.load("client:auth2", {
    callback: function () {
      // gapi.clientのイニシャライズ処理
      initClient();
    },
    onerror: function () {
      // エラー時の処理
      alert("gapi.client のロードに失敗しました!");
    },
  });

  function publishEvent(event: any) {
    // レコードのデータの取得
    const record = kintone.app.record.get().record;
    if (record) {
      // Google認証済みのチェック
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        // Google認証の呼び出し
        gapi.auth2.getAuthInstance().signIn();
        alert("Google認証されていません。");
        return;
      }
      // API リクエスト
      // リクエストパラメータの設定
      const params = {
        // イベントのタイトル
        summary: record.event_name.value,
        start: {
          // 開始日・時刻
          dateTime: record.start_datetime.value,
          timeZone: "America/Los_Angeles",
        },
        end: {
          // 終了日・時刻
          dateTime: record.end_datetime.value,
          timeZone: "America/Los_Angeles",
        },
        // 場所の指定
        location: record.event_location.value,
        // イベントの説明
        description: record.event_description.value,
      };
      let request;
      // リクエストメソッドとパラメータの設定
      // 公開済みイベントを更新
      if (record.event_id.value) {
        request = gapi.client.calendar.events.update({
          calendarId: calendar_id,
          eventId: record.event_id.value,
          resource: params,
        });
      } else {
        // 未公開のイベントを追加
        request = gapi.client.calendar.events.insert({
          calendarId: calendar_id,
          resource: params,
        });
      }
      // Googleカレンダーへのイベント登録の実行
      request.execute(
        function (resp: any) {
          if (resp.error) {
            alert("イベントの登録に失敗しました。");
          } else {
            const body = {
              app: kintone.app.getId(),
              id: record.$id.value,
              record: {
                event_id: {
                  value: resp.result.id,
                },
              },
            };
            return kintone
              .api(kintone.api.url("/k/v1/record", true), "PUT", body)
              .then(function (success: any) {
                alert("カレンダーにイベントを登録しました。");
                location.reload();
              })
              .catch(function (error: any) {
                alert("Google イベントIDの登録に失敗しました。");
              });
          }
        },
        function (error: any) {
          alert("Google イベントIDの登録に失敗しました。");
        }
      );
    }
  }

  // レコード詳細画面の表示後イベント
  kintone.events.on("app.record.detail.show", function (event: any) {
    // 増殖バグ回避
    if (document.getElementById("publish_button") !== null) {
      return event;
    }
    // 画面下部にボタンを設置
    const publishButton = document.createElement("button");
    publishButton.id = "publish_button";
    publishButton.innerHTML = "公開する";
    publishButton.className = "button-simple-cybozu geo-search-btn";
    // @ts-ignore
    publishButton.style = "margin-top: 30px; margin-left: 10px;";
    publishButton.addEventListener("click", function () {
      publishEvent(event);
    });
    kintone.app.record
      .getSpaceElement("publish_button_space")
      .appendChild(publishButton);
    return event;
  });

  kintone.events.on(
    ["app.record.create.show", "app.record.edit.show"],
    function (event: any) {
      // フィールドを編集不可へ
      event.record.event_id.disabled = true;
      return event;
    }
  );
})();
