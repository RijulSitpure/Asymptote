from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> Optional[TreeNode]:
        stack = []
        for x in nums:
            curr = TreeNode(x)
            while stack and stack[-1].val < x:
                curr.left = stack.pop()
            if stack:
                stack[-1].right = curr
            stack.append(curr)
        return stack[0] if stack else None

def test():
    sol = Solution()
    t1 = sol.constructMaximumBinaryTree([3, 2, 1, 6, 0, 5])
    assert t1.val == 6, "test 1 failed: root should be 6"
    assert t1.left.val == 3 and t1.right.val == 5, "test 1 failed: children values"
    t2 = sol.constructMaximumBinaryTree([3, 2, 1])
    assert t2.val == 3 and t2.right.val == 2 and t2.right.right.val == 1, "test 2 failed"
    print("✓ maximum-binary-tree passed")

if __name__ == "__main__":
    test()
