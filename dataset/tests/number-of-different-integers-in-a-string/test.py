class Solution:
    def numDifferentIntegers(self, word: str) -> int:
        s = ''.join(c if c.isdigit() else ' ' for c in word)
        return len(set(token.lstrip('0') or '0' for token in s.split()))

def test():
    sol = Solution()
    assert sol.numDifferentIntegers("a123bc34d8ef34") == 3
    assert sol.numDifferentIntegers("leet1234code234") == 2
    assert sol.numDifferentIntegers("a1b01c001") == 1

if __name__ == '__main__':
    test()
