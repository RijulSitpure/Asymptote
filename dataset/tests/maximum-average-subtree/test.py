from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maximumAverageSubtree(self, root: Optional[TreeNode]) -> float:
        max_avg = 0.0
        
        def dfs(node):
            nonlocal max_avg
            if not node:
                return (0, 0)
            l_sum, l_cnt = dfs(node.left)
            r_sum, r_cnt = dfs(node.right)
            tot_sum = l_sum + r_sum + node.val
            tot_cnt = l_cnt + r_cnt + 1
            max_avg = max(max_avg, tot_sum / tot_cnt)
            return (tot_sum, tot_cnt)
        
        dfs(root)
        return max_avg

def test():
    sol = Solution()
    root1 = TreeNode(5, TreeNode(6), TreeNode(1))
    assert abs(sol.maximumAverageSubtree(root1) - 6.0) < 1e-5, "test 1 failed"
    root2 = TreeNode(0, None, TreeNode(1))
    assert abs(sol.maximumAverageSubtree(root2) - 1.0) < 1e-5, "test 2 failed"
    print("✓ maximum-average-subtree passed")

if __name__ == "__main__":
    test()
