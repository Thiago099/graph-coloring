import { draw_circle } from '@/entities/circle'

export const graphicsData = {
    screen:null,
    circle:null,
    nodes:[],
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
        ctx.beginPath()
        ctx.moveTo(this.connect_point.position.x,this.connect_point.position.y)
        ctx.lineTo(this.mouse.x,this.mouse.y)
        ctx.lineWidth = 7
        ctx.strokeStyle = this.style.getPropertyValue('--bright'),
        ctx.stroke()
        ctx.lineWidth = 3
        ctx.strokeStyle = this.style.getPropertyValue('--medium'),
        ctx.stroke()
      }

      for(const point of this.nodes)
      {
        draw_circle(ctx, point.circle, point.position)
      }
      
    }

}