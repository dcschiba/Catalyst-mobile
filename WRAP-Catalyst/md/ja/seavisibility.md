# Sea Visibility

### データ
- WRAP DATA ID : [WX_WNI_SeaVisibility](https://goo.gl/df5Frm)
- tagID : [411022084](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=411022084)


### 注意点
元データは、FT=384時間先まであるが、途中で解像度が変化する。  
FT=  0〜FT=192 : 時間解像度  3時間毎, 空間解像度 1760 x 880  
FT=204〜FT=384 : 時間解像度 12時間毎, 空間解像度  576 x 288  

WRAP GPV表示では可変解像度は未対応のため、（但し、個別データ対応を除く）  
Sea Visibilityに関しては、FT=192までをWRAP DATA化して表示している。  
FT=204以降も表示したい場合は、verup開発が必要。[WRAP-211 backlog](https://wni.backlog.jp/view/WRAP-211)   


### 設定
- データ [config](./pri/conf/data/WX_WNI_SeaVisibility.json)
- レイヤー [config](./pri/conf/layer/SeaVisibility.json)  
　元データの単位はmで、最小100、最大30000  
　表示側にはnautical mileへの変換が必要  
　1nm = 1852m  
　0～1nm, 1～2nm, 2～3nmの3段階で色塗りする設定  


