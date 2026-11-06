import unittest
from solution import totalInteractionCost

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # 0-1, 1-2; groups: 0 has group 0, 2 has group 0, 1 has group 1
        # distance between group 0 members (0 and 2) is 2
        edges = [[0, 1], [1, 2]]
        groups = [0, 1, 0]
        self.assertEqual(totalInteractionCost(3, edges, groups), 2)

if __name__ == '__main__':
    unittest.main()
