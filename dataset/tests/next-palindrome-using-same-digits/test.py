class Solution:
    def nextPalindrome(self, num: str) -> str:
        half_len = len(num) // 2
        half = list(num[:half_len])

        i = half_len - 2
        while i >= 0 and half[i] >= half[i + 1]:
            i -= 1

        if i < 0:
            return ""

        j = half_len - 1
        while half[j] <= half[i]:
            j -= 1

        half[i], half[j] = half[j], half[i]
        half[i + 1:] = reversed(half[i + 1:])

        new_half = ''.join(half)
        if len(num) % 2 == 1:
            return new_half + num[half_len] + new_half[::-1]
        return new_half + new_half[::-1]

def test():
    sol = Solution()
    assert sol.nextPalindrome("1221") == "2112"
    assert sol.nextPalindrome("32123") == ""
    assert sol.nextPalindrome("45544554") == "54455445"

if __name__ == '__main__':
    test()
