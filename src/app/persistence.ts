
export const persistenceMethods = {

    save()
    {
        localStorage.setItem('nodes', JSON.stringify(this.nodes.map(node => node.position)))
        localStorage.setItem('connections', JSON.stringify(this.connections))
    },
    
    load()
    {
        this.nodes = JSON.parse(window.localStorage.getItem('nodes')) || []
        this.nodes = this.nodes.map(node => {return {circle: this.circle,position:node}})
        this.connections = JSON.parse(window.localStorage.getItem('connections')) || []
    }
    
}