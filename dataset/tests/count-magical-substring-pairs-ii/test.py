import unittest
from solution import countMagicalPairs

class TestSolution(unittest.TestCase):
    def test_cases(self):
        self.assertEqual(countMagicalPairs('aba'), 2)
        self.assertEqual(countMagicalPairs('ab'), 1)
        self.assertEqual(countMagicalPairs('aaaa'), 10)

if __name__ == '__main__':
    unittest.main()
