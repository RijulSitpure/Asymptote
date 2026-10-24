class Solution:
    def longestDecomposition(self, text: str) -> int:
        left, right = 0, len(text) - 1
        l_str = ""
        r_str = ""
        count = 0
        while left < right:
            l_str += text[left]
            r_str = text[right] + r_str
            if l_str == r_str:
                count += 2
                l_str = ""
                r_str = ""
            left += 1
            right -= 1
        if left == right or len(l_str) > 0:
            count += 1
        return count

def test():
    sol = Solution()
    assert sol.longestDecomposition("ghiabcdefhelloadamhelloabcdefghi") == 7, "test 1 failed"
    assert sol.longestDecomposition("merchant") == 1, "test 2 failed"
    assert sol.longestDecomposition("antaprezatepzapreanta") == 11, "test 3 failed"
    print("✓ longest-chunked-palindrome-decomposition passed")

if __name__ == "__main__":
    test()
