from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def lcaDeepestLeaves(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def dfs(node):
            if not node:
                return (None, 0)
            l_node, l_depth = dfs(node.left)
            r_node, r_depth = dfs(node.right)
            if l_depth == r_depth:
                return (node, l_depth + 1)
            elif l_depth > r_depth:
                return (l_node, l_depth + 1)
            else:
                return (r_node, r_depth + 1)
        
        return dfs(root)[0]

def test():
    sol = Solution()
    # Tree: [3,5,1,6,2,0,8,null,null,7,4]
    n7 = TreeNode(7); n4 = TreeNode(4)
    n2 = TreeNode(2, n7, n4)
    root = TreeNode(3, TreeNode(5, TreeNode(6), n2), TreeNode(1, TreeNode(0), TreeNode(8)))
    res = sol.lcaDeepestLeaves(root)
    assert res.val == 2, f"test 1 failed: {res.val}"
    root2 = TreeNode(1)
    assert sol.lcaDeepestLeaves(root2).val == 1, "test 2 failed"
    print("✓ lowest-common-ancestor-of-deepest-leaves passed")

if __name__ == "__main__":
    test()
