class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        s = 'L' + dominoes + 'R'
        res = []
        i = 0
        for j in range(1, len(s)):
            if s[j] == '.':
                continue
            mid = j - i - 1
            if i > 0:
                res.append(s[i])
            if s[i] == s[j]:
                res.append(s[i] * mid)
            elif s[i] == 'L' and s[j] == 'R':
                res.append('.' * mid)
            else:
                res.append('R' * (mid // 2) + ('.' if mid % 2 else '') + 'L' * (mid // 2))
            i = j
        return "".join(res)

def test():
    sol = Solution()
    assert sol.pushDominoes("RR.L") == "RR.L", "test 1 failed"
    assert sol.pushDominoes(".L.R...LR..L..") == "LL.RR.LLRRLL..", "test 2 failed"
    print("✓ push-dominoes passed")

if __name__ == "__main__":
    test()
