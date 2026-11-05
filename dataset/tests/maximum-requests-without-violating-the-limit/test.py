import unittest
from solution import maxAcceptedRequests

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(maxAcceptedRequests([1, 2, 3, 4], 3, 2), 3) # t=1: [1]; t=2: [1,2]; t=3: [1,2] reject 3; t=4: pop 1 -> [2,4] accept 4 => 3 accepted
        self.assertEqual(maxAcceptedRequests([1, 10, 20], 5, 1), 3)

if __name__ == '__main__':
    unittest.main()
