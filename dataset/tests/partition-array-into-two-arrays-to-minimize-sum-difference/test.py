from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumDifference([3, 9, 7, 3]) == 2
    assert s.minimumDifference([-36, 36]) == 72
    assert s.minimumDifference([2, -1, 0, 4, -2, -9]) == 0
    print("All tests passed for partition-array-into-two-arrays-to-minimize-sum-difference!")

if __name__ == "__main__":
    run_tests()
