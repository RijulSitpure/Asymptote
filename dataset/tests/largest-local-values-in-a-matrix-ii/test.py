import unittest
from solution import countLocalMaximums

class TestSolution(unittest.TestCase):
    def test_basic(self):
        mat = [
            [1, 0],
            [0, 1]
        ]
        # x=1 at (0, 0): box [0..1] x [0..1]. Corner (1, 1) has |1-0|=1 and |1-0|=1 -> corner excluded!
        # other neighbors are (0, 1)=0, (1, 0)=0 <= 1 -> local max! Same for (1, 1). Total 2.
        self.assertEqual(countLocalMaximums(mat), 2)

if __name__ == '__main__':
    unittest.main()
