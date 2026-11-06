import unittest
from solution import minDeletionsToMakeSharp

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 7, 4, 9, 2, 5] is already alternating (up, down, up, down, up) -> 0 deletions
        self.assertEqual(minDeletionsToMakeSharp([1, 7, 4, 9, 2, 5]), 0)
        # [1, 2, 3]: longest alternating is [1, 2] or [1, 3] (len 2) -> 3 - 2 = 1 deletion
        self.assertEqual(minDeletionsToMakeSharp([1, 2, 3]), 1)

if __name__ == '__main__':
    unittest.main()
