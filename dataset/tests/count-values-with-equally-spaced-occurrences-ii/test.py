import unittest
from solution import countEquallySpacedValuesII

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countEquallySpacedValuesII([1, 2, 1, 3, 1], 3), 1) # 1 appears 3 times with equal space
        self.assertEqual(countEquallySpacedValuesII([1, 2, 1, 3, 1], 1), 3) # 1, 2, 3 all valid
        self.assertEqual(countEquallySpacedValuesII([1, 2, 1, 1], 2), 0)

if __name__ == '__main__':
    unittest.main()
