from solution import Solution
s = Solution()
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

root1 = TreeNode(2, TreeNode(1), TreeNode(3, TreeNode(0), TreeNode(1)))
assert s.evaluateTree(root1) == True
root2 = TreeNode(0)
assert s.evaluateTree(root2) == False
print("All tests passed for evaluate-boolean-binary-tree!")
