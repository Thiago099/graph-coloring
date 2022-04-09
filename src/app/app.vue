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
import { solveMethods } from './solve'
export default defineComponent({

  name: 'App',

  mounted()
  {
    this.screen = this.$refs.screen
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
    this.style = getComputedStyle(this.screen)
    this.screen.focus()

    this.circles.push(bake_circle({
        color:this.style.getPropertyValue('--medium'),
        border_color: this.style.getPropertyValue('--bright'),
        radius: 15,
    }))
    const colors = ['red','green','blue','yellow','orange','purple','pink','brown','black','white','gray','lime','cyan','magenta','olive','maroon','navy','teal','silver','indigo','violet']
    for(const color of colors)
    {
      this.circles.push(bake_circle({
          color,
          border_color: this.style.getPropertyValue('--bright'),
          radius: 15,
      }))
    }

    this.load()
    this.nodes[0].circle = this.circles[1]
    this.update_colors()
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
    ... solveMethods ,
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