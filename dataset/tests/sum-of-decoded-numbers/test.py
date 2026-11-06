import unittest
from solution import sumOfDecodedNumbers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # "12": "1", "2" -> sum 1+2=3; "12" -> sum 12. Total = 3 + 12 = 15
        self.assertEqual(sumOfDecodedNumbers("12"), 15)
        # "10": "10" -> sum 10
        self.assertEqual(sumOfDecodedNumbers("10"), 10)
        self.assertEqual(sumOfDecodedNumbers("06"), 0)

if __name__ == '__main__':
    unittest.main()
