import unittest
from solution import scoreValidator

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(scoreValidator(["1", "4", "W", "6"]), [11, 1])
        # 10 'W's terminate
        self.assertEqual(scoreValidator(["W"] * 12), [0, 10])

if __name__ == '__main__':
    unittest.main()
