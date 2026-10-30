from solution import Solution

def run_tests():
    s = Solution()
    assert s.findGCD([2, 5, 6, 9, 10]) == 2
    assert s.findGCD([7, 5, 6, 8, 3]) == 1
    assert s.findGCD([3, 3]) == 3
    print("All tests passed for find-greatest-common-divisor-of-array!")

if __name__ == "__main__":
    run_tests()
