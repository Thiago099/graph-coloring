import { pointDistance } from '@/entities/point'

export const mouseData = {
  drag_point:null,
  connect_point:null,
  drag_offset:null,
  mouse:null,
  drag_all_offsets:null,
}

export const mouseMethods = {
  
    onMouseDown(e:MouseEvent)
    {
      e.preventDefault()
      this.updateMousePosition(e)
      let point = this.nodes.find(p => pointDistance(p.position,this.mouse) < p.circle.radius)
      if(point)
      {
        switch(e.button)
        {
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
              this.connections = this.connections.filter(connection => connection.from != delete_node && connection.to != delete_node)
              if(!this.keys['Control'])
              {
                this.nodes.splice(delete_node,1)
                this.connections = this.connections.map(connection => {
                  if(connection.from > delete_node) connection.from--;
                  if(connection.to > delete_node) connection.to--
                  return connection
                })
              }
              this.save()
              this.update_colors()
              this.draw()
            }
            
            break;
        }
      }
      // new
      else if(e.button == 0)
      {
        point = {
          circle: this.circles[0],
          position: this.mouse,
        }
        this.drag_offset = {
          x: 0,
          y: 0
        }
        point.position.x = this.mouse.x
        point.position.y = this.mouse.y
        this.nodes.push(point)
        this.save()
        this.update_colors()
        this.draw()
        this.drag_point = point
      }else if(e.button == 1)
      {
        point = {
          circle: this.circles[0],
          position: this.mouse,
        }
        this.nodes.push(point)
        this.connect_point = point
      }else if(e.button == 2)
      {
        this.drag_all_offsets = []
        for(const node of this.nodes)
        {
          this.drag_all_offsets.push({
            x: node.position.x - this.mouse.x,
            y: node.position.y - this.mouse.y
          })
        }
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
      if(this.drag_all_offsets)
      {
        for(let i = 0; i < this.nodes.length; i++)
        {
          this.nodes[i].position.x = this.mouse.x + this.drag_all_offsets[i].x
          this.nodes[i].position.y = this.mouse.y + this.drag_all_offsets[i].y
        }
        this.draw()
      }
    },

    onMouseUp(e:MouseEvent)
    {
      this.updateMousePosition(e)
      // end connect
      if(this.connect_point)
      {
        const point = this.nodes.find(p => pointDistance(p.position,this.mouse) < p.circle.radius)
        if(point)
        {
          const from = this.nodes.indexOf(this.connect_point)
          const to = this.nodes.indexOf(point)
          if(this.connect_point != point && !this.connections.some(
            connection => 
              (connection.from ==  from && connection.to == to ||
              (connection.to == from && connection.from == to)
            )
          ))
              
          {
            this.connections.push({
              from: from,
              to: to,
            })
            this.update_colors()
          }
        }
        else
        {
          const node = {
            circle: this.circles[0],
            position: this.mouse,
          }
          this.nodes.push(node)
          this.connections.push({
            from: this.nodes.indexOf(this.connect_point),
            to: this.nodes.indexOf(node),
          })
          this.update_colors()
        }
      }
      // clear state
      this.drag_point = null
      this.connect_point = null 
      this.drag_all_offsets = null
      this.save()
      this.draw()
    },

    updateMousePosition(e:MouseEvent)
    {
      this.screen.focus()
      const { offsetX, offsetY } = e
      this.mouse = {
        x: offsetX,
        y: offsetY
      }
    }
}