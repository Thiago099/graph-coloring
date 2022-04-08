import { pointDistance } from '@/entities/point'

export const mouseData = {
  drag_point:null,
  drag_offset:null,
  mouse:null,
}

export const mouseMethods = {
  
    onMouseDown(e:MouseEvent)
    {
      e.preventDefault()
      this.updateMousePosition(e)
      let point = this.nodes.find(p => pointDistance(p.position,this.mouse) < p.circle.radius*2)
      if(point)
      {
        switch(e.button){
          case 0:
            this.drag_point = point
            this.drag_offset = {
              x: point.position.x - this.mouse.x,
              y: point.position.y - this.mouse.y
            }
            break;
          case 2:
            this.nodes.splice(this.nodes.indexOf(point),1)
            this.save()
            this.draw()
            break;
        }
      }
      else
      {
        point = {
          circle: this.circle,
          position: this.mouse,
        }
        this.drag_offset = {
          x: 0,
          y: 0
        }
        point.position.x = this.mouse.x + this.drag_offset.x
        point.position.y = this.mouse.y + this.drag_offset.y
        this.nodes.push(point)
        this.save()
        this.draw()
      }
      this.drag_point = point
    },

    onMouseMove(e:MouseEvent)
    {
      this.updateMousePosition(e)
      if(this.drag_point)
      {
        this.drag_point.position.x = this.mouse.x + this.drag_offset.x
        this.drag_point.position.y = this.mouse.y + this.drag_offset.y
        this.draw()
      }
    },

    onMouseUp(e:MouseEvent){
      this.save()
      this.drag_point = null
    },

    updateMousePosition(e:MouseEvent){
      const { offsetX, offsetY } = e
      this.mouse = {
        x: offsetX,
        y: offsetY
      }
    }
}