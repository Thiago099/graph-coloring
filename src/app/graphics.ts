import { draw_circle } from '@/entities/circle'

export const graphicsData = {
    screen:null,
    circle:null,
    nodes:[],
}

export const graphicsMethods = {

    draw()
    {
      const ctx : CanvasRenderingContext2D = this.screen.getContext('2d')
      ctx.clearRect(0,0,this.screen.width,this.screen.height)
      for(const point of this.nodes)
      {
        draw_circle(ctx, point.circle, point.position)
      }
    }

}