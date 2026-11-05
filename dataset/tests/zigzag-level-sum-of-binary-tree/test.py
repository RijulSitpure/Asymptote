import unittest
from solution import TreeNode, levelSums

class TestSolution(unittest.TestCase):
    def test_basic(self):
        root = TreeNode(1, TreeNode(2), TreeNode(3))
        self.assertEqual(levelSums(root), [1, 5])

if __name__ == '__main__':
    unittest.main()
