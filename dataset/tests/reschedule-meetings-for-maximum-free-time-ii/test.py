from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxFreeTime(5, [1, 3], [2, 5]) == 2, "Example 1 failed"
    assert s.maxFreeTime(10, [0, 7, 9], [1, 8, 10]) == 7, "Example 2 failed"
    assert s.maxFreeTime(10, [0, 3, 7, 9], [1, 4, 8, 10]) == 6, "Example 3 failed"
    assert s.maxFreeTime(5, [0, 1, 2, 3, 4], [1, 2, 3, 4, 5]) == 0, "Example 4 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
