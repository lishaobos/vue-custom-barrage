import Track from './track'
export default class Barrage {
  constructor(instance) {
    this.instance = instance
    this.playState = 'running'
    this.tracks = []
    this.queue = []
    this.createTracks()
  }

  changePlayState(state) {
    this.playState = state
    this.instance.$el.style.setProperty('--playState', state)
  }

  pause() {
    this.changePlayState('paused')

    for (const item of this.tracks) {
      item.pause()
    }
  }

  start() {
    this.changePlayState('running')

    for (const item of this.tracks) {
      item.start()
    }
  }

  createTracks() {
    this.tracks.length = 0
    const height = this.instance.$el.offsetHeight
    const trackHeight = this.instance.trackHeight
    const stackNum = height / trackHeight
    
    // for (let i = 0; i < 1; i++) {
    for (let i = 0; i < stackNum; i++) {
      const track = new Track(i * trackHeight, this.instance, this.queue)
      this.tracks.push(track)
    }
  }

  setBullet(data) {
    Array.isArray(data) ? this.queue.push(...data) : this.queue.push(data)

    for (const track of this.tracks) {
      !track.isHidden && track.biubiu()
    }
  }

  // all top middle bottom
  showTracks(type) {
    if (type === 'all') {
      for (const track of this.tracks) {
        track.show()
      }
      return
    }
    
    const dis = Math.round(this.tracks.length / 3)
    const typeMap = {
      top: 0,
      middle: 1,
      bottom: 2
    }

    const start = typeMap[type] * dis
    const end = start + dis
    this.tracks.forEach((track, i) => {
      if (i >= start && i < end) {
        track.show()
      } else {
        if (type === 'bottom' && i >= end) track.show()
        else track.hidden()
      }
    })
  }
}