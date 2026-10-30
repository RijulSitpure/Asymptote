from solution import Solution

def run_tests():
    s = Solution()
    assert s.mostWordsFound(["alice and bob love leetcode", "i think so too", "this is great thanks very much"]) == 6
    assert s.mostWordsFound(["please wait", "continue to fight", "continue to win"]) == 3
    print("All tests passed for maximum-number-of-words-found-in-sentences!")

if __name__ == '__main__':
    run_tests()
