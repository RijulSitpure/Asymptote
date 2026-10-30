from solution import Solution

def run_tests():
    s = Solution()
    assert s.equalCountSubstrings("aaabcbbcc", 3) == 3
    assert s.equalCountSubstrings("abcd", 2) == 0
    print("All tests passed for number-of-equal-count-substrings!")

if __name__ == "__main__":
    run_tests()
