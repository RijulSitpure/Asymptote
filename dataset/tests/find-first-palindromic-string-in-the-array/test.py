from solution import Solution

def run_tests():
    s = Solution()
    assert s.firstPalindrome(["abc", "car", "ada", "racecar", "cool"]) == "ada"
    assert s.firstPalindrome(["notapalindrome", "racecar"]) == "racecar"
    assert s.firstPalindrome(["def", "ghi"]) == ""
    print("All tests passed for find-first-palindromic-string-in-the-array!")

if __name__ == '__main__':
    run_tests()
