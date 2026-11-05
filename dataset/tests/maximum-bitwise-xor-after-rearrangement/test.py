import unittest
from solution import maxBitwiseXor

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxBitwiseXor("010", "110"), "111")
        self.assertEqual(maxBitwiseXor("111", "000"), "111")

if __name__ == '__main__':
    unittest.main()
