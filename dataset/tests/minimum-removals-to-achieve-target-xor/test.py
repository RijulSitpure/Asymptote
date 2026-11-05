import unittest
from solution import minRemovals

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minRemovals([1, 2, 3], 0), 0) # 1 ^ 2 ^ 3 = 0, remove 0
        self.assertEqual(minRemovals([1, 2, 3], 2), 1) # keep [2] (size 1) -> remove 2

if __name__ == '__main__':
    unittest.main()
