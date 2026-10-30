from solution import Solution, TreeNode

# Tree: [2,3,5,8,13,21,34]
n8 = TreeNode(8); n13 = TreeNode(13); n21 = TreeNode(21); n34 = TreeNode(34)
n3 = TreeNode(3, n8, n13)
n5 = TreeNode(5, n21, n34)
root = TreeNode(2, n3, n5)

s = Solution()
res = s.reverseOddLevels(root)
assert res.left.val == 5
assert res.right.val == 3
assert res.left.left.val == 8
assert res.right.right.val == 34
print("All tests passed for reverse-odd-levels-of-binary-tree!")
