import unittest
from solution import subarraysWithKDistinct

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(subarraysWithKDistinct([1, 2, 1, 2, 3], 2), 7)
        self.assertEqual(subarraysWithKDistinct([1, 2, 1, 3, 4], 3), 3)

if __name__ == '__main__':
    unittest.main()
