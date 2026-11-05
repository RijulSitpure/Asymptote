import unittest
from solution import findTaxicabNumbers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        res = findTaxicabNumbers(2000)
        self.assertIn(1729, res) # 1729 = 1^3 + 12^3 = 9^3 + 10^3
        self.assertEqual(findTaxicabNumbers(100), [])

if __name__ == '__main__':
    unittest.main()
