from collections import deque

class Solution:
    def isEvenOddTree(self, root) -> bool:
        q = deque([root])
        level = 0
        while q:
            prev = None
            for _ in range(len(q)):
                node = q.popleft()
                val = node.val
                if level % 2 == 0:
                    if val % 2 == 0 or (prev is not None and val <= prev):
                        return False
                else:
                    if val % 2 != 0 or (prev is not None and val >= prev):
                        return False
                prev = val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            level += 1
        return True

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def test():
    sol = Solution()
    # [1,10,4,3,null,7,9,12,8,6,null,null,2]
    r1 = TreeNode(1,
            TreeNode(10, TreeNode(3, TreeNode(12), TreeNode(8)), None),
            TreeNode(4, TreeNode(7, TreeNode(6), None), TreeNode(9, None, TreeNode(2))))
    assert sol.isEvenOddTree(r1) == True
    r2 = TreeNode(5, TreeNode(4, TreeNode(3), TreeNode(3)), TreeNode(2, TreeNode(7), None))
    assert sol.isEvenOddTree(r2) == False

    print("✓ even-odd-tree passed")

if __name__ == '__main__':
    test()
