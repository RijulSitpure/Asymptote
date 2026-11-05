import unittest
from solution import minOpsToTransformBinaryString

class TestSolution(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(minOpsToTransformBinaryString("000", "111"), 1)
        self.assertEqual(minOpsToTransformBinaryString("000", "101"), 3)

if __name__ == '__main__':
    unittest.main()
