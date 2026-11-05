import unittest
from solution import minSwapsToEqualize

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minSwapsToEqualize([1, 1], [2, 2]), 1) # swap one 1 with one 2 -> [1, 2] and [1, 2]
        self.assertEqual(minSwapsToEqualize([1, 2], [3, 4]), -1)

if __name__ == '__main__':
    unittest.main()
