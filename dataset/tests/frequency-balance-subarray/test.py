import unittest
from solution import countFrequencyBalancedSubarrays

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [1, 2, 1, 2], k = 2:
        # [1, 2] -> {1:1, 2:1} (freqs equal)
        # [2, 1] -> {2:1, 1:1}
        # [1, 2] -> {1:1, 2:1}
        # [1, 2, 1, 2] -> {1:2, 2:2} (freqs equal) -> 4 subarrays
        self.assertEqual(countFrequencyBalancedSubarrays([1, 2, 1, 2], 2), 4)
        self.assertEqual(countFrequencyBalancedSubarrays([1, 1, 1], 1), 6)

if __name__ == '__main__':
    unittest.main()
