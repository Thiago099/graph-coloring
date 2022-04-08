import { pointDistance } from '@/entities/point'

export const mouseData = {
  drag_point:null,
  connect_point:null,
  drag_offset:null,
  mouse:null,
}

export const mouseMethods = {
  
    onMouseDown(e:MouseEvent)
    {
      e.preventDefault()
      this.updateMousePosition(e)
      let point = this.nodes.find(p => pointDistance(p.position,this.mouse) < p.circle.radius)
      if(point)
      {
        switch(e.button){
          // drag
          case 0:
            this.drag_point = point
            this.drag_offset = {
              x: point.position.x - this.mouse.x,
              y: point.position.y - this.mouse.y
            }
            break;
          // connect
          case 1:
            this.connect_point = point
            break;
          // delete
          case 2:
            {
              const delete_node = this.nodes.indexOf(point)
              this.nodes.splice(delete_node,1)
              this.connections = this.connections.filter(connection => connection.from !== point && connection.to !== point)
              this.connections = this.connections.map(connection => {
                if(connection.from > delete_node-1) connection.from--;
                if(connection.to > delete_node-1) connection.to--
                return connection
              })
              this.save()
            this.draw()
            }
            
            break;
        }
      }
      else
      {
        // new
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
        this.drag_point = point
      }
    },

    onMouseMove(e:MouseEvent)
    {
      this.updateMousePosition(e)
      // on drag
      if(this.drag_point)
      {
        this.drag_point.position.x = this.mouse.x + this.drag_offset.x
        this.drag_point.position.y = this.mouse.y + this.drag_offset.y
        this.draw()
      }
      // on connect
      if(this.connect_point)
      {
        this.draw()
      }
    },

    onMouseUp(e:MouseEvent){
      this.updateMousePosition(e)
      // end connect
      if(this.connect_point)
      {
        const point = this.nodes.find(p => pointDistance(p.position,this.mouse) < p.circle.radius)
        if(point)
        {
          this.connections.push({
            from: this.nodes.indexOf(this.connect_point),
            to: this.nodes.indexOf(point),
          })
        }
        else
        {
          const node = {
            circle: this.circle,
            position: this.mouse,
          }
          this.nodes.push(node)
          this.connections.push({
            from: this.nodes.indexOf(this.connect_point),
            to: this.nodes.indexOf(node),
          })
        }
      }
      this.save()
      // clear state
      this.drag_point = null
      this.connect_point = null 
      this.draw()
    },

    updateMousePosition(e:MouseEvent){
      const { offsetX, offsetY } = e
      this.mouse = {
        x: offsetX,
        y: offsetY
      }
    }
}