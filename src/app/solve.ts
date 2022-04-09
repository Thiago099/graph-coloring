export const solveMethods = {

    update_colors()
    {
        const colors = this.solve();
        for (let i = 0; i < this.nodes.length; i++)
        {
            this.nodes[i].circle = this.circles[colors[i]];
        }
    },

    solve()
    {
        // reset the color list
        const graph = [];
        for (let i = 0; i < this.nodes.length; i++) graph.push(0);


        //creates a array with all connections each node have
        const connections = [];

        for (let i = 0; i < graph.length; i++)
            connections[i] = [];

        for (let i = 0; i < this.connections.length; i++)
        {
            connections[this.connections[i].to].push(this.connections[i].from);
            connections[this.connections[i].from].push(this.connections[i].to);
        }

        //color the graph
        let busy = true;
        let current_color = 0;
        while (busy)
        {
            const triangles = [];

            for (let i = 0; i < graph.length; i++)
            {
                for (let j = 0; j < connections[i].length; j++)
                {
                    for (let k = 0; k < connections[connections[i][j]].length; k++)
                    {
                        if (connections[connections[i][j]][k] == i) continue;
                        for (let l = 0; l < connections[connections[connections[i][j]][k]].length; l++)
                        {
                            if (connections[connections[connections[i][j]][k]][l] == i)
                            {
                                triangles[i]++;
                            }
                        }
                            
                    }
                }
            }

            interface priority{
                id;
                priority;
            }

            const priority : priority[] = []
            function update_priority()
            {
                for (let i = 0; i < graph.length; i++)
                {
                    priority.push({id:i, priority:triangles[i]})
                }
    
                priority.sort((a,b) => { return a.priority - b.priority; });
            }

            update_priority();

            
            busy = false;

            for (let i = priority.length - 1; i >= 0; i--)
            {
                active(priority[i].id);
                update_priority();
            }
            function active(current_start)
            {
                if (graph[current_start] == current_color)
                {
                    const pass = [];
                    for (let i = 0; i < connections[current_start].length; i++)
                    {
                        if (graph[connections[current_start][i]] == current_color)
                        {
                            connections[connections[current_start][i]] = connections[connections[current_start][i]].filter(connection => connection != current_start);
                            for (let j = 0; j < connections[current_start].length; j++)
                            {
                                if (connections[current_start][j] == connections[current_start][i]) continue;
                                for (let k = 0; k < connections[connections[current_start][j]].length; k++)
                                {
                                    if (connections[connections[current_start][j]][k] == connections[current_start][i])
                                    {
                                        triangles[connections[current_start][i]]--; 
                                    }
                                }
                            }
                            
                            graph[connections[current_start][i]]++;
                            pass.push(connections[current_start][i]);
                            busy = true;
                        }
                    }

                    const active_priority : priority[] = [];
                    for (let j = 0; j < pass.length; j++)
                    {
                        active_priority.push({id:pass[j], priority:triangles[pass[j]]});
                    }
                    active_priority.sort((a,b) => { return a.priority - b.priority; });

                    for (let j = active_priority.length-1; j >= 0; j--)
                    {
                        passive(active_priority[j].id);
                    }
                }
            }
            function passive(current_start)
            {
                const passive_priority : priority[] = [];
                for (let i = 0; i < connections[current_start].length; i++)
                {
                    passive_priority.push({id:connections[current_start][i], priority:triangles[connections[current_start][i]]});
                }
                passive_priority.sort((a,b) => { return a.priority - b.priority; });
                for (let i = passive_priority.length-1; i >= 0 ; i--)
                {
                    active(passive_priority[i].id);
                }
            }
            current_color++;
        }
        return graph
    }
}