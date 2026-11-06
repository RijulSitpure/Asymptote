import unittest
from solution import findKthDigit

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(findKthDigit(3), 3) # "123..." -> 3rd digit is 3
        self.assertEqual(findKthDigit(11), 0) # "12345678910" -> 11th digit is 0

if __name__ == '__main__':
    unittest.main()
