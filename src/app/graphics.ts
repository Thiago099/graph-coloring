import { draw_circle } from '@/entities/circle'
import { point } from '@/entities/point'

export const graphicsData = {
    screen:null,
    circles:[],
    nodes:[],
    connections:[],
    lines:[],
    style:null,
    node_odd_count:[],
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
        ctx.fillStyle = 'white';
        ctx.textAlign = "center";
        // ctx.fillText(this.node_odd_count[this.nodes.indexOf(point)].toFixed(), point.position.x, point.position.y+3);
        // ctx.fillText(this.nodes.indexOf(point).toFixed(), point.position.x, point.position.y+3);
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
    },

    update_colors()
    {
        const graph = this.solve();
        // this.node_odd_count = node_odd_count
        for (let i = 0; i < this.nodes.length; i++)
        {
            this.nodes[i].circle = this.circles[graph[i]];
        }
    },

}