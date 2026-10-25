class Solution:
    def sortString(self, s: str) -> str:
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        res = []
        total = len(s)
        while len(res) < total:
            for i in range(26):
                if counts[i] > 0:
                    res.append(chr(ord("a") + i))
                    counts[i] -= 1
            for i in range(25, -1, -1):
                if counts[i] > 0:
                    res.append(chr(ord("a") + i))
                    counts[i] -= 1
        return "".join(res)

def test():
    sol = Solution()
    assert sol.sortString("aaaabbbbcccc") == "abccbaabccba", "test 1 failed"
    assert sol.sortString("rat") == "art", "test 2 failed"
    print("✓ increasing-decreasing-string passed")

if __name__ == "__main__":
    test()
