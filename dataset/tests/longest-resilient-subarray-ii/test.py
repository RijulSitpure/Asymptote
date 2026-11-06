import unittest
from solution import longestResilientSubarrayII

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [5, 3, 2, 4], penalty limit 3: 5->3 is 2 drop; 3->2 is 1 drop (total 3 <= 3) -> len 3.
        self.assertEqual(longestResilientSubarrayII([5, 3, 2, 4], 3), 4) # 5->3 (2), 3->2 (1), 2->4 (0) -> total penalty 3 <= 3 -> all 4!
        self.assertEqual(longestResilientSubarrayII([10, 5, 1], 2), 1)

if __name__ == '__main__':
    unittest.main()
