from solution import Solution

def run_tests():
    s = Solution()
    assert s.isZeroArray([1, 0, 1], [[0, 2]]) == True, "Example 1 failed"
    assert s.isZeroArray([4, 3, 2, 1], [[1, 3], [0, 2]]) == False, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

