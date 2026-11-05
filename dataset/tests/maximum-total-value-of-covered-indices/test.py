import unittest
from solution import maxTotalValueCovered

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [10, 2, 5], s = "010" -> token at index 1 covers 0 (value 10 > 2) and 2 (value 5 > 2) and 1.
        self.assertEqual(maxTotalValueCovered([10, 2, 5], "010"), 17)

if __name__ == '__main__':
    unittest.main()
