import unittest
from solution import elapsedSeconds

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(elapsedSeconds("00:00:00", "00:01:00"), 60)
        self.assertEqual(elapsedSeconds("23:59:59", "00:00:01"), 2)
        self.assertEqual(elapsedSeconds("12:00:00", "12:00:00"), 0)

if __name__ == '__main__':
    unittest.main()
