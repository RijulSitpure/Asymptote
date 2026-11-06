import unittest
from solution import frequencySort

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(frequencySort([1, 1, 2, 2, 2, 3]), [3, 1, 1, 2, 2, 2])
        self.assertEqual(frequencySort([2, 3, 1, 3, 2]), [1, 3, 3, 2, 2])

if __name__ == '__main__':
    unittest.main()
