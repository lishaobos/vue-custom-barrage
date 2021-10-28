# `vue-custom-barrage`

支持用户使用插槽自定义弹幕，使用简单, 无须担心 XSS

## [DEMO](http://1.14.65.92/)


## Install

```
npm i vue-custom-barrage
```

## Use

```
import Vue from 'vue'
import Barrage from 'vue-custom-barrage';

Vue.use(Barrage)
```


## Example

```
<Barrage :data='barrageData' />


export default {
  data() {
    return {
      barrageData: ['text1', 'text2', 'text3']
    }
  }
}
```

```
<Barrage :data='barrageData'>
  <template #default='data'>
    <div>自定义弹幕 {{ data.text }}</div>
  </template>
</Barrage>

export default {
  data() {
    return {
      barrageData: [
        { text: 'text1' },
        { text: 'text2' },
        { text: 'text3' },
      ]
    }
  }
}
```

## Options

参数 | 描述 | 类型 | 可选值 | 默认值
--|:--:|--:|--:|--:
pause | 是否全部暂停 | boolean | - | false
touchPause | 是否触摸弹幕暂停 | boolean | - | false
barrageClass | 弹幕类名 | string | - | -
barrageStyle | 弹幕样式 | object | - | -
showArea | 弹幕展示区域 | string | top / middle / bottom / all | all
trackHeight | 弹幕轨道高度 | number | - | 20
speed | 弹幕速度(单位：秒) | number | - | 10
defer | 同一轨道弹幕完全出现至下条弹幕首次出现的间隔(单位：秒) | number | - | 0.5
data | 弹幕数据 | array | - | []