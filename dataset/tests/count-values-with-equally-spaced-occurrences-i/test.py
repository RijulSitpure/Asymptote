import unittest
from solution import countEquallySpacedValues

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countEquallySpacedValues([1, 2, 1, 3, 1]), 3) # 1 at 0, 2, 4 (diff 2); 2 at 1; 3 at 3 -> all 3
        self.assertEqual(countEquallySpacedValues([1, 2, 1, 1]), 1) # 1 at 0, 2, 3 (diffs 2, 1 -> no); 2 at 1 -> yes

if __name__ == '__main__':
    unittest.main()
