import unittest
from solution import sumSortableIntegers

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(sumSortableIntegers(1, 12), 1+2+3+4+5+6+7+8+9 + 11 + 12) # 10 not sortable ('1' > '0')
        self.assertEqual(sumSortableIntegers(21, 23), 22 + 23)

if __name__ == '__main__':
    unittest.main()
