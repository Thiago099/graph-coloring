
export const persistenceMethods = {

    save()
    {
        localStorage.setItem('nodes', JSON.stringify(this.nodes.map(node => node.position)))
        localStorage.setItem('connections', JSON.stringify(this.connections))
        this.update_colors()
    },
    
    load()
    {
        this.nodes = JSON.parse(window.localStorage.getItem('nodes')) || []
        this.parse_saved_nodes()
        this.connections = JSON.parse(window.localStorage.getItem('connections')) || []
        this.update_colors()
    },

    parse_saved_nodes()
    {
        this.nodes = this.nodes.map(node => {return {position:node}})   
    },
}