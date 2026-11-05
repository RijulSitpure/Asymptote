import unittest
from solution import maxConcatenatedValue

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # ["1", "0", "11"] -> "11" + "1" + "0" = "1110" = 14
        self.assertEqual(maxConcatenatedValue(["1", "0", "11"]), 14)
        self.assertEqual(maxConcatenatedValue(["10", "1"]), 6)

if __name__ == '__main__':
    unittest.main()
