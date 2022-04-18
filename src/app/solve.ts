export const solveMethods = {

    solve()
    {
        let dull : number[] = [];
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
        let current_color = 0;
        let working = true;
        const done = Array(graph.length).fill(false);
        while (working)
        {
            working = false
            for(const node of dull)
            {
                active(node)
            }

            function active(node)
            {
                if(graph[node] == current_color && !done[node])
                {
                    console.log(node);
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
                    const vote = Array(graph.length).fill(0);
                    const vouter = Array(graph.length).fill(0);
                    const vouter_node = []
                    for(const node in dull) vouter_node.push([]); 
                    for(const cur of passive_nodes)
                    {
                        for(const connection of connections[cur])
                        {
                            if(connection != node)
                            {
                                vote[connection]++
                                vouter[cur]++
                                vouter_node[connection].push(cur)
                            }
                        }
                    }
                    console.log(vouter);
                    const vote_nodes = dull.filter(item=>vote[item] != 0)
                    vote_nodes.sort((a,b) => vote[b] != vote[a] ? vote[b] - vote[a] : 
                        vouter_node[b].reduce((previous, current) => previous + vouter[current],0) - 
                        vouter_node[a].reduce((previous, current) => previous + vouter[current],0))
                    for(const node of vote_nodes)
                    {
                        active(node)
                    }
                }
                
            }
            current_color++;
        }
        

        return graph

    }
}
