import unittest
from solution import minOperationsI

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # nums = [2, 3], k = 3 -> 2%3=2 (even), 3%3=0 (odd) -> distinct (2 != 0) -> 0 cost
        self.assertEqual(minOperationsI([2, 3], 3), 0)
        # nums = [3, 3], k = 3 -> even rem 0, odd rem 0 -> change one -> cost 1
        self.assertEqual(minOperationsI([3, 3], 3), 1)

if __name__ == '__main__':
    unittest.main()
