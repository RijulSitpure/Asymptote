from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flipMatchVoyage(self, root: Optional[TreeNode], voyage: List[int]) -> List[int]:
        res = []
        i = 0
        def dfs(node: Optional[TreeNode]) -> bool:
            nonlocal i
            if not node:
                return True
            if node.val != voyage[i]:
                return False
            i += 1
            if node.left and node.left.val != voyage[i]:
                res.append(node.val)
                return dfs(node.right) and dfs(node.left)
            return dfs(node.left) and dfs(node.right)
        return res if dfs(root) else [-1]

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
    r1 = build_tree([1, 2])
    assert sol.flipMatchVoyage(r1, [2, 1]) == [-1], "test 1 failed"
    r2 = build_tree([1, 2, 3])
    assert sol.flipMatchVoyage(r2, [1, 3, 2]) == [1], "test 2 failed"
    r3 = build_tree([1, 2, 3])
    assert sol.flipMatchVoyage(r3, [1, 2, 3]) == [], "test 3 failed"
    print("✓ flip-binary-tree-to-match-preorder-traversal passed")

if __name__ == "__main__":
    test()
