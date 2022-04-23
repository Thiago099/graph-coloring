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

        const connections_ids: number[][] = [];
        for (let i = 0; i < connections.length; i++)
            connections_ids.push([]);

        for (let i = 0; i < this.connections.length; i++)
        {
            connections[this.connections[i].to].push(this.connections[i].from);
            connections[this.connections[i].from].push(this.connections[i].to);
            connections_ids[this.connections[i].to].push(i);
            connections_ids[this.connections[i].from].push(i);
        }

        //find all loops in the graph
        const loops: number[][] = [];

        console.clear();

        // const visited = Array(graph.length).fill(false);
        // visited[node] = true

        const jinxed_connections = Array(connections.length).fill(false);  
        const jinxed_nodes = Array(graph.length).fill(false);

        let spanning_tree = [] 
        walk()
        console.log(spanning_tree);
        
        

        function walk(node = 0,carry = -1, stack = [])
        {
            stack.push(node);
            for(const index in connections[node])
            {
                const connection = connections[node][index];
                if(connection != carry)
                {
                    if(!jinxed_connections[connections_ids[node][index]])
                    {
                        jinxed_connections[connections_ids[node][index]] = true;
                        walk(connection, node, stack);
                    }
                    else
                    {
                        // console.log('conn',connections[node]);
                        console.log('stack',stack, 'connection', connection);  
                    }
                }
            }
        }

        
        return graph;

        const node_odds = []
        for(const node in graph) node_odds.push([])

        for(const loop in loops)
        {
            for(const node of loops[loop])
            {
                node_odds[node].push(Number(loop))
            }
        }
        

        let current_color = 0;
        let working = true;
        
        const done = Array(graph.length).fill(false);
        while (working)
        {
            // calculate initial priority
            let priority = []
            for (let i = 0; i < graph.length; i++)
            {
                priority.push({
                    id : i, 
                    odds : node_odds[i].length
                });
            }
            priority.sort((a, b) => b.odds - a.odds)
            let i = 0
            working = false
            while(true)
            {
                let level_finished = false
                while(done[priority[i].id] || graph[priority[i].id] == current_color + 1) 
                {
                    i++
                    if(i >= priority.length-1)
                    {
                        level_finished = true
                        break
                    }
                }
                if(level_finished) break
                const visited = new Array(graph.length).fill(false);
                let group_done = false
                const node = priority[i]
                dfs(node.id)
                function dfs(node:number)
                {
                    visited[node] = true
                    for(const connection of connections[node])
                    {
                        if(!visited[connection])
                        {
                            if(priority.find(item => item.id == connection).odds != 0)
                            {
                                group_done = true
                                return
                            }
                            dfs(connection)
                        }
                    }
                }
                if(!group_done)
                {
                    for(const node of dull)
                    {
                        if(visited[node])
                        [
                            active(node)
                        ]
                    }
                    i++

                    function active(node)
                    {
                        if(graph[node] == current_color && !done[node])
                        {
                            working = true
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
                {
                    working = true
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
                    // update priority
                    priority = []
                    for (let i = 0; i < graph.length; i++)
                    {
                        const cost = []
                        for(const odd of node_odds)
                        {
                            for(const loop of odd)
                            {
                                if(
                                    !cost.includes(loop) &&
                                    !loops[loop].includes(i) &&
                                    loops[loop].every(item => graph[item] > current_color || connections[i].includes(item)) 
                                )
                                {
                                    cost.push(loop)
                                }
                            }
                        }
                        priority.push({
                            id : i, 
                            cost: cost.length
                        });
                    }
                    priority.sort((a,b) => { 
                        function calculate_priority(obj,i:number,j:number)
                        {
                            let value =  node_odds[i].filter(item=> !loops[item].includes(j) && loops[item].every(item => graph[item] > current_color || connections[i].includes(item) || item == i)) 
                            obj.odds = value.length - obj.cost
                            return obj.odds
                        }
                        return calculate_priority(b, b.id, a.id) > calculate_priority(a, a.id, b.id) ? 1 : -1
                    })
                    i = 0
                }
            }
            current_color++;
        }
        

        return graph

    }
}
