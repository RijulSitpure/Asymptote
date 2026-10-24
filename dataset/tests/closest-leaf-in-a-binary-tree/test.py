from typing import Optional
import collections

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findClosestLeaf(self, root: Optional[TreeNode], k: int) -> int:
        graph = collections.defaultdict(list)
        leaves = set()

        def dfs(node: Optional[TreeNode]):
            if not node:
                return
            if not node.left and not node.right:
                leaves.add(node.val)
            if node.left:
                graph[node.val].append(node.left.val)
                graph[node.left.val].append(node.val)
                dfs(node.left)
            if node.right:
                graph[node.val].append(node.right.val)
                graph[node.right.val].append(node.val)
                dfs(node.right)

        dfs(root)
        queue = collections.deque([k])
        visited = {k}

        while queue:
            curr = queue.popleft()
            if curr in leaves:
                return curr
            for neighbor in graph[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return -1

def test():
    sol = Solution()
    t1 = TreeNode(1, TreeNode(3), TreeNode(2))
    assert sol.findClosestLeaf(t1, 1) in (2, 3), "test 1 failed"
    t2 = TreeNode(1)
    assert sol.findClosestLeaf(t2, 1) == 1, "test 2 failed"
    print("✓ closest-leaf-in-a-binary-tree passed")

if __name__ == "__main__":
    test()
