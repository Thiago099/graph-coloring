export const keyboardData = {
    keys: {},
}

export const keyboardMethods = {

    onKeyDown(e:KeyboardEvent)
    {
        this.keys[e.key] = true
    },

    onkeyUp(e:KeyboardEvent)
    {
        this.keys[e.key] = false
    }
}