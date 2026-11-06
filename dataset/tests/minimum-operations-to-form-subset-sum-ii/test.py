import unittest
from solution import minPatches

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minPatches([1, 3], 6), 1)
        self.assertEqual(minPatches([1, 5, 10], 20), 2)
        self.assertEqual(minPatches([1, 2, 2], 5), 0)

if __name__ == '__main__':
    unittest.main()
