from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def printTree(self, root: Optional[TreeNode]) -> List[List[str]]:
        def get_height(node: Optional[TreeNode]) -> int:
            if not node:
                return -1
            return 1 + max(get_height(node.left), get_height(node.right))

        height = get_height(root)
        m = height + 1
        n = (1 << m) - 1
        res = [[""] * n for _ in range(m)]

        def fill(node: Optional[TreeNode], r: int, c: int) -> None:
            if not node:
                return
            res[r][c] = str(node.val)
            offset = 1 << (height - r - 1) if height - r - 1 >= 0 else 0
            if node.left:
                fill(node.left, r + 1, c - offset)
            if node.right:
                fill(node.right, r + 1, c + offset)

        fill(root, 0, (n - 1) // 2)
        return res

def test():
    sol = Solution()
    t1 = TreeNode(1, TreeNode(2))
    assert sol.printTree(t1) == [["", "1", ""], ["2", "", ""]], "test 1 failed"
    print("✓ print-binary-tree passed")

if __name__ == "__main__":
    test()
