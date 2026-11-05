import unittest
from solution import minOperationsToUniform

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsToUniform([1, 2, 3]), 1) # 2 odds, 1 even -> change 1 even
        self.assertEqual(minOperationsToUniform([2, 4, 6]), 0)

if __name__ == '__main__':
    unittest.main()
