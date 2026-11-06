import unittest
from solution import widestFenceArea

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(widestFenceArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49) # 7 * 7 = 49
        self.assertEqual(widestFenceArea([1, 1]), 1)

if __name__ == '__main__':
    unittest.main()
