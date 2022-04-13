
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
            dfs(node)
        }

        function dfs(node, stack:number[]=[], visited:number[]= [].fill(0, 0, graph.length))
        {
            visited[node] = 1;
            for(const current of connections[node])
            {
                if(visited[current] === 1)
                {
                    let current_stack = [...stack, node]
                    let i = 0
                    for(; i < current_stack.length; i++)
                    if(current_stack[i] == current)
                    break
                    if(i !== current_stack.length)
                    {
                        //remove all before i
                        current_stack = current_stack.splice(i)
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
                    dfs(current, [...stack,Number(node)],[...visited]);
                }
            }
        }

        const node_triangle_count = Array(graph.length).fill(0)
        const node_triangles = []
        for(const node in graph) node_triangles[node] = []

        const node_odd_count = Array(graph.length).fill(0)
        const node_odds = []
        for(const node in graph) node_odds[node] = []

        for(const loop in loops)
        {
            if(loops[loop].length === 3)
            {
                for(const node of loops[loop])
                {
                    node_triangle_count[node]++
                    node_triangles[node].push(loop)
                }
            }
            else 
            {
                for(const node of loops[loop])
                {
                    node_odd_count[node]++
                    node_odds[node].push(loop)
                }
            }
        }
        
        let priority = []
        updatePriority()
        function updatePriority()
        {
            priority = []
            for (let i = 0; i < graph.length; i++)
            {
                priority.push({id:i, triangles:node_triangle_count[i], odds:node_odd_count[i]});
            }
            priority.sort((a,b) => { 
                const triangle_diff = b.triangles - a.triangles
                return triangle_diff == 0 ? b.odds - a.odds : triangle_diff;
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
                    for(const connection of connections[start])
                    {
                        if(graph[connection] === current_color)
                        {
                            connections[connection] = connections[connection].filter(connection => connection != start);
                            const triangles = node_triangles[start]
                            for(const triangle of triangles)
                            {
                                for(const node of loops[triangle])
                                {
                                    node_triangle_count[node]--
                                    node_triangles[node] = node_triangles[node].filter(i => i != triangle)
                                }
                            }
                            const odds = node_odds[start]
                            for(const odd of odds)
                            {
                                for(const node of loops[odd])
                                {
                                    node_odd_count[node]--
                                    node_odds[node] = node_odds[node].filter(i => i != odd)
                                }
                            }
                            graph[connection]++
                            passive_connections.push(connection)
                            busy = true
                        }
                    }
                    const passive_priority  = [];

                    for(const passive of passive_connections)
                    {
                        passive_priority.push({
                            id:passive, 
                            triangles:connections[passive].reduce((previus, current)=> previus + node_triangle_count[current]), 
                            odds:connections[passive].reduce((previus, current)=> previus + node_odd_count[current])
                        });
                    }

                    passive_priority.sort((a,b) => { 
                        const triangle_diff = b.triangles - a.triangles
                        return triangle_diff == 0 ? b.odds - a.odds : triangle_diff;
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
                    active_priority.push({id:passive, triangles:node_triangle_count[passive], odds:node_odd_count[passive]});
                }
                active_priority.sort((a,b) => { 
                    const triangle_diff = b.triangles - a.triangles
                    return triangle_diff == 0 ? b.odds - a.odds : triangle_diff;
                });
                for(const passive of active_priority)
                {
                    active(passive.id);
                }
            }
            current_color++;
        }

        //graph
        //node_triangle_count
        //node_odd_count
        return graph

    }
}
