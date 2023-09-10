A* algorithm is a shortest path searching algorithm. 
It can be an highly intuitive algorithm meaning it stores the sum of distance from destination node and 
distance from source node and explores from the node which has minimum sum , until destination is reached.
It is way more efficient than bfs , dfs and dijkstra (dijkstra , despite being algorithmically a better algorithm than bfs , 
almost takes the same time to reach the destination as bfs). 
One major practical drawback is its O(b^d) space complexity, as it stores all generated nodes in memory.

