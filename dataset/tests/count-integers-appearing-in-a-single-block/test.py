import unittest
from solution import countSingleBlockIntegers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countSingleBlockIntegers([1, 1, 2, 2, 3]), 3)
        self.assertEqual(countSingleBlockIntegers([1, 2, 1]), 1) # 2 is single block, 1 is split
        self.assertEqual(countSingleBlockIntegers([5, 5, 5, 5]), 1)

if __name__ == '__main__':
    unittest.main()
