import sys
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        if n == 0:
            return []

        def build(start: int, end: int) -> List[Optional[TreeNode]]:
            if start > end:
                return [None]
            trees = []
            for val in range(start, end + 1):
                left_trees = build(start, val - 1)
                right_trees = build(val + 1, end)
                for left in left_trees:
                    for right in right_trees:
                        root = TreeNode(val, left, right)
                        trees.append(root)
            return trees

        return build(1, n)

def test():
    sol = Solution()
    trees3 = sol.generateTrees(3)
    assert len(trees3) == 5, "test 1 failed: Catalan C_3 is 5"
    trees1 = sol.generateTrees(1)
    assert len(trees1) == 1, "test 2 failed"
    print("✓ unique-binary-search-trees-ii passed")

if __name__ == "__main__":
    test()
