from collections import defaultdict, deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def amountOfTime(self, root, start: int) -> int:
        adj = defaultdict(list)
        def build_graph(node, parent):
            if not node:
                return
            if parent:
                adj[node.val].append(parent.val)
                adj[parent.val].append(node.val)
            build_graph(node.left, node)
            build_graph(node.right, node)
        build_graph(root, None)
        
        q = deque([start])
        visited = {start}
        minutes = -1
        while q:
            for _ in range(len(q)):
                curr = q.popleft()
                for neighbor in adj[curr]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        q.append(neighbor)
            minutes += 1
        return max(0, minutes)
