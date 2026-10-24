from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def btreeGameWinningMove(self, root: Optional[TreeNode], n: int, x: int) -> bool:
        left_cnt = 0
        right_cnt = 0
        
        def count_nodes(node):
            nonlocal left_cnt, right_cnt
            if not node:
                return 0
            l = count_nodes(node.left)
            r = count_nodes(node.right)
            if node.val == x:
                left_cnt = l
                right_cnt = r
            return 1 + l + r
        
        count_nodes(root)
        parent_cnt = n - (left_cnt + right_cnt + 1)
        return max(left_cnt, right_cnt, parent_cnt) > n // 2

def test():
    sol = Solution()
    # Tree: [1,2,3,4,5,6,7,8,9,10,11], n=11, x=3
    n8 = TreeNode(8); n9 = TreeNode(9); n10 = TreeNode(10); n11 = TreeNode(11)
    n4 = TreeNode(4, n8, n9); n5 = TreeNode(5, n10, n11)
    n2 = TreeNode(2, n4, n5)
    n6 = TreeNode(6); n7 = TreeNode(7)
    n3 = TreeNode(3, n6, n7)
    root = TreeNode(1, n2, n3)
    assert sol.btreeGameWinningMove(root, 11, 3) is True, "test 1 failed"
    r2 = TreeNode(1, TreeNode(2), TreeNode(3))
    assert sol.btreeGameWinningMove(r2, 3, 1) is False, "test 2 failed"
    print("✓ binary-tree-coloring-game passed")

if __name__ == "__main__":
    test()
