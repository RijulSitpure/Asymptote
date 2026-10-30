from solution import Solution, TreeNode
s = Solution()
t1 = TreeNode(10, TreeNode(4), TreeNode(6))
assert s.checkTree(t1) == True
t2 = TreeNode(5, TreeNode(3), TreeNode(1))
assert s.checkTree(t2) == False
print("All tests passed for root-equals-sum-of-children!")
