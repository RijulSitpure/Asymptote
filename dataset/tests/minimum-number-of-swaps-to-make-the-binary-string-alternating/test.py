class Solution:
    def minSwaps(self, s: str) -> int:
        c0 = s.count('0')
        c1 = s.count('1')
        if abs(c0 - c1) > 1:
            return -1

        def check(start_char: str) -> int:
            mismatches = 0
            curr = start_char
            for c in s:
                if c != curr:
                    mismatches += 1
                curr = '1' if curr == '0' else '0'
            return mismatches // 2

        if c0 > c1:
            return check('0')
        elif c1 > c0:
            return check('1')
        else:
            return min(check('0'), check('1'))

def test():
    sol = Solution()
    assert sol.minSwaps("111000") == 1
    assert sol.minSwaps("010") == 0
    assert sol.minSwaps("1110") == -1

if __name__ == '__main__':
    test()
