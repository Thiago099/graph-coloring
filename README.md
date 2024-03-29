# Graph coloring

This is an interactive graph editor that colors the graph with the least amount of colors possible so there is no node with the same color connected

[more information about the problem](https://en.wikipedia.org/wiki/Graph_coloring)

https://github.com/Thiago099/graph-coloring/assets/66787043/2f62da31-be2a-4eac-98f1-327af39e3cd1


[live demo](https://thiago099.github.io/graph-coloring/)

[download some examples](https://github.com/Thiago099/graph-coloring/tree/master/examples)

## commands

Left button to create a node
left button on a node to move it
Middle button to connect (if there is no legal target it will create an end node)
Right button to delete

Middle button on empty space to create node and start a connection from it

The left button on empty space to create a node and drag it

Right button on the empty space to move everything

ctrl+s to save in a file 

ctrl+l to load in a file

ctrl+c to clear

## explanation of the algorithm
```
for each node find some of its odd node count cycles
Sort the nodes and connections by the odd cycles found so the algorithm eliminates the maximum amount of odd cycle nodes
Loop:
  Chose the first node and set it to the current color (the highest odd cycle node), ignore all the nodes around it and from them chose the next highest priority node
  Eliminate the done nodes as its odd cycles as they are now broken
  Sort the remaining nodes by their odd cycles
  Increment the current color
  
```
[implementation](https://github.com/Thiago099/graph-coloring/blob/master/src/app/solve.ts)


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

## Animation
here is the repository to the procedural graph coloring animation generation program

https://github.com/Thiago099/graph-coloring-animator
