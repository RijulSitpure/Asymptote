from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> Optional[TreeNode]:
        self.idx = 0
        def helper(bound: float) -> Optional[TreeNode]:
            if self.idx == len(preorder) or preorder[self.idx] > bound:
                return None
            val = preorder[self.idx]
            self.idx += 1
            root = TreeNode(val)
            root.left = helper(val)
            root.right = helper(bound)
            return root
        return helper(float('inf'))

def test():
    sol = Solution()
    root = sol.bstFromPreorder([8,5,1,7,10,12])
    assert root.val == 8, "test root failed"
    assert root.left.val == 5, "test left failed"
    assert root.right.val == 10, "test right failed"
    print("✓ construct-binary-search-tree-from-preorder-traversal passed")

if __name__ == "__main__":
    test()
