from solution import Solution

def run_tests():
    s = Solution()
    assert s.possiblyEquals("internationalization", "i18n") == True
    assert s.possiblyEquals("l123e", "44") == True
    assert s.possiblyEquals("a5b", "c5b") == False
    print("All tests passed for check-if-an-original-string-exists-given-two-encoded-strings!")

if __name__ == "__main__":
    run_tests()
