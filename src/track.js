import { createVueNode } from './extend'

const getRandomNum = (start, end) => parseInt(Math.floor(Math.random() * (end - start + 1)) + start)

export default class RunWay {
    constructor(top, instance, queue) {
        this.top = top
        this.instance = instance
        this.container = instance.$el
        this.queue = queue
        this.containerWidth = this.container.getBoundingClientRect().width
        this.isFree = true
        this.currentBullet = {}
        this.timer = null
        this.startTimer = null
        this.isHidden = false
        this.isPaused = false
    }

    show() {
        this.isHidden = false
        this.biubiu()
    }

    hidden() {
        this.isHidden = true
        this.biubiu()
    }

    pause() {
        if (this.isPaused) return

        clearTimeout(this.timer)
        clearTimeout(this.startTimer)

        const now = Date.now()
        const duration = now - this.currentBullet.nextStartTime
        this.currentBullet.sportTime += duration
        this.isPaused = true
    }
    
    start() {
        if (!this.isPaused) return
        
        this.isPaused = false
        const now = Date.now()
        this.currentBullet.nextStartTime = now
        this.startTimer = setTimeout(() => {
            this.isFree = true
            this.biubiu()
        }, this.currentBullet.freeTime - this.currentBullet.sportTime)
    }

    biubiu() {
        if (!this.queue.length || !this.isFree || this.isPaused || this.isHidden) return

        this.isFree = false
        const val = this.queue.shift()
            
        const BarrageVNode = createVueNode({
            class: `barrage-bullet ${this.instance.barrageClass}`,
            style: {
                ...this.instance.barrageStyle,
                top: `${this.top}px`
            },
        }, this.instance.$scopedSlots?.default?.(val) || val)
        const barrageInstance = new BarrageVNode().$mount()

        this.container.append(barrageInstance.$el)
        
        const { width: offsetWidth } = barrageInstance.$el.getBoundingClientRect()
        const w = offsetWidth + this.containerWidth

        let { speed, defer } = this.instance
        speed *= 1000
        defer *= 1000

        let time = speed
        const { total, start } = this.currentBullet

        if (total) {
            const duration = this.currentBullet.sportTime || (Date.now() - start)
            if (total > duration) {
                let sTime = total - duration
                sTime += offsetWidth / (this.containerWidth / sTime)
                time = Math.max(sTime, time)
            }
        }

        barrageInstance.$el.style.setProperty('--offset', `-${w}px`)
        barrageInstance.$el.style.setProperty('--time', `${time}ms`)
        
        const v = w / time
        const freeTime = offsetWidth / v

        this.currentBullet = {
            start: Date.now(),
            nextStartTime: Date.now(),
            sportTime: 0,
            freeTime,
            total: time,
        }
        
        this.timer = setTimeout(() => {
            this.isFree = true
            this.biubiu()
        }, freeTime + defer)

        barrageInstance.$el.onanimationend = () => requestAnimationFrame(() => {
            barrageInstance.$el.remove()
            barrageInstance.$el = null
        })
    }
}