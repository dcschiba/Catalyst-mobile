### gitのインストール

#### インストール

以下のサイトから、OSに合ったgitのインストーラをダウンロードしてください。

https://git-scm.com/download

インストーラを実行して、gitをインストールしてください。  
特に理由がなければ設定はデフォルトのままで問題ありません。

#### ユーザ認証

WRAPの提供する各種モジュールはgithub上で提供されており、モジュールをインストールする際には、githubのユーザー認証が必要になります。

以下の方法に従ってユーザー情報を設定してください。   
※ユーザ情報はWRAPチームにお問い合わせください。

##### 1.設定ファイルを作成
ホームディレクトリに.netrcファイル(windowsの場合は_netrc)を作成します。  
ターミナルで以下のコマンドを実行してください。  
※既に.netrcファイルが存在する場合は、手順1を行う必要はありません。

Mac
```
cd
touch .netrc
```

windows
```
cd %HOME%
type nul > _netrc
```

##### 2.設定ファイルの編集
.netrcにホストサーバの名前、ユーザ名、パスワードを設定しておくことで、モジュールのインストール時にgithubのユーザー認証を省略することができます。

以下のコマンドを実行して下さい。

Mac
```
echo -e "\nmachine github.com" >> .netrc
echo "login ユーザー名" >> .netrc
echo "password パスワード" >> .netrc
```

windows
```
echo; >> _netrc
echo machine github.com >> _netrc
echo login ユーザー名 >> _netrc
echo password パスワード >> _netrc
```

もしくは、.netrcファイル(_netrcファイル)に以下の内容を直接追加してください。
```
machine github.com
login ユーザー名
password パスワード
```

以上でユーザ認証の設定は終了です。
