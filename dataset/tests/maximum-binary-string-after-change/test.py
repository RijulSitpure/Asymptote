class Solution:
    def maximumBinaryString(self, s: str) -> str:
        if '0' not in s:
            return s
        first_zero = s.find('0')
        zeros = s.count('0')
        ones_before = first_zero
        ones_between = zeros - 1
        ones_after = len(s) - ones_before - zeros
        return '1' * (ones_before + ones_between) + '0' + '1' * ones_after

def test():
    sol = Solution()
    assert sol.maximumBinaryString("000110") == "111011"
    assert sol.maximumBinaryString("01") == "01"
    assert sol.maximumBinaryString("1") == "1"

    print("✓ maximum-binary-string-after-change passed")

if __name__ == '__main__':
    test()
