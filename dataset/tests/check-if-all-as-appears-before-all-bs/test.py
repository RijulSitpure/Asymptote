from solution import Solution

def run_tests():
    s = Solution()
    assert s.checkString("aaabbb") is True
    assert s.checkString("abab") is False
    assert s.checkString("bbb") is True
    print("All tests passed for check-if-all-as-appears-before-all-bs!")

if __name__ == '__main__':
    run_tests()
