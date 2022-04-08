<template>
  
  <canvas 
    ref="screen"
    @mousedown="onMouseDown" 
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @contextmenu="$event.preventDefault()"
  ></canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import { bake_circle } from '@/entities/circle'

import { mouseMethods, mouseData } from './mouse'
import { graphicsMethods, graphicsData } from './graphics'
import { persistenceMethods, } from './persistence'

export default defineComponent({

  name: 'App',

  mounted(){
    this.screen = this.$refs.screen
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
    this.style = getComputedStyle(this.screen)

    this.circle = bake_circle({
      color:this.style.getPropertyValue('--medium'),
      border_color: this.style.getPropertyValue('--bright'),
      radius: 15,
    })

    this.nodes = JSON.parse(window.localStorage.getItem('nodes')) || []
    this.nodes = this.nodes.map(node => {return {circle: this.circle,position:node}})
    this.connections = JSON.parse(window.localStorage.getItem('connections')) || []

    this.draw()
  },

  data(){
    return {
      ... graphicsData,
      ... mouseData,
    }
  },

  methods: {
    ... mouseMethods,
    ... graphicsMethods,
    ... persistenceMethods
  }

});
</script>