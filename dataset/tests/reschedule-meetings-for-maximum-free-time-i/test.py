from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxFreeTime(5, 1, [1, 3], [2, 5]) == 2, "Example 1 failed"
    assert s.maxFreeTime(10, 1, [0, 2, 9], [1, 4, 10]) == 6, "Example 2 failed"
    assert s.maxFreeTime(5, 2, [0, 1, 2, 3, 4], [1, 2, 3, 4, 5]) == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
