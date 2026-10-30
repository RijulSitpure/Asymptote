from solution import Solution

def run_tests():
    s = Solution()
    assert s.removeOnes([[0, 1, 0], [1, 0, 1], [0, 1, 0]]) is True
    assert s.removeOnes([[1, 1, 0], [0, 0, 0], [0, 0, 0]]) is False
    assert s.removeOnes([[0]]) is True
    print("All tests passed for remove-all-ones-with-row-and-column-flips!")

if __name__ == '__main__':
    run_tests()
