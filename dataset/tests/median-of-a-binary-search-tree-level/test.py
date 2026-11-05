import unittest
from solution import TreeNode, levelMedian

class TestSolution(unittest.TestCase):
    def test_basic(self):
        root = TreeNode(4)
        root.left = TreeNode(2)
        root.right = TreeNode(6)
        root.left.left = TreeNode(1)
        root.left.right = TreeNode(3)
        root.right.left = TreeNode(5)
        root.right.right = TreeNode(7)
        self.assertEqual(levelMedian(root, 1), 4.0)
        self.assertEqual(levelMedian(root, 2), 4.0)
        self.assertEqual(levelMedian(root, 3), 4.0)

if __name__ == '__main__':
    unittest.main()
