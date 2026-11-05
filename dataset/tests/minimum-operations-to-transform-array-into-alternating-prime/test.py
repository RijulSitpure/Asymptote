import unittest
from solution import minOperationsAlternatingPrime

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOperationsAlternatingPrime([2, 4, 3]), 0) # [prime, non-prime, prime] -> 0 ops
        self.assertEqual(minOperationsAlternatingPrime([1, 1, 1]), 1) # 1 is non-prime: [non-prime, prime (2), non-prime] -> cost 1

if __name__ == '__main__':
    unittest.main()
