import unittest
from solution import minOperationsToMakeEqual

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsToMakeEqual([2, 4, 6, 8], 2), 4) # medians 4 or 6 -> 4 ops
        self.assertEqual(minOperationsToMakeEqual([2, 5], 2), -1) # 2 % 2 != 5 % 2

if __name__ == '__main__':
    unittest.main()
