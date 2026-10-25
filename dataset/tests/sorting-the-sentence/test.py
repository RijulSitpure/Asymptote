class Solution:
    def sortSentence(self, s: str) -> str:
        words = s.split()
        res = [None] * len(words)
        for w in words:
            pos = int(w[-1]) - 1
            res[pos] = w[:-1]
        return ' '.join(res)

def test():
    sol = Solution()
    assert sol.sortSentence("is2 sentence4 This1 a3") == "This is a sentence"
    assert sol.sortSentence("Myself2 Me1 I4 and3") == "Me Myself and I"

if __name__ == '__main__':
    test()
