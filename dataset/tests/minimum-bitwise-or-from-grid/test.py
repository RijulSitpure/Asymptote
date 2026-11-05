import unittest
from solution import minBitwiseOR

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minBitwiseOR([[1, 2], [3, 4]]), 3)
        self.assertEqual(minBitwiseOR([[2, 4], [2, 8]]), 2)

if __name__ == '__main__':
    unittest.main()
