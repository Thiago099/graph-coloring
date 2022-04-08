<template>
  
  <canvas 
    ref="screen"
    @mousedown="onMouseDown" 
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
    @contextmenu="$event.preventDefault()"
    tabindex="0"
  ></canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import { bake_circle } from '@/entities/circle'

import { mouseMethods, mouseData } from './mouse'
import { keyboardMethods, keyboardData } from './keyboard'
import { graphicsMethods, graphicsData } from './graphics'
import { persistenceMethods, } from './persistence'

export default defineComponent({

  name: 'App',

  mounted()
  {
    this.screen = this.$refs.screen
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
    this.style = getComputedStyle(this.screen)
    this.screen.focus()

    this.circle = bake_circle({
        color:this.style.getPropertyValue('--medium'),
        border_color: this.style.getPropertyValue('--bright'),
        radius: 15,
    })

    this.load()
    this.draw()
  },

  data()
  {
    return {
      ... graphicsData,
      ... mouseData,
      ... keyboardData,
    }
  },

  methods: {
    ... mouseMethods,
    ... keyboardMethods,
    ... graphicsMethods,
    ... persistenceMethods,
  }

});
</script>

<style scoped>
  canvas
  {
    position: absolute;
    top: 0;
    left: 0;
  }
  canvas:focus{
    outline: none;
  }
</style>