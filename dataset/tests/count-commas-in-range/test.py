import unittest
from solution import countCommas

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(countCommas(999), 0)
        self.assertEqual(countCommas(1002), 3) # 1,000; 1,001; 1,002
        self.assertEqual(countCommas(1000000), 1000000 - 1000 + 1 + 1)

if __name__ == '__main__':
    unittest.main()
