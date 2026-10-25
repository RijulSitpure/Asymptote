class Solution:
    def freqAlphabets(self, s: str) -> str:
        res = []
        i = 0
        n = len(s)
        while i < n:
            if i + 2 < n and s[i + 2] == "#":
                val = int(s[i:i + 2])
                res.append(chr(ord("a") + val - 1))
                i += 3
            else:
                val = int(s[i])
                res.append(chr(ord("a") + val - 1))
                i += 1
        return "".join(res)

def test():
    sol = Solution()
    assert sol.freqAlphabets("10#11#12") == "jkab", "test 1 failed"
    assert sol.freqAlphabets("1326#") == "acz", "test 2 failed"
    print("✓ decrypt-string-from-alphabet-to-integer-mapping passed")

if __name__ == "__main__":
    test()
