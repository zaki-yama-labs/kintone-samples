devnet サンプルカスタマイズ: Google カレンダー連携
=======================================================

[kintoneのイベント・フェアカレンダーの日程をGoogleカレンダーに公開しよう！ – cybozu developer network](https://developer.cybozu.io/hc/ja/articles/115005646066-kintone%E3%81%AE%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88-%E3%83%95%E3%82%A7%E3%82%A2%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AE%E6%97%A5%E7%A8%8B%E3%82%92Google%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AB%E5%85%AC%E9%96%8B%E3%81%97%E3%82%88%E3%81%86-)


## Usage

1. Install dependencies.

```zsh
$ npm install
```

2. Change the App Id in [`customize-manifest.json`](./customize-manifest.json).

3. Run the following script.

```
$ npm start
```

It starts both compiling the TypeScript files and uploading files to Kintone environment.  
Both are running in watch mode.
