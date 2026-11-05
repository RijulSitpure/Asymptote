import unittest
from solution import checkGoodInteger

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertTrue(checkGoodInteger(1234))
        self.assertFalse(checkGoodInteger(1224))
        self.assertFalse(checkGoodInteger(1357))

if __name__ == '__main__':
    unittest.main()
