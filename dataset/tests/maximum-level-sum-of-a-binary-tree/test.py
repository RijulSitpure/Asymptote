from collections import deque
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        q = deque([root])
        max_sum = float('-inf')
        best_level = 1
        level = 1
        
        while q:
            curr_sum = 0
            for _ in range(len(q)):
                node = q.popleft()
                curr_sum += node.val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            if curr_sum > max_sum:
                max_sum = curr_sum
                best_level = level
            level += 1
        return best_level

def test():
    sol = Solution()
    root1 = TreeNode(1, TreeNode(7, TreeNode(7), TreeNode(-8)), TreeNode(0))
    assert sol.maxLevelSum(root1) == 2, "test 1 failed"
    print("✓ maximum-level-sum-of-a-binary-tree passed")

if __name__ == "__main__":
    test()
