export const keyboardData = {
    keys: {},
}

export const keyboardMethods = {

    onKeyDown(e:KeyboardEvent)
    {
        this.keys[e.key] = true

        if(e.ctrlKey)
        {
            if(e.key == 's')
            {
                e.preventDefault()
                e.stopPropagation()
                const save_file = new File([JSON.stringify({nodes:this.nodes.map(node => node.position),connections:this.connections})], 'save.json', {type: 'application/json'})
                const save_link = document.createElement('a')
                save_link.href = URL.createObjectURL(save_file)
                save_link.download = 'graph.json'
                save_link.click()
                save_link.remove()
                this.keys['Control'] = false
                this.keys[e.key] = false
            }

            if(e.key == 'l')
            {
                e.preventDefault()
                e.stopPropagation()
                const load_file = document.createElement('input')
                load_file.type = 'file'
                load_file.accept = 'application/json'
                load_file.onchange = (e) =>
                {
                    const file = (e.target as HTMLInputElement) .files[0]
                    console.log(file)
                    const reader = new FileReader()
                    reader.onload = (e) =>
                    {
                        const {connections,nodes} = JSON.parse(reader.result as string)
                        this.connections = connections
                        this.nodes = nodes
                        this.parse_saved_nodes()
                        this.update_colors()
                        this.save()
                        this.draw()
                    }
                    reader.readAsText(file)
                }
                load_file.click()
                load_file.remove()
                this.keys['Control'] = false
                this.keys[e.key] = false
            }

            if(e.key == 'c')
            {
                e.preventDefault()
                e.stopPropagation()
                this.connections = []
                this.nodes = []
                this.save()
                this.draw()
                this.keys['Control'] = false
                this.keys[e.key] = false
            }
        }
    },

    onKeyUp(e:KeyboardEvent)
    {
        this.keys[e.key] = false
        
    }
}