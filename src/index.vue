<template>
  <div 
    :class="{ 
      'barrage-container': true,
      'barrage-container-touch': touchPause,
    }"
  />
</template>

<script>
import Barrage from './barrage'

export default {
  name: 'Barrage',
  props: {
    pause: Boolean,
    touchPause: Boolean,
    barrageClass: {
      type: String,
      default: ''
    },
    barrageStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // all top middle bottom
    showArea: {
      type: String,
      default: 'all'
    },
    trackHeight: {
      type: Number,
      default: 20
    },
    speed: {
      type: Number,
      default: 10
    },
    defer: {
      type: Number,
      default: 0.5
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.initBarrage()
  },
  methods: {
    initBarrage() {
      const barrage = new Barrage(this)

      this.$watch('showArea', barrage.showTracks.bind(barrage))

      this.$watch('pause', val => {
        if (val) return barrage.pause()

        barrage.start()
      })

      this.$watch('data', data => {
        if (!data.length) return

        barrage.setBullet([...data])
        data.length = 0
      }, { immediate: true })
    }
  }
}
</script>

<style>

@keyframes barrageMove {
  to {
    transform: translateX(var(--offset));
  }
}

.barrage-container {
  position: relative;
  overflow: hidden;
}

.barrage-bullet {
  position: absolute;
  display: inline-block;
  height: 20px;
  top: 0;;
  left: 100%;
  white-space: nowrap;
  animation-name: barrageMove;
  animation-timing-function: linear;
  animation-play-state: var(--playState);
  animation-duration: var(--time);
}

.barrage-container-touch .barrage-bullet:hover {
  cursor: pointer;
  animation-play-state: paused;
}

</style>  