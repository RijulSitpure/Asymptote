import unittest
from solution import minFlipsToMakeCoherent

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # "010" -> contains at most one 1 -> already coherent -> 0 flips
        self.assertEqual(minFlipsToMakeCoherent("010"), 0)
        # "0110" -> contains 011 and 110 -> flip index 1 or 2 -> 1 flip
        self.assertEqual(minFlipsToMakeCoherent("0110"), 1)

if __name__ == '__main__':
    unittest.main()
