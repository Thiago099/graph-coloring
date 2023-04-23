# graph coloring

this is a interactive graph editor that colors the graph with the least ammount of colors possible so there is no node with the same color connected

[live demo](https://thiago099.github.io/graph-coloring/)

[download some examples](https://github.com/Thiago099/graph-coloring/tree/master/examples)

explanation of the algorithim
```
for each node find some of the odd cycles
Sort the nodes and connections by the odd cycles found so the algorithm eliminates the maximum amount of odd cycle nodes
Loop:
  Chose the first node and set it to the current color (the highest odd cycle node), ignore all the nodes around it and from them chose the next highest priority node
  Eliminate the done nodes as its odd cycles as they are now broken
  Sort the remaining nodes by their odd cycles
  Increment the current color
  
```

![](https://i.imgur.com/OkpcM09.png)

## commands

left button to create node
left button on a node to drag
middle button to connect(if there is no legal target it will create a end node)
right button to delete

middle button on empty space to create node and connect

left button on empty space to create a node and drag

right button on empty space to move everything

ctrl+s to save in file 

ctrl+l to load in file

ctrl+c to clear

# Running locally

[source code](https://github.com/Thiago099/graph-coloring)

## Install node
https://nodejs.org/en/download/

## Project setup
```
npm i
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
