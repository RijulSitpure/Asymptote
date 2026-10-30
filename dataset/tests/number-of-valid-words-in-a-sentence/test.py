from solution import Solution

def run_tests():
    s = Solution()
    assert s.countValidWords("cat and  dog") == 3
    assert s.countValidWords("!this  1-s b8d!") == 0
    assert s.countValidWords("alice and  bob are playing stone-game10") == 5
    print("All tests passed for number-of-valid-words-in-a-sentence!")

if __name__ == "__main__":
    run_tests()
