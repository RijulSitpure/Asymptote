import unittest
from solution import digitFrequencyScore

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(digitFrequencyScore(122), 5)
        self.assertEqual(digitFrequencyScore(9), 9)

if __name__ == '__main__':
    unittest.main()
