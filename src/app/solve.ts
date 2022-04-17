import { def } from "@vue/shared";

export const solveMethods = {

    solve()
    {
        const dull : number[] = [];
        const graph : number[] = [];
        for (let i = 0; i < this.nodes.length; i++) 
        {
            graph.push(0);
            dull.push(i);
        }


        //creates a array with all connections each node have
        const connections: number[][] = [];

        for (let i = 0; i < graph.length; i++)
            connections.push([]);

        for (let i = 0; i < this.connections.length; i++)
        {
            connections[this.connections[i].to].push(this.connections[i].from);
            connections[this.connections[i].from].push(this.connections[i].to);
        }

        //find all loops in the graph
        const loops: number[][] = [];


        console.clear();

        for(const node in graph)
        {
            walk(node)
        }

        function walk(node, stack : number[] = [], visited : number[] = [].fill(0, 0, graph.length))
        {
            visited[node] = 1;
            for(const current of connections[node])
            {
                if(visited[current] === 1)
                {
                    let current_stack = [...stack, node]
                    let loop_point = 0

                    for(; loop_point < current_stack.length; loop_point++)
                        if(current_stack[loop_point] == current)
                            break

                    if(loop_point !== current_stack.length)
                    {
                        current_stack = current_stack.splice(loop_point)
                    }

                    current_stack = current_stack.map(item => Number(item));

                    if(current_stack.length <= 2) continue
                    if(!connections[current_stack[0]].includes(node)) continue
                    if(current_stack.length % 2 === 0) continue

                    let found = true
                    for(const loop of loops)
                    {
                        found = false
                        if(loop.length !== current_stack.length) continue
                        for(const number of current_stack)
                        {
                            if(!loop.includes(number))
                            {
                                found = true
                                break
                            }
                        }
                        if(!found) return
                    }
                    
                    loops.push(current_stack);
                    return
                }
                else
                {
                    walk(current, [...stack, Number(node)],[...visited]);
                }
            }
        }

        const node_odds = []
        for(const node in graph) node_odds.push([])

        for(const loop in loops)
        {
            for(const node of loops[loop])
            {
                node_odds[node].push(Number(loop))
            }
        }
        let priority = []
        
        function updatePriority()
        {
            priority = []
            for (let i = 0; i < graph.length; i++)
            {
                priority.push({
                    id : i, 
                });
            }
            priority.sort((a,b) => { 
                function cauculate_priority(obj,i:number,j:number)
                {
                    
                    let value =  node_odds[i].filter(item=> !loops[item].includes(j) && loops[item].every(item => graph[item] > current_color || connections[i].includes(item) || item == i)) 
                    const cost = []
                    if(value.length != 0)
                    {
                        for(const odd of node_odds)
                        {
                            for(const loop of odd)
                            {
                                if(
                                    !cost.includes(loop) &&
                                    !loops[loop].includes(i) &&
                                    loops[loop].every(item => graph[item] > current_color || connections[i].includes(item) || item == i) 
                                )
                                {
                                    cost.push(loop)
                                }
                            }
                        }
                    }
                    obj.odds = value.length - cost.length
                    return obj.odds
                }
                return cauculate_priority(b,b.id,a.id) > cauculate_priority(a,a.id,b.id) ? 1 : -1
            })
        }


        let current_color = 0;
        for (let i = 0; i < graph.length; i++)
        {
            priority.push({
                id : i, 
                odds:node_odds[i].length
            });
        }
        priority.sort((a, b) => b.odds-a.odds)
        const done = Array(graph.length).fill(false);
        while (true)
        {
            let i = 0
            if(priority.every(item => item.odds === 0))
            {
                for(const node in graph)
                {
                    active(node)
                }
                break
                function active(node)
                {
                    if(graph[node] == current_color && !done[node])
                    {
                        const passive_nodes = []
                        done[node] = true
                        for(const connection of connections[node])
                        {
                            if(graph[connection] === current_color)
                            {
                                graph[connection]++
                                passive_nodes.push(connection)
                            }
                        }
                        for(const node of passive_nodes)
                        {
                            for(const connection of connections[node])
                            {
                                active(connection)
                            }
                        }
                    }
                    
                }
            }
            else
            while((!dull.every(item => done[item] || graph[item] == current_color + 1)) && i < priority.length)
            {
                const node = priority[i]
                if(graph[node.id] == current_color && !done[node.id])
                {
                    done[node.id] = true
                    for(const odd_id in node_odds)
                    {
                        if(odd_id != node.id)
                        node_odds[odd_id] = node_odds[odd_id].filter(item => !node_odds[node.id].includes(item))
                    }
                    
                    node_odds[node.id] = []
                    for(const connection of connections[node.id])
                    {
                        if(graph[connection] === current_color)
                        {
                            connections[connection] = connections[connection].filter(connection => connection != node.id);
                            graph[connection]++
                        }
                    }
                    updatePriority()
                    i = 0
                }
                else
                {
                    i++
                }
            }
            current_color++;
            
        }
        

        return graph

    }
}
