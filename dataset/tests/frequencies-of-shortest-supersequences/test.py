from solution import Solution

def run_tests():
    s = Solution()
    res1 = s.supersequences(["ab", "ba"])
    assert len(res1) == 2, "Example 1 count failed"
    res2 = s.supersequences(["aa", "ac", "ba"])
    assert len(res2) == 1, "Example 2 count failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
