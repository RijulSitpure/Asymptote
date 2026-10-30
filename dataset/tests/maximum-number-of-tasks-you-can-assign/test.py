from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxTaskAssign([3, 2, 1], [0, 3, 3], 1, 1) == 3
    assert s.maxTaskAssign([5, 4], [0, 0, 0], 1, 5) == 1
    assert s.maxTaskAssign([10, 15, 30], [0, 10, 10, 10, 10], 3, 10) == 2
    print("All tests passed for maximum-number-of-tasks-you-can-assign!")

if __name__ == "__main__":
    run_tests()
