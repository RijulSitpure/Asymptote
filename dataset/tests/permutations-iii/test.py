from solution import Solution

def run_tests():
    s = Solution()
    assert s.permute(2) == [[1, 2], [2, 1]], "Example 1 failed"
    assert s.permute(3) == [[1, 2, 3], [3, 2, 1]], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
