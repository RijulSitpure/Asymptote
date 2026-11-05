from solution import Solution, TreeNode

def run_tests():
    s = Solution()
    # Tree: [5, 3, 6, 5, 2, 5, 7, 1, 8, null, null, 6, 8]
    root = TreeNode(5)
    root.left = TreeNode(3, TreeNode(5, TreeNode(1), TreeNode(8)), TreeNode(2))
    root.right = TreeNode(6, TreeNode(5, TreeNode(6), TreeNode(8)), TreeNode(7))
    assert s.kthLargestPerfectSubtree(root, 2) == 3, "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
