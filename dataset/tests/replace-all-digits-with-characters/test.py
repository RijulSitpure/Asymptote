class Solution:
    def replaceDigits(self, s: str) -> str:
        res = list(s)
        for i in range(1, len(s), 2):
            res[i] = chr(ord(res[i - 1]) + int(res[i]))
        return ''.join(res)

def test():
    sol = Solution()
    assert sol.replaceDigits("a1c1e1") == "abcdef"
    assert sol.replaceDigits("a1b2c3d4e") == "abbdcfdhe"

if __name__ == '__main__':
    test()
