import unittest
from solution import limitOccurrences

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(limitOccurrences([1, 1, 1, 2, 2, 3], 2), [1, 1, 2, 2, 3])
        self.assertEqual(limitOccurrences([1, 2, 3], 1), [1, 2, 3])

if __name__ == '__main__':
    unittest.main()
