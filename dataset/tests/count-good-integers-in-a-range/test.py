import unittest
from solution import countGoodIntegersInRange

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 1 to 10 with digit sum divisible by 3: 3, 6, 9 -> 3
        self.assertEqual(countGoodIntegersInRange(1, 10, 3), 3)
        self.assertEqual(countGoodIntegersInRange(0, 5, 2), 3) # 0, 2, 4 -> 3

if __name__ == '__main__':
    unittest.main()
