from solution import Solution

def run_tests():
    s = Solution()
    assert s.catchMaximumAmountofPeople([0, 1, 0, 1, 0], 3) == 2
    assert s.catchMaximumAmountofPeople([1], 1) == 0
    assert s.catchMaximumAmountofPeople([0], 1) == 0
    assert s.catchMaximumAmountofPeople([1, 1, 1, 0, 0, 0], 2) == 2
    print("All tests passed for maximum-number-of-people-that-can-be-caught-in-tag!")

if __name__ == "__main__":
    run_tests()
