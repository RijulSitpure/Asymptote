import unittest
from solution import exactlyOneConsecutiveSetBitsPair

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(exactlyOneConsecutiveSetBitsPair(6))  # 110 (1 pair)
        self.assertFalse(exactlyOneConsecutiveSetBitsPair(5)) # 101 (0 pairs)
        self.assertFalse(exactlyOneConsecutiveSetBitsPair(7)) # 111 (2 pairs)

if __name__ == '__main__':
    unittest.main()
