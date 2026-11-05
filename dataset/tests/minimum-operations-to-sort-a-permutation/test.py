import unittest
from solution import minOperationsToSort

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [0, 1, 2] -> 0 ops
        self.assertEqual(minOperationsToSort([0, 1, 2]), 0)
        # [2, 1, 0] -> reverse -> 1 op
        self.assertEqual(minOperationsToSort([2, 1, 0]), 1)
        # [1, 2, 0] -> rotate left 2 times -> 2 ops
        self.assertEqual(minOperationsToSort([1, 2, 0]), 2)

if __name__ == '__main__':
    unittest.main()
