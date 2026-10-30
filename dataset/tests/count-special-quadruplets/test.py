from solution import Solution

def run_tests():
    s = Solution()
    assert s.countQuadruplets([1, 2, 3, 6]) == 1
    assert s.countQuadruplets([3, 3, 6, 4, 5]) == 0
    assert s.countQuadruplets([1, 1, 1, 3, 5]) == 4
    print("All tests passed for count-special-quadruplets!")

if __name__ == "__main__":
    run_tests()
