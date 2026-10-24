from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        cameras = 0
        def dfs(node: Optional[TreeNode]) -> int:
            nonlocal cameras
            if not node:
                return 2
            left = dfs(node.left)
            right = dfs(node.right)
            if left == 0 or right == 0:
                cameras += 1
                return 1
            if left == 1 or right == 1:
                return 2
            return 0
        if dfs(root) == 0:
            cameras += 1
        return cameras

def build_tree(lst):
    if not lst:
        return None
    nodes = [TreeNode(x) if x is not None else None for x in lst]
    q = [nodes[0]]
    i = 1
    while q and i < len(nodes):
        curr = q.pop(0)
        if curr:
            if i < len(nodes):
                curr.left = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
            if i < len(nodes):
                curr.right = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
    return nodes[0]

def test():
    sol = Solution()
    r1 = build_tree([0, 0, None, 0, 0])
    assert sol.minCameraCover(r1) == 1, "test 1 failed"
    r2 = build_tree([0, 0, None, 0, None, 0, None, None, 0])
    assert sol.minCameraCover(r2) == 2, "test 2 failed"
    print("✓ binary-tree-cameras passed")

if __name__ == "__main__":
    test()
