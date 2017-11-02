# 有義波高、波向
- 有義波高、波向をmap上に表示する。
- LOWRESOとHIGHRESOのデータの組み合わせ「Wave Blend」

### データ
- WX_WNI_WWIII_HIGHRESO_NATL_BLEND
- WX_WNI_WWIII_HIGHRESO_NPAC_BLEND
- WX_WNI_WWIII_HIGHRESO_SEASIA_BLEND
- WX_WNI_WWIII_HIGHRESO_LOWRESO_BLEND

### データ設定
- WX_WNI_WWIII_HIGHRESO_NATL_BLEND [config](./pri/conf/data/WX_WNI_WWIII_HIGHRESO_NATL_BLEND.json)
- WX_WNI_WWIII_HIGHRESO_NPAC_BLEND [config](./pri/conf/data/WX_WNI_WWIII_HIGHRESO_NPAC_BLEND.json)
- WX_WNI_WWIII_HIGHRESO_SEASIA_BLEND [config](./pri/conf/data/WX_WNI_WWIII_HIGHRESO_SEASIA_BLEND.json)
- WX_WNI_WWIII_HIGHRESO_LOWRESO_BLEND (Wave Direction) [config](./pri/conf/data/WX_WNI_WWIII_LOWRESO_BLEND_WaveDirection.json)
- WX_WNI_WWIII_HIGHRESO_LOWRESO_BLEND (Wave Height) [config](./pri/conf/data/WX_WNI_WWIII_LOWRESO_BLEND_WaveHeight.json)

### レイヤー設定
- Arrow [config](./pri/conf/layer/WaveBlendDirectionArrow.json)
- Contour [config](./pri/conf/layer/WaveBlendHeightContour.json)
- Flat [config](./pri/conf/layer/WaveBlendHeightFlat.json)