from collections import Counter

class Solution:
    def makeEqual(self, words: list[str]) -> bool:
        n = len(words)
        cnt = Counter(''.join(words))
        return all(v % n == 0 for v in cnt.values())

def test():
    sol = Solution()
    assert sol.makeEqual(["abc","aabc","bc"]) == True
    assert sol.makeEqual(["ab","a"]) == False

if __name__ == '__main__':
    test()
