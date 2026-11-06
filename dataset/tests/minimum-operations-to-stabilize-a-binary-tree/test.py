import unittest
from solution import TreeNode, minOperationsToStabilize

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # root = 10, left = 4, right = 6 -> child_sum = 10 == root.val -> 0 ops
        root = TreeNode(10, TreeNode(4), TreeNode(6))
        self.assertEqual(minOperationsToStabilize(root), 0)

        # root = 5, left = 2, right = 1 -> child_sum = 3. abs(5 - 3) = 2 ops
        root2 = TreeNode(5, TreeNode(2), TreeNode(1))
        self.assertEqual(minOperationsToStabilize(root2), 2)

if __name__ == '__main__':
    unittest.main()
