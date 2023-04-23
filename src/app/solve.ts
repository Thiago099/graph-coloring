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

        console.clear();
        const oddLoops = [];
        const oddLoopDict = new Set();

        for(const node of dull)
        {
            dfs(node,node,[],new Set())
        }
        function dfs(current,start,path,visited)
        {
            visited.add(current)
            path.push(current)
            for(const neighbour of connections[current])
            {
                if(!visited.has(neighbour))
                {
                    dfs(neighbour,start,[...path],visited)
                }
                else if(neighbour == start && path.length > 2)
                {
                    var key = [...path].sort().join(',')
                    if(path.length % 2 == 1)
                    {
                        if(!oddLoopDict.has(key))
                        {
                            oddLoopDict.add(key)
                            oddLoops.push([...path])
                        }
                    }
                    
                }
            }
        }

        function getGraphOddLoopCount()
        {
            const graphOddLoopCount = Array(graph.length).fill(0);

            for(const loop of oddLoops)
            {
                for(const node of loop)
                {
                    graphOddLoopCount[node]++;
                }
            }
            return graphOddLoopCount;
        }

        var graphOddLoopCount = getGraphOddLoopCount();
        

        const nodeOddLoops = Array(graph.length).fill(0).map(x => []);
        for(var i = 0; i < oddLoops.length; i++)
        {
            for(const node of oddLoops[i])
            {
                nodeOddLoops[node].push(i);
            }
        }


        function sortConnections()
        {
            dull.sort((a,b) => graphOddLoopCount[b] - graphOddLoopCount[a])
            for(const connection of connections)
            {
                connection.sort((a,b) => graphOddLoopCount[b] - graphOddLoopCount[a])
            }
        }

        sortConnections()

        let current_color = 0;
        let working = true;
        const done = Array(graph.length).fill(false);

        function removeDone()
        {
            for(var i = 0; i < dull.length; i++)
            {
                if(done[dull[i]])
                {
                    for(var loop of nodeOddLoops[dull[i]])
                    {
                        oddLoops[loop] = []
                    }
                    dull.splice(i,1)
                    i--;
                }
            }
            for(const connection of connections)
            {
                for(var i = 0; i < connection.length; i++)
                {
                    if(done[connection[i]])
                    {
                        connection.splice(i,1)
                        i--;
                    }
                }
            }
        }


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
            removeDone()
            graphOddLoopCount = getGraphOddLoopCount();
            sortConnections()
            current_color++;
        }
        

        return graph

    }
}
