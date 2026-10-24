from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isUnivalTree(self, root: Optional[TreeNode]) -> bool:
        val = root.val
        def dfs(node: Optional[TreeNode]) -> bool:
            if not node:
                return True
            if node.val != val:
                return False
            return dfs(node.left) and dfs(node.right)
        return dfs(root)

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
    r1 = build_tree([1, 1, 1, 1, 1, None, 1])
    assert sol.isUnivalTree(r1) is True, "test 1 failed"
    r2 = build_tree([2, 2, 2, 5, 2])
    assert sol.isUnivalTree(r2) is False, "test 2 failed"
    print("✓ univalued-binary-tree passed")

if __name__ == "__main__":
    test()
