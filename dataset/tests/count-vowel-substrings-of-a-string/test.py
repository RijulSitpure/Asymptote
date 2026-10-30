from solution import Solution

def run_tests():
    s = Solution()
    assert s.countVowelSubstrings("aeiouu") == 2
    assert s.countVowelSubstrings("unicornfarmer") == 0
    assert s.countVowelSubstrings("cuaieuouac") == 7
    print("All tests passed for count-vowel-substrings-of-a-string!")

if __name__ == "__main__":
    run_tests()
