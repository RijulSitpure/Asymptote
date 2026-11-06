import unittest
from solution import pancakeSort

class TestSolution(unittest.TestCase):
    def test_basic(self):
        arr = [3, 2, 4, 1]
        flips = pancakeSort(arr)
        a = list(arr)
        for k in flips:
            a[:k] = reversed(a[:k])
        self.assertEqual(a, [1, 2, 3, 4])

if __name__ == '__main__':
    unittest.main()
