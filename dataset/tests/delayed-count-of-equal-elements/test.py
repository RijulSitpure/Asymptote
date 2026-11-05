import unittest
from solution import delayedCount

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(delayedCount([1, 2, 1, 1], 2), [0, 0, 1, 1])
        self.assertEqual(delayedCount([5, 5, 5], 1), [0, 1, 2])

if __name__ == '__main__':
    unittest.main()
