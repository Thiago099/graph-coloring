export const keyboardData = {
    keys: {},
}

export const keyboardMethods = {

    onKeyDown(e:KeyboardEvent)
    {
        this.keys[e.key] = true
    },

    onKeyUp(e:KeyboardEvent)
    {
        this.keys[e.key] = false
    }
}