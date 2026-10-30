from solution import Solution

def run_tests():
    s = Solution()
    assert s.countWords(["leetcode","is","amazing","as","is"], ["amazing","leetcode","is"]) == 2
    assert s.countWords(["b","bb","bbb"], ["a","aa","aaa"]) == 0
    assert s.countWords(["a","ab"], ["a","a","a","ab"]) == 1
    print("All tests passed for count-common-words-with-one-occurrence!")

if __name__ == '__main__':
    run_tests()
