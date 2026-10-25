class Solution:
    def minFlips(self, s: str) -> int:
        n = len(s)
        ss = s + s
        target1 = ''.join('0' if i % 2 == 0 else '1' for i in range(2 * n))
        target2 = ''.join('1' if i % 2 == 0 else '0' for i in range(2 * n))

        diff1 = diff2 = 0
        ans = n

        for i in range(2 * n):
            if ss[i] != target1[i]:
                diff1 += 1
            if ss[i] != target2[i]:
                diff2 += 1

            if i >= n:
                if ss[i - n] != target1[i - n]:
                    diff1 -= 1
                if ss[i - n] != target2[i - n]:
                    diff2 -= 1

            if i >= n - 1:
                ans = min(ans, diff1, diff2)

        return ans

def test():
    sol = Solution()
    assert sol.minFlips("111000") == 2
    assert sol.minFlips("010") == 0
    assert sol.minFlips("1110") == 1

if __name__ == '__main__':
    test()
