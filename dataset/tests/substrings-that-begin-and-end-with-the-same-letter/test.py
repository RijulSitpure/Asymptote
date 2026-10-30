from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfSubstrings("abcba") == 7
    assert s.numberOfSubstrings("abacad") == 9
    assert s.numberOfSubstrings("a") == 1
    print("All tests passed for substrings-that-begin-and-end-with-the-same-letter!")

if __name__ == '__main__':
    run_tests()
