### WRAP-modules
WRAP Applicationの開発に必要な各種モジュール（WRAP-modules）を提供しています。  

WRAP-modulesはボイラープレートに組み込んでいるため、`npm install`時に自動的にプロジェクトにインストールされます。  
各モジュールを以下のように指定することで、利用することが可能です。
```js
import DH from 'WRAP/DH';
import Geo from 'WRAP/Geo';

DH.setGoogleMaps(map);
Geo.setLayer(layer);
```

また、以下のようにモジュールをまとめてimportすることも可能ですが、使わないモジュールもソースコードに含まれてしまう（ファイルサイズが大きくなってしまう）ため、原則、個別に指定するようにしてください。
```js
import WRAP from 'WRAP';

WRAP.DH.setGoogleMaps(map);
WRAP.Geo.setLayer(layer);
```

こちらの指定方法も同様です。（指定していないモジュールもソースコードに含まれます。）
```js
import { DH, Geo } from 'WRAP';

DH.setGoogleMaps(map);
Geo.setLayer(layer);
```

各モジュールの詳細については[WRAP Documents](http://pt-wrap01.wni.co.jp/Mercury/doc/reference)をご参照ください。