class Solution:
    def checkZeroOnes(self, s: str) -> bool:
        max1 = max0 = 0
        c1 = c0 = 0
        for c in s:
            if c == '1':
                c1 += 1
                c0 = 0
            else:
                c0 += 1
                c1 = 0
            max1 = max(max1, c1)
            max0 = max(max0, c0)
        return max1 > max0

def test():
    sol = Solution()
    assert sol.checkZeroOnes("1101") is True
    assert sol.checkZeroOnes("111000") is False
    assert sol.checkZeroOnes("110100010") is False

if __name__ == '__main__':
    test()
