from solution import Solution, TreeNode

def run_tests():
    s = Solution()
    # Tree: [5,1,2,3,null,6,4]
    root = TreeNode(5)
    root.left = TreeNode(1, TreeNode(3))
    root.right = TreeNode(2, TreeNode(6), TreeNode(4))

    assert s.getDirections(root, 3, 6) == "UURL"
    assert s.getDirections(root, 6, 3) == "UULL"

    # Tree: [2, 1]
    root2 = TreeNode(2, TreeNode(1))
    assert s.getDirections(root2, 2, 1) == "L"
    print("All tests passed for step-by-step-directions-from-a-binary-tree-node-to-another!")

if __name__ == '__main__':
    run_tests()
