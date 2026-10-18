#!/usr/bin/env python3
import json, os, re, random, time
from typing import Optional

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'clone-graph.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def adj_to_graph(adj):
    if not adj: return None
    nodes = {i + 1: Node(i + 1) for i in range(len(adj))}
    for i, nbrs in enumerate(adj):
        nodes[i + 1].neighbors = [nodes[n] for n in nbrs]
    return nodes[1]

def graph_to_adj(node):
    if not node: return []
    visited = {}
    def dfs(curr):
        if curr.val in visited: return
        visited[curr.val] = curr
        for nbr in curr.neighbors:
            dfs(nbr)
    dfs(node)
    adj = [[] for _ in range(len(visited))]
    for val in sorted(visited.keys()):
        adj[val - 1] = [nbr.val for nbr in visited[val].neighbors]
    return adj

def get_all_nodes(node):
    if not node: return set()
    visited = set()
    def dfs(curr):
        if curr in visited: return
        visited.add(curr)
        for nbr in curr.neighbors:
            dfs(nbr)
    dfs(node)
    return visited

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    scope = {'Node': Node, 'Optional': Optional}
    exec(sol_code, scope)
    solver = scope['Solution']()

    fixed = [
        [[2,4],[1,3],[2,4],[1,3]],
        [[]],
        [],
        [[2],[1]],
        [[2,3],[1,3],[1,2]]
    ]

    for adj in fixed:
        orig = adj_to_graph(adj)
        cloned = solver.cloneGraph(orig)
        assert graph_to_adj(cloned) == adj, f"Topology mismatch for {adj}"
        if orig:
            orig_nodes = get_all_nodes(orig)
            clone_nodes = get_all_nodes(cloned)
            # Verify deep copy (no shared node instances)
            assert len(orig_nodes.intersection(clone_nodes)) == 0, "Clone graph returned shared node references"

    # Scale test: 50 nodes cycle
    adj50 = []
    for i in range(1, 51):
        prev = 50 if i == 1 else i - 1
        nxt = 1 if i == 50 else i + 1
        adj50.append([prev, nxt])
    orig50 = adj_to_graph(adj50)
    t0 = time.perf_counter()
    cloned50 = solver.cloneGraph(orig50)
    t1 = time.perf_counter()
    assert graph_to_adj(cloned50) == adj50
    print(f"✓ Clone Graph: fixed cases and deep copy checks passed. Scale (50 nodes): {(t1-t0)*1000:.2f}ms")

if __name__ == '__main__':
    main()
