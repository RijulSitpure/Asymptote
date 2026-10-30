from solution import Solution

def run_tests():
    s = Solution()
    assert s.countVowels("aba") == 6
    assert s.countVowels("abc") == 3
    assert s.countVowels("ltcd") == 0
    print("All tests passed for vowels-of-all-substrings!")

if __name__ == "__main__":
    run_tests()
