from solution import Solution

def run_tests():
    s = Solution()
    assert s.minSessions([1, 2, 3], 3) == 2
    assert s.minSessions([3, 1, 3, 1, 1], 8) == 2
    assert s.minSessions([1, 2, 3, 4, 5], 15) == 1
    print("All tests passed for minimum-number-of-work-sessions-to-finish-the-tasks!")

if __name__ == "__main__":
    run_tests()
