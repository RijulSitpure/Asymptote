from solution import Solution

def run_tests():
    s = Solution()
    assert s.targetIndices([1, 2, 5, 2, 3], 2) == [1, 2]
    assert s.targetIndices([1, 2, 5, 2, 3], 3) == [3]
    assert s.targetIndices([1, 2, 5, 2, 3], 5) == [4]
    print("All tests passed for find-target-indices-after-sorting-array!")

if __name__ == '__main__':
    run_tests()
