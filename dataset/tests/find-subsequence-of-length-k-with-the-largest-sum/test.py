from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxSubsequence([2, 1, 3, 3], 2) == [3, 3]
    assert s.maxSubsequence([-1, -2, 3, 4], 3) == [-1, 3, 4]
    assert s.maxSubsequence([3, 4, 3, 3], 2) == [4, 3] or s.maxSubsequence([3, 4, 3, 3], 2) == [3, 4]
    print("All tests passed for find-subsequence-of-length-k-with-the-largest-sum!")

if __name__ == '__main__':
    run_tests()
