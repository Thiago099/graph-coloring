
export const persistenceMethods = {

    save(){
        localStorage.setItem('nodes', JSON.stringify(this.nodes))
    }
    
}