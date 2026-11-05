import unittest
from solution import minCapacityBox

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minCapacityBox([2, 5, 3], [4, 6, 8]), 6)
        self.assertEqual(minCapacityBox([10], [5, 9]), -1)

if __name__ == '__main__':
    unittest.main()
