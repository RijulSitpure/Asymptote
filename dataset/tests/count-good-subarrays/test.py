import unittest
from solution import countGood

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countGood([1, 1, 1, 1, 1], 10), 1) # 5 elements have C(5,2)=10 pairs
        self.assertEqual(countGood([3, 1, 4, 3, 2, 2, 4], 2), 4)

if __name__ == '__main__':
    unittest.main()
