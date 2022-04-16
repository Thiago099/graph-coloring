
export const solveMethods = {

    solve()
    {
        const graph : number[] = [];
        for (let i = 0; i < this.nodes.length; i++) graph.push(0);


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
        for(const node in graph) node_odds[node] = []

        for(const loop in loops)
        {
            for(const node of loops[loop])
            {
                node_odds[node].push(loop)
            }
        }
        let priority = []
        updatePriority()
        function updatePriority()
        {
            priority = []
            for (let i = 0; i < graph.length; i++)
            {
                priority.push({
                    id : i, 
                    odds : node_odds[i].length - connections[i].reduce((previous, current) => previous + node_odds[current].filter(item=> !loops[item].includes(i)).length, 0)
                });
            }
            priority.sort((a,b) => { 
                return b.odds - a.odds
            });
        }


        let busy = true;
        let current_color = 0;

        while (busy)
        {
            busy = false
            for(const node of priority)
            {
                active(node.id)
                updatePriority()
            }
            function active(start)
            {
                if(graph[start] == current_color)
                {
                    const passive_connections = [];
                    const odds = node_odds[start]
                    for(const odd_id in node_odds)
                    {
                        node_odds[odd_id] = node_odds[odd_id].filter(item => !odds.includes(item))
                    }
                    for(const connection of connections[start])
                    {
                        if(graph[connection] === current_color)
                        {
                            connections[connection] = connections[connection].filter(connection => connection != start);
                            graph[connection]++
                            passive_connections.push(connection)
                            busy = true
                        }
                    }
                    const passive_priority  = [];

                    for(const passive of passive_connections)
                    {
                        passive_priority.push({
                            id : passive, 
                            odds :connections[passive].reduce((previous, current) => {
                                const current_cost = node_odds[current].length - connections[current].reduce((previous, current_inner) => previous + node_odds[current_inner].filter(item=> !loops[item].includes(current)).length, 0)
                                return current_cost > previous ? current_cost : previous
                            }, 0)
                        });
                    }

                    passive_priority.sort((a,b) => { 
                        return b.odds - a.odds ;
                    });
                    for(const active of passive_priority)
                    {
                        passive(active.id);
                    }
                }

            }
            function passive(start)
            {
                const active_priority = [];
                for(const passive of connections[start])
                {
                    active_priority.push({
                        id : passive, 
                        odds : node_odds[passive].length - connections[passive].reduce((previous, current) => previous + node_odds[current].filter(item=> !loops[item].includes(passive)).length, 0)
                    });
                }
                active_priority.sort((a,b) => { 
                    return b.odds - a.odds;
                });
                for(const passive of active_priority)
                {
                    active(passive.id);
                }
            }
            current_color++;
        }
        

        //graph
        //node_odd_count
        return graph

    }
}
