import unittest
from solution import maxMexArray

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # [0, 1, 1, 0] -> prefix [0, 1] has MEX 2. Remaining [1, 0] has MEX 2. Res: [2, 2]
        self.assertEqual(maxMexArray([0, 1, 1, 0]), [2, 2])

if __name__ == '__main__':
    unittest.main()
