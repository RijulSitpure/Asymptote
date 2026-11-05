import unittest
from solution import countGoodIntegersOnGridPath

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 16-digit pad of 0..9
        res = countGoodIntegersOnGridPath(0, 100, "DDDRRR")
        self.assertGreater(res, 0)

if __name__ == '__main__':
    unittest.main()
