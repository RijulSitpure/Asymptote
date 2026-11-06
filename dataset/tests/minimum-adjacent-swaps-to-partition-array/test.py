import unittest
from solution import minSwapsToPartition

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minSwapsToPartition([0, 1, 0, 1]), 1)
        self.assertEqual(minSwapsToPartition([1, 1, 0, 0]), 0) # already partitioned as 1s then 0s

if __name__ == '__main__':
    unittest.main()
