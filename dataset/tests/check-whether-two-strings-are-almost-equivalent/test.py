from solution import Solution

def run_tests():
    s = Solution()
    assert s.checkAlmostEquivalent("aaaa", "bccb") == False
    assert s.checkAlmostEquivalent("abcdeef", "abaaacc") == True
    assert s.checkAlmostEquivalent("cccddabba", "babababab") == True
    print("All tests passed for check-whether-two-strings-are-almost-equivalent!")

if __name__ == "__main__":
    run_tests()
