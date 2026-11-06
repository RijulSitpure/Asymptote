import unittest
from solution import aggregateTimeSeries

class TestSolution(unittest.TestCase):
    def test_basic(self):
        s1 = [[1, 10], [3, 20]]
        s2 = [[1, 5], [2, 15], [3, 25]]
        self.assertEqual(aggregateTimeSeries(s1, s2), [[1, 15], [2, 15], [3, 45]])

if __name__ == '__main__':
    unittest.main()
