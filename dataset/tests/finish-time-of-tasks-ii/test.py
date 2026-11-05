import unittest
from solution import minimumFinishTimeWithCooldown

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # tasks = [3, 3], workers = 1, cooldown = 2 -> 3 + 2 + 3 = 8
        self.assertEqual(minimumFinishTimeWithCooldown([3, 3], 1, 2), 8)
        # tasks = [3, 3], workers = 2, cooldown = 2 -> each takes 1 -> 3
        self.assertEqual(minimumFinishTimeWithCooldown([3, 3], 2, 2), 3)

if __name__ == '__main__':
    unittest.main()
