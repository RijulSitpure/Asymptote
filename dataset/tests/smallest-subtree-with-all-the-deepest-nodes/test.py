from typing import Optional, Tuple

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def subtreeWithAllDeepest(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def dfs(node: Optional[TreeNode]) -> Tuple[int, Optional[TreeNode]]:
            if not node:
                return 0, None
            d_left, lca_left = dfs(node.left)
            d_right, lca_right = dfs(node.right)
            if d_left == d_right:
                return d_left + 1, node
            if d_left > d_right:
                return d_left + 1, lca_left
            return d_right + 1, lca_right

        return dfs(root)[1]

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
    root1 = build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4])
    ans1 = sol.subtreeWithAllDeepest(root1)
    assert ans1.val == 2, f"test 1 failed: {ans1.val}"

    root2 = build_tree([1])
    ans2 = sol.subtreeWithAllDeepest(root2)
    assert ans2.val == 1, f"test 2 failed: {ans2.val}"

    root3 = build_tree([0, 1, 3, None, 2])
    ans3 = sol.subtreeWithAllDeepest(root3)
    assert ans3.val == 2, f"test 3 failed: {ans3.val}"
    print("✓ smallest-subtree-with-all-the-deepest-nodes passed")

if __name__ == "__main__":
    test()
