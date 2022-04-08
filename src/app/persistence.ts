
export const persistenceMethods = {

    save(){
        localStorage.setItem('nodes', JSON.stringify(this.nodes.map(node => node.position)))
        localStorage.setItem('connections', JSON.stringify(this.connections))
    }
    
}