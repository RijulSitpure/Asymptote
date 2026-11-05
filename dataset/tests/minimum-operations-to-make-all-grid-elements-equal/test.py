import unittest
from solution import minOperations

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperations([[2, 4], [6, 8]], 2), 4) # median 6: |2-6|/2=2, |4-6|/2=1, |8-6|/2=1 => 4
        self.assertEqual(minOperations([[1, 5], [2, 3]], 1), 5) # median 2 or 3: 1, 2, 3, 5 -> median 3: 2 + 2 + 1 = 5

if __name__ == '__main__':
    unittest.main()
