サンプルカスタマイズ: freee 連携
=======================================================

[freeeとkintoneの連携を作りながら、OAuthについて考えてみた！ - Qiita](https://qiita.com/m_ando_japan/items/77c96d88a1ab33e980df#%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AFurl%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8Bjavascript%E3%82%92%E4%BD%9C%E6%88%90)

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
