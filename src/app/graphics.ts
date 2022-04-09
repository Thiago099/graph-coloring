import { draw_circle } from '@/entities/circle'
import { point } from '@/entities/point'

export const graphicsData = {
    screen:null,
    circles:[],
    nodes:[],
    connections:[],
    lines:[],
    style:null,
}

export const graphicsMethods = {

    draw()
    {
      const ctx : CanvasRenderingContext2D = this.screen.getContext('2d')
      ctx.clearRect(0,0,this.screen.width,this.screen.height)
      
      if(this.connect_point)
      {
        this.draw_line(ctx,this.connect_point.position,this.mouse)
      }

      for(const connection of this.connections)
      {
        this.draw_line(ctx,this.nodes[connection.from].position,this.nodes[connection.to].position)
      }

      for(const point of this.nodes)
      {
        draw_circle(ctx, point.circle, point.position)
      }
      
    },

    draw_line(ctx:CanvasRenderingContext2D, from:point, to:point)
    {
      ctx.beginPath()
      ctx.moveTo(from.x,from.y)
      ctx.lineTo(to.x,to.y)
      ctx.lineWidth = 7
      ctx.strokeStyle = this.style.getPropertyValue('--bright'),
      ctx.stroke()
      ctx.lineWidth = 3
      ctx.strokeStyle = this.style.getPropertyValue('--medium'),
      ctx.stroke()
    }

}