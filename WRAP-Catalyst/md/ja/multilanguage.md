# 多言語対応
React用の多言語対応ライブラリである[react-intl](https://github.com/yahoo/react-intl)を使用してアプリケーション内の表示言語を切り替えることができます。  

WRAP-Catalystの多言語化手順については本項最後の「WRAP-Catalystの多言語化手順」も合わせてご参照ください。  
## 言語対応表
日本語と英語(その他の言語)の対応表は[こちら](https://goo.gl/6jgjRR)です


## ソースコード
本項目は[WRAP-Catalystのソースコード](https://github.com/weathernews/WRAP-Catalyst/)をベースに解説をしているため、適宜ソースコードを参照してください。  

## 初期設定

1.言語データのロード  

index.jsx  
```js
import { addLocaleData } from 'react-intl';
import ja from 'react-intl/locale-data/ja';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import vi from 'react-intl/locale-data/vi';

...
addLocaleData([...ja, ...en, ...fr, ...vi]); // 言語データのロード
```
  
2.Intl API非対応ブラウザ対応  
react-intlが内部的に使用している[Intl API](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl)を非対応のブラウザでも使えるように、ライブラリと言語データをロードします。  
※Intl API非対応ブラウザに対応させる必要がない場合は、本項目の手順は不要です。  
IntlAPI対応ブラウザ：http://caniuse.com/#search=Intl  

index.jsx
```js
if (!global.Intl) {
  /* eslint-disable global-require */
  require('intl');
  require('intl/locale-data/jsonp/ja.js');
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/fr.js');
  require('intl/locale-data/jsonp/vi.js');
}
```

## 適用範囲の設定
言語切り替えの適用範囲を設定します。  

1.メッセージ定義jsonの作成  
keyにはメッセージ定義のIDを設定し、valueに表示したいテキストを定義します。  

### 日本語
/js/locales/ja/messages.json
```json
{
    "functionList.title": "機能一覧",
    "functionList.submit": "決定",
    "functionList.noResult": "該当する検索結果はありません。",
    "functionList.explain": "解説",
    "contentList.title": "コンテンツ一覧",
    "changeLog.title": "更新履歴",
    "about.title": "WRAP-Catalystの概要",
    "about.content": "WRAP-Catalystとは・・・"
}
```

### 英語
/js/locales/en/messages.json
```json
{
    "functionList.title": "Function List",
    "functionList.submit": "SUBMIT",
    "functionList.noResult": "Did not match any contents.",
    "functionList.explain": "Explain",
    "contentList.title": "Content List",
    "changeLog.title": "Change Log",
    "about.title": "About WRAP-Catalyst",
    "about.content": "WRAP-Catalyst is ..."
}
```

2.IntlProviderを設定  
多言語化したい範囲のJSXに、react-intlが提供するIntlProviderを設定します。  
IntlProviderの`locale`には`ja`や`en`などのロケール情報、`messages`には上記で定義した`messeges.json`を設定してください。  

js/containers/Top.jsx
```js
import { IntlProvider } from 'react-intl';

...

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={css.container}>
          <div className={css.functionList}>
            <FunctionList
              data={functionList}
              changeShowContents={actions.changeShowContents}
            />
          </div>
          <ContentList
            data={contentList}
            changeShowContents={actions.changeShowContents}
          />
          <ChangeLog data={changeLog} />
          <About />
        </div>
      </IntlProvider>
    );

```

`messages.json`は言語設定ごとに切り替える必要があるため、`require`やswitch文等を使って動的に切り替えてください。  
js/containers/Top.jsx
```js
let messages;
try {
  messages = require(`../locales/${locale}/messages.json`);
} catch (error) {
  if (error.message.indexOf('Cannot find module') !== -1) {
    messages = require('../locales/en/messages.json');
  } else {
    throw error;
  }
}
```

## テキストの切り替え設定
メッセージ定義用jsonで設定したテキストをJSXで読み込みます。  

1.FormattedMessageを配置  
`IntlProvider`内のJSXにFormattedMessageを配置します。  
`id`に`messages.json`で定義したkeyを設定すると、レンダリング時にvalueに設定したワードが描画されます。  

js/components/FunctionList.jsx  
```js
import { FormattedMessage } from 'react-intl';

...

<FormattedMessage id="functionList.explain" />
```

2.デフォルト値の設定（オプション）  
idに対応するテキストがjsonファイルに記述されていなかったり、jsonファイルそのものが存在しない場合は、デフォルトでは画面にidがそのまま表示されてしまいます。  
FormattedMessageタグのdefaultMessageプロパティを設定しておくことで、idの代わりに任意のテキストを表示させることができます。  
```js
<FormattedMessage id="functionList.explain" defaultMessage="メッセージ定義がありません" />
```

## フォーマットの切り替え設定（補足）
テキストの切り替え以外に、FormattedDateやFormattedTimeを使うことで、国ごとの日付フォーマットや時間フォーマットを切り替えることも可能です。  

### 日付  
日付フォーマットを切り替えるにはFormattedDateを使用します。　　
使い方はFormattedMessageと同様で、FormattedDateをインポートし、FormattedDateタグのvalueプロパティにDate型の変数を指定することで、各言語のフォーマットに沿った日付が表示されます。  
また、year,month,dayプロパティを設定することで、各言語内での詳細なフォーマットを指定することができます。  
```js
import { FormattedDate } from 'react-intl';
const date = new Date();
・・・
return(
  <FormattedDate value={date} year="numeric" month="numeric" day="numeric" /><br />
  <FormattedDate value={date} year="numeric" month="long" day="2-digit" />
);
```

### 時間  
時間フォーマットの切り替えにはFormattedTimeを使用します。  
FormattedTimeタグのvalueプロパティにDate型の変数を指定し、hour,minuteプロパティにフォーマット形式を指定します。  
```js
import { FormattedTime } from 'react-intl';
const date = new Date();
・・・
return(
  <FormattedTime value={date} hour="numeric" minute="numeric" />
);
```

### 数値  
数値フォーマットの切り替えにはFormattedNumberを使用します。  
FormattedNumberをインポートして、valueプロパティに数値を指定します。  
```js
import { FormattedNumber } from 'react-intl';
return(
  <FormattedNumber value={1000.123} />
);
```

## オプション設定
テキストやフォーマットの切り替えにはオプションの設定が可能で、フォーマットの表示形式等を細かく設定可能です。  
詳細や他のオプションについては、react-intlの公式ページを参照してください。  
react-intl：https://github.com/yahoo/react-intl/wiki/Components

## WRAP-Catalystの多言語化手順（WRAP-Catalyst開発者向け）  

1.言語の追加  
上記「初期設定」を参照の上、追加の言語データをロードしてください。  

2.定義ファイルの作成/編集  
`js/locales`ディレクトリ内に言語ごとにディレクトリを作成し、WRAP-Catalystに必要な各ファイルを配置します。  

```
root/  
　└ js/  
　 　└ locales  
　 　　├ en・・・言語ごとにディレクトリを作成  
　 　　│ ├ changeLog.json・・・トップ画面の更新履歴  
　 　　│ ├ contentList.json・・・トップ画面のコンテンツ一覧  
　 　　│ ├ functionList.json・・・トップ画面の機能一覧  
　 　　│ └ messages.json・・・メッセージ定義（上記「適用範囲の設定」参照）  
　 　  ├ ja
　 　  ├ ...
```

messages.json内のテキストの表示は`FormattedMessage`を使用してください。  