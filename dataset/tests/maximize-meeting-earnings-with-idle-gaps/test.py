import unittest
from solution import maxMeetingEarnings

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 3, 20], [4, 6, 20], [2, 5, 50], gap = 1:
        # [1, 3] ends at 3. Next needs start >= 3 + 1 = 4 -> [4, 6] start 4 ok! Total 20 + 20 = 40.
        # [2, 5] earn 50 alone > 40.
        self.assertEqual(maxMeetingEarnings([[1, 3, 20], [4, 6, 20], [2, 5, 50]], 1), 50)
        self.assertEqual(maxMeetingEarnings([[1, 2, 10], [3, 4, 10]], 0), 20)

if __name__ == '__main__':
    unittest.main()
