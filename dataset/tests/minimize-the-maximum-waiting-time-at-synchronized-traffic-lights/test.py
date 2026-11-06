import unittest
from solution import minMaxLightWaitTime

class TestSolution(unittest.TestCase):
    def test_basic(self):
        # cycle = 60, light 1 green for 40 sec (red 20), light 2 green for 30 sec (red 30) -> max wait 30
        self.assertEqual(minMaxLightWaitTime([[0, 40], [10, 40]], 60), 30)

if __name__ == '__main__':
    unittest.main()
