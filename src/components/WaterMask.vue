<!-- 我是水印 -->
<script setup>

import { defineProps } from "vue";

const prop = defineProps({
    fullwindows: Boolean,
    width: {
        type: Number,
        default: 32
    },
    height: {
        type: Number,
        default: 32
    },
    zIndex: {
        type: Number,
        default: 10
    },
    xGap: {
        type: Number,
        default: 0
    },
    yGap: {
        type: Number,
        default: 0
    },
    yOffset: {
        type: Number,
        default: 0
    },
    xOffset: {
        type: Number,
        default: 0
    },
    rotate: {
        type: Number,
        default: 0
    },
    fontSize: {
        type: Number,
        default: 14
    },
    fontFamily: String,
    fontStyle: {
        type: String,
        default: 'normal'
    },
    fontVariant: {
        type: String,
        default: ''
    },
    fontWeight: {
        type: Number,
        default: 400
    },
    fontColor: {
        type: String,
        default: 'rgba(128, 128, 128, .3)'
    },
    fontStretch: {
        type: String,
        default: ''
    },
    lineHeight: {
        type: Number,
        default: 14
    },
    text: {
        type: String,
        default: ""
    }
})

function getRatio(context) {
    if (!context) {
        return 1
    }
    const backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1
    return (window.devicePixelRatio || 1) / backingStore
}


const base64UrlRef = ref('')

function init() {

    const { xGap,
        yGap,
        width,
        height,
        yOffset,
        xOffset,
        rotate,
        fontColor,
        fontStyle,
        fontVariant,
        fontStretch,
        fontWeight,
        fontFamily,
        fontSize,
        lineHeight,
        text } = prop


    const canvas = document.createElement('canvas');
    const ctx = canvas ? canvas.getContext('2d') : null

    const ratio = getRatio(ctx)

    const canvasWidth = (xGap + width) * ratio
    const canvasHeight = (yGap + height) * ratio
    const canvasOffsetLeft = xOffset * ratio
    const canvasOffsetTop = yOffset * ratio

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx.rotate(rotate * (Math.PI / 180))
    if (ctx) {
        ctx.translate(0, 0)
        // const markWidth = width * ratio
        // const markHeight = height * ratio
        // if (debug) {
        // ctx.strokeStyle = 'green'
        // ctx.strokeRect(0, 0, markWidth, markHeight)
        // }
        ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize * ratio
            }px/${lineHeight * ratio}px ${fontFamily}`
        ctx.fillStyle = fontColor
        ctx.fillText(
            text,
            canvasOffsetLeft,
            canvasOffsetTop + lineHeight * ratio
        )
        base64UrlRef.value = canvas.toDataURL()
    }
}
init()
</script>

<template>
    <div class="fmsk-plus">
        <slot></slot>
        <div class="fmsk-inner" :style="{
            backgroundImage: `url(${base64UrlRef})`,
            zIndex: zIndex
        }"
        :class="{
            fullwindows 
        }"
        ></div>
    </div>
</template>


<style scoped>
.fmsk-plus {
    position: relative;
}

.fmsk-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-repeat: repeat;
}

.fullwindows {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: fixed;
}
</style>