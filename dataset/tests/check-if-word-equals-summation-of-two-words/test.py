class Solution:
    def isSumEqual(self, firstWord: str, secondWord: str, targetWord: str) -> bool:
        def to_num(w: str) -> int:
            res = 0
            for c in w:
                res = res * 10 + (ord(c) - ord('a'))
            return res

        return to_num(firstWord) + to_num(secondWord) == to_num(targetWord)

def test():
    sol = Solution()
    assert sol.isSumEqual("acb", "cba", "cdb") is True
    assert sol.isSumEqual("aaa", "a", "aab") is False
    assert sol.isSumEqual("aaa", "a", "aaaa") is True

if __name__ == '__main__':
    test()
