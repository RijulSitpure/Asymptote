from solution import Solution, TreeNode

# Tree: [1,5,3,null,4,10,6,9,2]
n9 = TreeNode(9)
n2 = TreeNode(2)
n4 = TreeNode(4, n9, n2)
n5 = TreeNode(5, None, n4)
n10 = TreeNode(10)
n6 = TreeNode(6)
n3 = TreeNode(3, n10, n6)
root = TreeNode(1, n5, n3)

s = Solution()
assert s.amountOfTime(root, 3) == 4
assert s.amountOfTime(TreeNode(1), 1) == 0
print("All tests passed for amount-of-time-for-binary-tree-to-be-infected!")
