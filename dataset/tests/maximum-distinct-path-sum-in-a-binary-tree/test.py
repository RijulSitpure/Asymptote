import unittest
from solution import TreeNode, Solution

class TestSolution(unittest.TestCase):
    def test_basic(self):
        s = Solution()
        root = TreeNode(1, TreeNode(2), TreeNode(3))
        self.assertEqual(s.maxPathSum(root), 6) # 2 + 1 + 3 = 6
        root2 = TreeNode(-10, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
        self.assertEqual(s.maxPathSum(root2), 42)

if __name__ == '__main__':
    unittest.main()
