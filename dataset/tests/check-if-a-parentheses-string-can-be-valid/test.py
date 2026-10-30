from solution import Solution

def run_tests():
    s = Solution()
    assert s.canBeValid("))()))", "010100") is True
    assert s.canBeValid("()()", "0000") is True
    assert s.canBeValid(")", "0") is False
    print("All tests passed for check-if-a-parentheses-string-can-be-valid!")

if __name__ == '__main__':
    run_tests()
